const bcrypt=require('bcrypt')
const User=require('../models/userModel')
const Blog=require('../models/blogModel')
const supertest=require('supertest')
const app=require('../app')
const api=supertest(app)
const mongoose = require('mongoose')

describe("test the REST api of user",()=>{
    test("create a user",async()=>{
        const userList=await User.find({})
        const newUser={
            username:'user1',
            name:'user1',
            password:'password1'
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type',/application\/json/)
        const newUserList=await User.find({})
        const usernames=newUserList.map(user=>user.username)
        expect(usernames).toContain(newUser.username)
        await User.deleteMany({"username": "user1"})
    })

    test("create the same user",async()=>{
        await api
        .post('/api/users')
        .send({
            username:'user2',
            name:'user2',
            password:'password2'
        })
        const userList=await User.find({})
        const sameUser={
            username:'user2',
            name:'user2',
            password:'password2'
        }
        const res=await api
        .post('/api/users')
        .send(sameUser)
        .expect(400)
        .expect('Content-Type',/application\/json/)

        expect(res.body.error).toContain('User exists!')
        await User.deleteMany({"username": "user2"})
    })

    test("invalid username and password length",async()=>{
        const userList=await User.find({})
        let newUser={
            username:'newusername',
            name:'newuser',
            password:'1'
        }
        let result=await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        expect(result.body.error)
        .toEqual('password must be at least 3 characters long')

        const newUserList=await User.find({})
        expect(newUserList).toHaveLength(userList.length)

        newUser={
            username:'u',
            name:'newuser',
            password:'newpassword'
        }
        
        result=await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

        expect(result.body.error).toEqual("username must be at least 3 characters long")
        
    })


})

afterAll(() => {
    mongoose.connection.close()
  })