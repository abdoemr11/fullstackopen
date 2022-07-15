
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import {useEffect} from "react";
import anecdoteService from "./services/anecdotes";
import {useDispatch} from "react-redux";
import {setAnec} from "./reducers/anecdoteReducer";


const App = () => {
  const dispatch = useDispatch()
  useEffect( ()=>{
    const getAnecAsync = async () => {
      const anecs = await anecdoteService.getAll()
      dispatch(setAnec(anecs))
    }
    getAnecAsync()
  }, [dispatch])



  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App