"use client"
import React, { useState, useRef, useCallback } from 'react';
import Swal from 'sweetalert2';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2, Mic, MicOff, Upload, Copy } from "lucide-react";

function Audio() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = handleStop;
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error accessing microphone',
            });
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleStop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await sendAudioToWhisper(audioBlob);
    };

    const sendAudioToWhisper = async (audioBlob) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.wav');

        try {
            const response = await fetch('/api/whisper', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to transcribe audio');
            }

            const data = await response.json();
            setTranscription(data.transcription);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Audio transcribed successfully',
            });
        } catch (error) {
            console.error('Error transcribing audio:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error transcribing audio. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleFileUpload = useCallback(async () => {
        if (!selectedFile) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No file selected',
            });
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('audio', selectedFile);

        try {
            const response = await fetch('/api/whisper', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to transcribe audio file');
            }

            const data = await response.json();
            setTranscription(data.transcription);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Audio file transcribed successfully',
            });
        } catch (error) {
            console.error('Error transcribing audio file:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error transcribing audio file. Please try again.',
            });
        } finally {
            setIsLoading(false);
            setSelectedFile(null);
        }
    }, [selectedFile]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(transcription)
            .then(() => Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Transcription copied to clipboard',
            }))
            .catch(() => Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to copy text. Please try again.',
            }));
    };

    return (
        <div className="min-h-screen px-4 py-8 bg-background">
            <div className="max-w-8xl mx-auto px-5">
                <h1 className="text-2xl font-extrabold mb-8 mt-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Generate Post from Audio
                </h1>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Audio Transcription</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Record audio or upload an audio file to transcribe.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="recordAudio">Record Audio</Label>
                                <Button
                                    onClick={isRecording ? stopRecording : startRecording}
                                    className="w-full mt-2"
                                    variant={isRecording ? "destructive" : "default"}
                                >
                                    {isRecording ? (
                                        <>
                                            <MicOff className="mr-2 h-4 w-4" />
                                            Stop Recording
                                        </>
                                    ) : (
                                        <>
                                            <Mic className="mr-2 h-4 w-4" />
                                            Start Recording
                                        </>
                                    )}
                                </Button>
                            </div>
                            <div>
                                <Label htmlFor="uploadAudio">Upload Audio File</Label>
                                <Input
                                    id="uploadAudio"
                                    type="file"
                                    accept="audio/*"
                                    onChange={handleFileChange}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button
                                onClick={handleFileUpload}
                                disabled={!selectedFile || isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Transcribing...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Transcribe
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {isLoading && (
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-muted-foreground">Transcribing...</span>
                    </div>
                )}

                {!transcription && !isLoading && (
                    <Card>
                        <CardContent className="pt-6">
                            <h2 className="text-lg font-semibold mb-2">
                                Your transcription will appear here
                            </h2>
                            <p className="text-muted-foreground">
                                No content transcribed yet
                            </p>
                        </CardContent>
                    </Card>
                )}

                {transcription && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                Transcription
                                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Copy to Clipboard
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="whitespace-pre-wrap">{transcription}</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

export default Audio;
