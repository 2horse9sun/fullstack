const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userModel')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.username })
    if(!user){
        return response.status(401).json({
            error: 'invalid username'
        })
    }
    const passwordCorrect = await bcrypt.compare(body.password, user.passwordHash)
    if (!passwordCorrect) {
        return response.status(401).json({
        error: 'Wrong password!'
        })
    }
    
    const userForToken = {
        username: user.username,
        id: user._id,
    }
    
    const token = jwt.sign(userForToken, process.env.SECRET)
    
    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter