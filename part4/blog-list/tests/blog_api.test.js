const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const api=supertest(app)
const Blog=require('../models/blogModel')
const User=require('../models/userModel')
const {initialBlogs,nonExistingId,blogInDb}=require('./test_helper')
const bcrypt=require('bcrypt')

let token = null

beforeAll(async()=>{
    await api
    .post('/api/users')
    .send({
        username:'user3',
        name:'user3',
        password:'password3'
    })
    const res = await api
    .post('/api/login')
    .send({
        username: "user3",
        password: "password3"
    })
    token = res.body.token
}, 100000)


describe("test the property of blogs",()=>{
    test("add a new blog", async () => {
        const newBlog={
            title: "blog7",
            author: "author3",
            url: "https://blog7.com/",
            likes: 55,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', 'Bearer ' + token)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response=await api
        .get('/api/blogs')
        .set('Authorization', 'Bearer ' + token)
        const titles=response.body.map(r=>r.title)
        expect(titles).toContain(newBlog.title)
    })
    
    test("default like count", async () => {
        const newBlog={
            title: "blog8",
            author: "author4",
            url: "https://blog8.com/"
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', 'Bearer ' + token)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response=await api.get('/api/blogs').set('Authorization', 'Bearer ' + token)
        const likes=response.body.find(r=>r.title===newBlog.title).likes
        expect(likes).toEqual(0)
    })
})

describe("test RESTFUL api of blogs",()=>{
    test('json content-type', async () => {
        await api
            .get('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
       
    test('blog count', async () => {
        await Blog.insertMany(initialBlogs)
        const response=await api.get('/api/blogs').set('Authorization', 'Bearer ' + token)
        expect(response.body).toHaveLength(8)
    })
     
    test("missing blog title", async () => {
        const newBlog={
            author: "author3",
            url: "https://blog7.com/",
            likes: 55,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', 'Bearer ' + token)
            .expect(400)
    })
    
    test("missing blog url", async () => {
        const newBlog={
            title: "blog7",
            author: "author3",
            likes: 55,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', 'Bearer ' + token)
            .expect(400)
    })

    test("delete a blog", async () => {
        const blogs=await blogInDb()
        const deletedBlog=blogs[Math.random()*blogs.length|0]
        await api
            .delete(`/api/blogs/${deletedBlog.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(204)
        
        const response=await api.get('/api/blogs').set('Authorization', 'Bearer ' + token)
        expect(response.body).toHaveLength(7)
    })

    test("update a blog", async () => {
        const blogs=await blogInDb()
        const blog=blogs[Math.random()*blogs.length|0]
        const updatedBlog={
            title: "blog7 updated",
            author: "author3 updated",
            url: "https://blog7.com/",
            likes: 55,
        }
        await api
            .put(`/api/blogs/${blog.id}`)
            .send(updatedBlog)
            .set('Authorization', 'Bearer ' + token)
            .expect(201)
        
        const response=await api.get('/api/blogs').set('Authorization', 'Bearer ' + token)
        const titles=response.body.map(r=>r.title)
        expect(titles).toContain(updatedBlog.title)
    })

})




afterAll(async () => {
    await User.deleteMany({"username": "user3"})
    await Blog.deleteMany({})
    mongoose.connection.close()
})