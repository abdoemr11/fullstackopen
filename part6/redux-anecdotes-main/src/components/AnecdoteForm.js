import {appendAnec, createAnecdote} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const SubmitNewAnecdotes = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(createAnecdote(content))

  }
  return(
    <form onSubmit={e=>SubmitNewAnecdotes(e)}>
      <div><input name='anecdote'/></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm;