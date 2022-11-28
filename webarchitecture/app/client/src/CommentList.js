import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CommentList = (props) => {
    /*
    const { comments } = props
    */

    const { postId } = props
    const [comments, setComments] = useState([])

    const fetchData = async () => {
        const res = await axios.get('http://localhost:4001/posts/${postId}/comments')
        setComments(res.data)
    }

    // Trigger fetchPosts only once when the PostList is loaded
    useEffect( () => {
        fetchData()
    }, [])

    /*
    const renderedComments = comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
    })
    */

    return <ul>{comments}</ul>
}

export default CommentList