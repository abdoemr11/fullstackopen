import {useDispatch, useSelector} from "react-redux";
import {voteAnec} from "../reducers/anecdoteReducer";
import {removeNotification, setNotification} from "../reducers/notificationReducer";



const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(a=> a.anecdote)
  // console.log(anecdotes)
  const handleVoteAnce = (anecdote) => {
    dispatch(voteAnec(anecdote.id));
    dispatch(setNotification(anecdote.content));
    // dispatch(removeNotification(null))

    setTimeout(()=> {
      dispatch(removeNotification(null))
    }, 5000)
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