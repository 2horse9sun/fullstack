import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    addVote(state, action){
      const id = action.payload
      const targetAnecdote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...targetAnecdote,
        votes: targetAnecdote.votes + 1
      }
      return state.map(targetAnecdote =>
        targetAnecdote.id !== id ? targetAnecdote : updatedAnecdote
      )
    },
    addAnecdote(state, action){
      return [...state,action.payload]
    },
    setAnecdotes(state, action){
      return action.payload
    },
    appendAnecdote(state, action){
      return state.concat(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const targetAnecdote = await anecdoteService.getOne(id)
    const updatedAnecdote = {
      ...targetAnecdote,
      votes: targetAnecdote.votes + 1
    }
    await anecdoteService.update(id,updatedAnecdote)
    dispatch(addVote(id))
  }
}

export const { addVote, addAnecdote,setAnecdotes,appendAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer