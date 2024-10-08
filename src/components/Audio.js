"use client"
import React, { useState, useRef, useCallback } from 'react';
import Swal from 'sweetalert2';

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
        } catch (error) {
            console.error('Error transcribing audio:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error transcribing audio. Please try again.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
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
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
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
        } catch (error) {
            console.error('Error transcribing audio file:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error transcribing audio file. Please try again.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
        } finally {
            setIsLoading(false);
            setSelectedFile(null);
        }
    }, [selectedFile]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(transcription).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'Copied!',
                text: 'Transcription copied to clipboard',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }).catch((err) => {
            console.error('Failed to copy text: ', err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to copy text. Please try again.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
            });
        });
    };

    return (
        <div className='min-h-screen px-4 lg:px-10 bg-gray-100 py-20'>
            <div className="py-10 px-3 font-mulish">
                <h1 className="text-xl font-semibold">Audio Transcription</h1>
                <p>Record audio or upload an audio file to transcribe.</p>
            </div>

            <div className='border shadow-lg mx-3.5 px-5 py-2 rounded-lg bg-white'>
                <h2 className="text-xl text-gray-600 mt-5">Transcribe Audio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-5">
                    <div>
                        <label htmlFor="recordAudio" className="block mb-2">Record Audio</label>
                        <button
                            onClick={isRecording ? stopRecording : startRecording}
                            className={`w-full py-2 px-4 rounded-md text-white font-medium transition duration-300 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                                }`}
                        >
                            {isRecording ? 'Stop Recording' : 'Start Recording'}
                        </button>
                    </div>
                    <div>
                        <label htmlFor="uploadAudio" className="block mb-2">Upload Audio File</label>
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:text-sm file:font-semibold
                            file:bg-indigo-50 file:text-indigo-700
                            hover:file:bg-indigo-100"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-5 mb-5">
                    <button
                        onClick={handleFileUpload}
                        disabled={!selectedFile || isLoading}
                        className="px-5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Transcribing...' : 'Transcribe'}
                    </button>
                </div>
            </div>

            <div className="py-5">
                {isLoading && (
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse"></div>
                        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse delay-75"></div>
                        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse delay-150"></div>
                        <span className="text-indigo-500 font-medium">Transcribing...</span>
                    </div>
                )}

                {!transcription && !isLoading && (
                    <div className="mt-5 mb-16 p-7 bg-white shadow-lg rounded-lg mx-3.5">
                        <h2 className="text-lg font-mulish font-semibold">
                            Your transcription will appear here
                        </h2>
                        <p className="text-gray-700 py-1">
                            No content transcribed yet
                        </p>
                    </div>
                )}

                {transcription && (
                    <div className="mt-5 mb-16 p-5 bg-white shadow-lg rounded-lg mx-3.5">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">Transcription:</h2>
                            <button
                                onClick={copyToClipboard}
                                className="px-5 text-white bg-green-600 hover:bg-green-700 rounded-lg py-2"
                            >
                                Copy to Clipboard
                            </button>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{transcription}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Audio;