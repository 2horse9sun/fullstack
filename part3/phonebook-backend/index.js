require('dotenv').config()
const express = require('express')
const app = express()
const morgan=require('morgan')
const cors=require('cors')
const PersonModel=require('./models/person.js')

app.use(express.static('build'))
app.use(cors())
morgan.token('body',(res) => {
  return JSON.stringify(res.body)
})
app.use(morgan(':method :url :status :total-time - :response-time ms :body'))

app.use(express.json())


app.get('/api/persons',(request,response,next) => {
  PersonModel.find({})
    .then(persons => {
      response.json(persons)
    }).catch(error => {
      next(error)
    })
})

app.get('/info',(request,response,next) => {
  PersonModel.find({})
    .then(persons => {
      response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
    }).catch(error => {
      next(error)
    })
})

app.get('/api/persons/:id',(request,response,next) => {
  const id=request.params.id
  PersonModel.findById(id)
    .then(person => {
      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    }).catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id',(request,response,next) => {
  const id=request.params.id
  PersonModel.findByIdAndRemove(id)
    .then(result => {
      response.json(result)
    }).catch(error => {
      next(error)
    })
})

app.post('/api/persons',async (request,response,next) => {
  const body = request.body
  if(!body){
    return response.status(400).json({
      error:'request body is empty!'
    })
  }
  const{ name,number }=body
  const newPerson={
    name,
    number
  }
  PersonModel.create(newPerson)
    .then(person => {
      response.json(person)
    }).catch(error => {
      next(error)
    })
})

app.put('/api/persons/:id',(request,response,next) => {
  const id=request.params.id
  const body=request.body
  const { name,number }=body
  PersonModel.findByIdAndUpdate(id,{ name, number },{ new:true,runValidators:true,context:'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    }).catch(error => {
      next(error)
    })
})

const errorHandler=(error,request,response,next) => {
  console.log(error.message)
  if(error.name==='CastError'){
    return response.status(400).send({ error:'malformatted id' })
  }else if(error.name==='ValidationError'){
    return response.status(400).json({ error:error.message })
  }
  next(error)
}

app.use(errorHandler)

const unknownEndpoint=(request,response) => {
  response.status(404).send({ error:'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT=process.env.PORT||3001
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})