import { useState, useCallback } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ fn, text }) => {
  return <button onClick={fn}>{text}</button>;
};

const StatisticLine = ({ text, num, extra }) => (
  <tr>
    <td>{text}</td>
    <td>
      {num} {extra}
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <StatisticLine text="good" num={good} />
      <StatisticLine text="neutral" num={neutral} />
      <StatisticLine text="bad" num={bad} />
      <StatisticLine text="all" num={good + neutral + bad} />
      <StatisticLine
        text="average"
        num={(good - bad) / (good + neutral + bad)}
      />
      <StatisticLine
        text="positive"
        num={(good / (good + neutral + bad)) * 100}
        extra="%"
      />
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="give feedback" />
      <Button fn={() => setGood(good + 1)} text="good" />
      <Button fn={() => setNeutral(neutral + 1)} text="neutral" />
      <Button fn={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
