import { useState } from "react";

const Button = ({ fn, text }) => <button onClick={fn}>{text}</button>;

const Header = ({ text }) => (
  <div>
    <h1>{text}</h1>
  </div>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);

  const randomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const arr = new Uint32Array(anecdotes.length);
  const [points, setPoints] = useState(arr);

  const [maxVotes, setMaxVotes] = useState(0);

  const topAnecdote = () => {
    const match = (e) => e === maxVotes;
    return anecdotes[points.findIndex(match)];
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      {anecdotes[selected]}
      <div>has {points[selected]} votes</div>
      <div>
        <Button
          fn={() => {
            const randInt = randomInt(anecdotes.length - 1);
            setSelected(randInt);
          }}
          text="get next anecdote"
        />
        <Button
          fn={() => {
            const copy = [...points];
            copy[selected] += 1;
            setPoints(copy);
            setMaxVotes(Math.max(...copy));
          }}
          text="vote"
        />
      </div>
      <Header text="Anecdote with the most votes" />
      {topAnecdote()}
      <br></br>
      has {maxVotes} votes
    </div>
  );
};

export default App;
