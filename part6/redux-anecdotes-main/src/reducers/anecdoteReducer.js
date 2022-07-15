import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
//try the thunk

const initialState = anecdotesAtStart.map(asObject)
// console.log(initialState)
// console.log(anecdotesAtStart)
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [] ,
  reducers: {
    voteAnec(state, action) {
      const anectodeToChange = state.find(a => a.id === action.payload);
      anectodeToChange.votes++;
    },
    createAnec(state, action) {
      state.push(asObject(action.payload));
    },
    sortAnec(state, action) {
      state.sort((a,b)=> b.votes - a.votes )
    },
    appendAnec(state, action) {
      state.push(action.payload)
    },
    setAnec(state, action) {
      return action.payload
    },
    updateAnec(state, action) {
      const updatedAnec = action.payload
      return state.map(a => a.id === updatedAnec.id ? updatedAnec: a)
    }
  }
})

export default anecdoteSlice.reducer;
export const {voteAnec, createAnec, sortAnec, setAnec, appendAnec,updateAnec} = anecdoteSlice.actions;
export const initializeAnecdotes =  () => {
  return async (dispatch) => {
    const anecs = await anecdoteService.getAll()
    console.log('intializeing anecdotes')
    dispatch(setAnec(anecs))
  }
}
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch(appendAnec(newAnec))
  }
}
export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnec = await anecdoteService.update({...anecdote, votes: anecdote.votes+1})
    dispatch(updateAnec(updatedAnec))
  }
}