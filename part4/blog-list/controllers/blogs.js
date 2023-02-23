const jwt=require('jsonwebtoken')
const blogsRouter=require('express').Router()
const Blog=require('../models/blogModel')
const User=require('../models/userModel')

// const getTokenFrom=(request)=>{
//     const authorization=request.get('authorization')
//     if(authorization && authorization.toLowerCase().startsWith('bearer ')){
//         return authorization.substring(7)
//     }
//     return null
// }

blogsRouter.get('/',async (request,response) => {
    const blogs=await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/',async (request,response) => {
    let blog = new Blog(request.body)
    blog.likes = 0
    if(!blog.title||!blog.url){
        response.status(400).end()
    } else {
        const user = await User.findById(request.user.id)
        blog.user={
            id:user._id,
            username:user.username,
            name:user.name
        }
        const insertedBlog=await blog.save()
        user.blogs = [...user.blogs, insertedBlog._id]
        await user.save()
        response.status(201).json(insertedBlog)
    }
})

blogsRouter.delete('/:id',async (request,response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if(blog.user.id.toString()===user._id.toString()){
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).json({message:'delete success'})
    }else{
        response.status(401).json({error:'no permission to delete'}) 
    }
   
})

blogsRouter.put('/:id',async (request,response) => {
    const newBlog = new Blog(request.body)
    const result=await Blog.findByIdAndUpdate(request.params.id,newBlog,{new:true})
    response.status(201).json(result)
})

module.exports = blogsRouter