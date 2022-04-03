import { useState } from 'react'
const Header = ({content}) =>(
  <h1>{content}</h1>
)
const Statstics = (props) =>{
 const {good, bad, neutral, all} = props;
 if(all > 0)
  return(
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {(good - bad)/all}</p>
      <p> positive {good/all}%</p>
    </div>
  )
  else 
    return(
      <div>No feedback given</div>
    )
} 
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  let giveFeedback = (type) => {
    let func;
    if(type == 'good')
      func = ()=>{
        setGood(good+1);

        setAll(all+1);
      }
    else if(type == 'bad')
      func = ()=>{
      setBad(bad+1);

      setAll(all+1);
    };
    else
    func = ()=>{
      setNeutral(neutral+1);
      setAll(all+1);

      };
    return func;
      
    };
  
  return (
    <div>
      <Header content="give feedback"/>
      <button onClick={giveFeedback('good')}>good</button>
      <button onClick={giveFeedback('neutral')}>neutral</button>
      <button onClick={giveFeedback('bad')}>bad</button>
      <Header content="statstics"/>

      <Statstics good={good} bad={bad} neutral={neutral} all={all}/>
    </div>
  )
}

export default App
