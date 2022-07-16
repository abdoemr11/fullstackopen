import { createAnecdote} from "../reducers/anecdoteReducer";
import {connect, useDispatch} from "react-redux";
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

const mapDispatchToProps = dispatch => {
  return ({
    createAnecdote : content => {
      dispatch(createAnecdote(content))
    }
  })
}
const connectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default connectedAnecdoteForm;