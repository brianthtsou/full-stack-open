const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part, num }) => {
  return (
    <p>
      {part.name} {num}
    </p>
  );
};

const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <Header name={course.name} />
      {course.parts.map((part) => (
        <Part key={part.id} part={part} num={part.exercises} />
      ))}
      <p>
        <b>total of {total} exercises</b>
      </p>
    </div>
  );
};

export default Course;
