import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BlogCard from "./components/BlogCard";
import { Routes, Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import CreateBlog from "./components/CreateBlog";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetails from "./components/BlogDetails";
import EditBlog from "./components/EditBlog";
function App() {
  return (
    <>
      <div className="bg-dark text-center py-2 shadow-lg">
        <h1 className="text-white">WriteWave App</h1>
      </div>

      <Routes>
      <Route path="/" element={<Blogs/>}/>
      <Route path="/create" element={<CreateBlog/>}/>
      <Route path="/blog/:id" element={<BlogDetails/>}/>
      <Route path='/blog/edit/:id' element={<EditBlog/>}/>
      
      </Routes> 
      <ToastContainer />


     
    </>
  );
}

export default App;
