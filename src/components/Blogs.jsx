import React, { useEffect } from 'react'
import { useState } from 'react';
import BlogCard from './BlogCard'
function Blogs() {


  const [blogs,setBlogs]=useState();
  const [keyword,setKeyword]=useState('');
  const fetchBlogs=async()=>{
    const res=await fetch('http://127.0.0.1:8000/api/blogs');
    const result =await res.json();
    setBlogs(result.data);
  }

  const searchBlogs=async(e)=>{
    e.preventDefault();
    const res=await fetch('http://127.0.0.1:8000/api/blogs?keyword='+keyword);
    const result =await res.json();
    setBlogs(result.data);

  }

  const resetSearch=()=>{
    fetchBlogs();
    setKeyword('');
  }


  useEffect(()=>{
    fetchBlogs();
  },[])

  return (
    <div className="container">
    <div className="d-flex justify-content-center pt-5 mb-4">
      
      <form onSubmit={(e)=>searchBlogs(e)}>
      <div className='d-flex'>
        <input value={keyword} onChange={(e)=>setKeyword(e.target.value)} type='text' className='form-control' placeholder='Search Blogs'/>
        <button className='btn btn-dark ms-2'>Search</button>
        <button type='button' onClick={()=>resetSearch()} className='btn btn-dark ms-2'>Reset</button>
      </div>
      </form>
    </div>
    <div className="d-flex justify-content-between pt-5 mb-4">
      <h4> Blogs </h4>
      <a href="/create" className="btn btn-dark">
        Create
      </a>
    </div>
    <div className="row">

      {
        (blogs) && blogs.map((blog)=>{
          return (<BlogCard blogs={blogs} setBlogs={setBlogs} blog={blog} key={blog.id}/>)
        })
      }
     
      
    </div>
  </div>
  )
}

export default Blogs