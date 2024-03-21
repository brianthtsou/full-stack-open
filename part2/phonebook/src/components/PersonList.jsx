import Person from "./Person";

const PersonList = ({ numbersToShow, deletePerson }) => {
  return numbersToShow.map((person) => (
    <Person
      key={person.id}
      person={person}
      deleteMethod={(e) => deletePerson(person.id, person.name, e)}
    />
  ));
};

export default PersonList;
