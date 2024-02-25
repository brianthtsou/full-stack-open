const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  );
};

const Part = (props) => {
  const name = props.name;
  const num = props.num;
  return (
    <div>
      <p>
        {name} {num}
      </p>
    </div>
  );
};

const Content = (props) => {
  const data = props.data;
  console.log(data);
  return (
    <div>
      <Part name={data[0].name.part1} num={data[0].num.exercises1} />
      <Part name={data[1].name.part2} num={data[1].num.exercises2} />
      <Part name={data[2].name.part3} num={data[2].num.exercises3} />
    </div>
  );
};

const Total = (props) => {
  const n1 = props.n1;
  const n2 = props.n2;
  const n3 = props.n3;
  return (
    <div>
      <p>Number of exercises {n1 + n2 + n3}</p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const data = [
    { name: { part1 }, num: { exercises1 } },
    { name: { part2 }, num: { exercises2 } },
    { name: { part3 }, num: { exercises3 } },
  ];

  return (
    <div>
      <Header name={course} />
      <Content data={data} />
      <Total n1={exercises1} n2={exercises2} n3={exercises3} />
    </div>
  );
};

export default App;
