import {useDispatch, useSelector} from "react-redux";
import {voteAnec} from "../reducers/anecdoteReducer";



const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(a=>a)
  return (
    <div>

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(voteAnec(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList;