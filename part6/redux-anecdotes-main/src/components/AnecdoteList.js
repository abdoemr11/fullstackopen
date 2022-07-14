import {useDispatch, useSelector} from "react-redux";
import {sortAnec, voteAnec} from "../reducers/anecdoteReducer";
import {removeNotification, setNotification} from "../reducers/notificationReducer";
import {useRef, useState} from "react";



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
    dispatch(voteAnec(anecdote.id));
    dispatch(setNotification(anecdote.content));
    // dispatch(removeNotification(null))
    clearTimeout(notificationTimerRef.current);
    clearTimeout(sortTimerRef.current);

    notificationTimerRef.current = setTimeout(()=> {
      dispatch(removeNotification(null))
    }, 5000)
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