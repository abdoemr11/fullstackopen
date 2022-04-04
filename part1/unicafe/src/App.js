import { useState } from 'react'
const Header = ({content}) =>(
  <h1>{content}</h1>
)
const Button = ({feedBack,type}) => (
  <button onClick={feedBack}>{type}</button>
);
const StatsticsLine = ({name, expr, token}) =>
(
<tr><td>{name}</td><td>{expr}</td><td>{token?token:''}</td></tr>
);
const Statstics = (props) =>{
 const {good, bad, neutral, all} = props;
 if(all > 0)
  return(
    <table>
    <tbody>
      <StatsticsLine name={"good"} expr={good}/>
      <StatsticsLine name={"neutral"} expr={neutral}/>
      <StatsticsLine name={"bad"} expr={bad}/>
      <StatsticsLine name={"all"} expr={all}/>
      <StatsticsLine name={"average"} expr={(good - bad)/all}/>
      <StatsticsLine name={"positive"} expr={good/all} token={'%'}/>
    </tbody>

    </table>
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
      <Button feedBack={giveFeedback('good')} type={'good'}/>
      <Button feedBack={giveFeedback('neutral')} type={'neutral'}/>
      <Button feedBack={giveFeedback('bad')} type={'bad'}/>

      <Header content="statstics"/>

      <Statstics good={good} bad={bad} neutral={neutral} all={all}/>
    </div>
  )
}

export default App
