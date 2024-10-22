"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Swal from "sweetalert2";

export default function Profile() {
    const { data: session } = useSession();
    const [username, setUsername] = useState(session?.user?.username || "");
    const [email, setEmail] = useState(session?.user?.email || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Add new state variables for plan and credits
    const [credits, setCredits] = useState(session?.user?.credits || 0);

    // New function to fetch credits and plan
    const fetchUserData = async () => {
        if (session) {
            try {
                const res = await fetch(`/api/user/${session.user.email}/`);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setCredits(data.credits);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        }
    };

    // Fetch user data when the component mounts or session changes
    useEffect(() => {
        fetchUserData();
    }, [session]); // Add session as a dependency

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/user-update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: session?.user?.id,
                    username,
                    email,
                    password: password || undefined,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Profile updated suceessfully',
                    toast: true,
                    position: 'top-end',
                    timer: 3000,
                    timerProgressBar: true,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    toast: true,
                    position: 'top-end',
                    text: 'Failed to generate post.',
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            toast.error("An error occurred while updating the profile.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen px-4 py-8 bg-background">
            <div className="max-w-4xl mx-auto px-5">
                <h1 className="text-2xl font-extrabold mb-8 mt-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Update Your Profile
                </h1>

                {/* Existing Profile Details Card */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Profile Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex items-center justify-center mb-6">
                                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-3xl font-bold text-primary-foreground">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">New Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter new password (optional)"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirm_password">Confirm New Password</Label>
                                    <Input
                                        id="confirm_password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Profile"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>


                <Card className="mt-4">
                    <CardHeader className="pb-2">
                        <CardTitle>Available Credits</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Available Credits</Label>
                                <div className="font-semibold text-lg">{credits}</div>
                            </div>
                        </div>
                        <Button className="mt-4 w-full">Upgrade Plan</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
