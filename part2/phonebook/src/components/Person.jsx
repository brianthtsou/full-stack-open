const Person = ({ person, deleteMethod }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={deleteMethod}>delete</button>
    </div>
  );
};

export default Person;
