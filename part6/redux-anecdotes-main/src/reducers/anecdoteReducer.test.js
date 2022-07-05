
import reducer from "./anecdoteReducer";
import {voteAnec} from "./anecdoteReducer";
import deepFreeze from 'deepfreeze';
describe('Testing AnecdoteReducer', ()=> {
  test('user can vote', ()=>{
    const state = reducer(undefined,{type: 'NONE'});
    deepFreeze(state);
    const newState = reducer(state, voteAnec(state[0].id))
  })
})