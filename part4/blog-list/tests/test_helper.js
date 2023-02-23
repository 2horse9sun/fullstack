const Blog=require('../models/blogModel')

const initialBlogs=[
    {
        title: "blog1",
        author: "author1",
        url: "https://blog1.com/",
        likes: 34
    },
    {
        title: "blog2",
        author: "author2",
        url: "https://blog2.com",
        likes: 86
    },
    {
        title: "blog3",
        author: "author1",
        url: "https://blog3.com/",
        likes: 10
    },
    {
        title: "blog4",
        author: "author2",
        url: "https://blog4.com",
        likes: 34
    },
    {
        title: "blog5",
        author: "author3",
        url: "https://blog5.com/",
        likes: 72
    },
    {
        title: "blog6",
        author: "author1",
        url: "https://blog6.com/",
        likes: 5
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon' })
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}

const blogInDb=async()=>{
    const blogs=await Blog.find({})
    return blogs.map(blog=>blog.toJSON())
}

module.exports= {initialBlogs,nonExistingId,blogInDb}