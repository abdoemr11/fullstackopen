import {appendAnec, createAnec} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const SubmitNewAnecdotes = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    const newAnec = await anecdoteService.createNew(content)
    dispatch(appendAnec(newAnec));

  }
  return(
    <form onSubmit={e=>SubmitNewAnecdotes(e)}>
      <div><input name='anecdote'/></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm;