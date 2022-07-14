import {createAnec} from "../reducers/anecdoteReducer";
import {useDispatch} from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const SubmitNewAnecdotes = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(createAnec(content));

  }
  return(
    <form onSubmit={e=>SubmitNewAnecdotes(e)}>
      <div><input name='anecdote'/></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm;