const App = () => {
  const friends = [
    { name: "Peter", age: 4 },
    { name: "George", age: 10 },
  ];

  return (
    <div>
      <p>
        {friends[0].name} {friends[0].age}
      </p>
      <p>
        {friends[1].name} {friends[0].age}
      </p>
    </div>
  );
};

export default App;
