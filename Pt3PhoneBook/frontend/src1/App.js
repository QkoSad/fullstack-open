import { useState } from "react";
function Statistics({ good, bad, neutral }) {
  return (
    <div>
      <h1>statistics</h1>
      <ul>
        <StatisticsLine text={"good"} value={good} />
        <StatisticsLine text={"neutral"} value={neutral} />
        <StatisticsLine text={"bad"} value={bad} />
        <StatisticsLine text={"all"} value={bad + good + neutral} />
        <StatisticsLine
          text={"average"}
          value={(good - bad) / (good + bad + neutral)}
        />
      </ul>
    </div>
  );
}

function StatisticsLine({ text, value }) {
  return (
    <li>
      {text}: {value}
    </li>
  );
}

function Anecdotes({ anecdotes, selected }) {
  return (
    <>
      <div>{anecdotes[selected]}</div>
    </>
  );
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(7).fill(0));
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  let highest = Math.max(...votes)
  function addVote() {
    let newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  }
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral} />
      <Anecdotes anecdotes={anecdotes} selected={selected} />
      <h1>has {votes[selected]} votes</h1>
      <button onClick={() => addVote()}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * 7))}>
        next anecdote{" "}
      </button>
      <h1>Is the most liked</h1>
      <Anecdotes anecdotes={anecdotes} selected={Math.max(...votes)}/>
    </div>
  );
};

export default App;
