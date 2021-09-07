import React from 'react'
import Comment from './Comment'
import { chakra } from '@chakra-ui/react'
const comments = ['one', 'two', 'buckle my shoe']
const CommentList = () => {
    const list = comments.map((comment: any, i: number) => {
        console.log(comment);
        return (<Comment key={i}/>)
    })
    return (
        <chakra.div p={4}>
            {list}
        </chakra.div>
    )
}

export default CommentList
