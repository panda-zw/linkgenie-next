import Credits from "@/components/Credits";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function CreditsPage() {
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Credits />
            </div>
            <Footer />
        </>
    )
}
