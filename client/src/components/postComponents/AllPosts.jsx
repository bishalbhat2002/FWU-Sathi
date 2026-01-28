import React from 'react'
import Post from './Post'

const AllPosts = () => {
  return (
    <div className='container mx-auto flex flex-col gap-2 mt-3'>
     <Post />
     <Post />
     <Post />
     <Post />
     <Post />
    </div>
  )
}

export default AllPosts