import React from 'react'
import Post from '../../models/Post'
import Navbar from './Navbar'
import Footer from './Footer'

export default function PostsPage() {
    return (
        <>
            <Navbar />
            <Post />
            <Footer />
        </>
    )
}
