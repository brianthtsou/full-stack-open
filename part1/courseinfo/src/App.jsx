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
  const p1 = props.p1;
  const p2 = props.p2;
  const p3 = props.p3;
  console.log(p1);
  return (
    <div>
      <Part name={p1.name} num={p1.exercises} />
      <Part name={p2.name} num={p2.exercises} />
      <Part name={p3.name} num={p3.exercises} />
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
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course.name} />
      <Content p1={course.parts[0]} p2={course.parts[1]} p3={course.parts[2]} />
      <Total
        n1={course.parts[0].exercises}
        n2={course.parts[1].exercises}
        n3={course.parts[2].exercises}
      />
    </div>
  );
};

export default App;
