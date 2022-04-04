import { useState } from 'react'
const MaxAnec = ({anecdotes, voted})=>
{
  let maxIndex = 0;
  console.log(voted);
  // console.log('voted length', Object.keys(voted).length);
  for (let index = 0; index < Object.keys(voted).length; index++) {
    // console.log(voted[index], voted[maxIndex]);
    console.log('hi from the loop');
    if(voted[index] > voted[maxIndex])
      maxIndex = index;
  }
  console.log(maxIndex);
  return(
    <>
    {anecdotes[maxIndex]}
    <p>has {voted[maxIndex]} votes</p>
    </>

  )

}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0);
  let anecdotesVotes = new Uint16Array(anecdotes.length);

  const [voted, setVoted]= useState(anecdotesVotes);
  const increaseVote = ()=>{
    const oldVotes = {...voted};
    oldVotes[selected]++;
    setVoted(oldVotes);
  }
  return (
    <div>
      {anecdotes[selected]}
      <p>has {voted[selected]} votes</p>
      <br/>
      <button onClick={()=>setSelected(Math.floor(Math.random()* anecdotes.length))}>next anecdotes</button>
      <button onClick={increaseVote}>vote</button>
      <h2>Anecdotes with most votes</h2>
      <MaxAnec anecdotes={anecdotes} voted = {voted}/>
    </div>
  )
}

export default App