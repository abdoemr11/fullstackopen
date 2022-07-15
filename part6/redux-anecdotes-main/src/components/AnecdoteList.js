import {useDispatch, useSelector} from "react-redux";
import { sortAnec, voteAnec, voteAnecdote} from "../reducers/anecdoteReducer";
import {useRef, useState} from "react";
import {setNotificationForTime} from "../reducers/notificationReducer";



const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(a=> {
    if(a.filter==="")
      return a.anecdote
    return a.anecdote.filter(an=> an.content.toLowerCase().includes(a.filter) )
  })
  const notificationTimerRef = useRef()
  const sortTimerRef = useRef()
  // console.log(anecdotes)
  const handleVoteAnce = (anecdote) => {
    dispatch(voteAnecdote(anecdote));

    clearTimeout(sortTimerRef.current);
    dispatch(setNotificationForTime(anecdote.content, 3))
    sortTimerRef.current = setTimeout(()=>{
      dispatch(sortAnec())
    }, 3000)
  }
  return (
    <div>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoteAnce(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList;