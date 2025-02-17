import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function CreateBlog() {

    const navigate=useNavigate();
    const [html,setHtml] =useState('');
    const [imageId,setImageId]=useState('');
    function onChange(e){
        setHtml(e.target.value);
    }


    const handleFileChange=async(e)=>{
        const file=e.target.files[0];
        const formData=new FormData();
        formData.append("image",file);

        const res=await fetch("http://127.0.0.1:8000/api/save-temp-image",{
            method:'POST',
            body:formData
        });

        const result=await res.json();
        if(result.status==false)
        {
            alert(result.errors.image);
            e.target.value=null;
        }
        setImageId(result.image.id);

    }






    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();



    const formSubmit=async(data)=>{
        const newData ={...data, "description":html, image_id:imageId}
        const res=await fetch("http://127.0.0.1:8000/api/blogs",{
            method:"POST",
            headers:{
                'Content-type' : 'application/json'
            },
            body:JSON.stringify(newData)
        });
        toast("Your Blog Added Successfully");
        navigate('/');
    }

  return (
    <div className='container mb-5'>
        <div className='d-flex justify-content-between pt-5 mb-4'>
            <h4>Create Blog</h4>
            <a href='/' className='btn btn-dark'>Back</a>
        </div>
        <div className='card border-0 shadow-lg'>
            <form onSubmit={handleSubmit(formSubmit)}>
            <div className='card-body'>
                <div className='mb-3'>
                    <label  className='form-label'>Title</label>
                    <input {...register('title',{required:true})} type='text' className={`form-control ${errors.title && 'is-invalid'}`} placeholder='Title'/>
                    {errors.title && <p className='invalid-feedback'> Title field is required</p>}
                </div>
                <div className='mb-3'>
                    <label  className='form-label'>Short Description</label>
                    <textarea  {...register('shortDesc')}cols="30" rows="5" className='form-control' > </textarea>
                </div>
                <div className='mb-3'>
                    <label  className='form-label'>Description</label>
                    <textarea  value={html} onChange={onChange}  className='form-control' name='html' id='html' cols="30" rows="10">

                    </textarea>
                </div>
                <div className='mb-3'>
                    <label  className='form-label'>Image</label><br/>
                    <input onChange={handleFileChange} type='file'/>
                   
                </div>
                <div className='mb-3'>
                    <label  className='form-label'>Author</label>
                    <input {...register('author',{required:true})} type='text' className={`form-control ${errors.title && 'is-invalid'}`} placeholder='Author'/>
                    {errors.author && <p className='invalid-feedback'> Author field is required</p>}

                </div>
                <button className='btn btn-dark'>create</button>

            </div>
            </form>


        </div>



    </div>
  )
}

export default CreateBlog