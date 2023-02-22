import { useState } from 'react'

const Header=()=>{
  return(
    <h1>give feedback</h1>
  )
}

const Button=({handleClick,text})=>{
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine=({text,value})=>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}{text === 'positive' ? "%" : ""}</td>
    </tr>
  )
}

const Statistics=({good,netural,bad})=>{
  const all = good + netural + bad;
  const average = (all === 0) ? 0 : (good-bad) / all;
  const positive = (all === 0) ? 0 : good / all * 100;
  if(all === 0){
    return(
      <h1>No feedBack given</h1>
    )
  }
  return(
    <table>
        <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={netural}/>
            <StatisticLine text="all" value={all}/>
            <StatisticLine text="average" value={average}/>
            <StatisticLine text="positive" value={positive}/>
        </tbody>

    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header/>
      <div>
        <Button handleClick={()=>setGood(good+1)} text="good"/>
        <Button handleClick={()=>setNeutral(neutral+1)} text="neutral"/>
        <Button handleClick={()=>setBad(bad+1)} text="bad"/>
      </div>
      <Statistics good={good} netural={neutral} bad={bad}/>
    </div>
  )
}

export default App