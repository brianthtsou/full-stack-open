import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [parameter, setParameter] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  // refreshes the page
  const refresh = () => {
    personsService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log("Failed to retrieve data!");
      });
  };

  // handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    if (event.target.value.length > 0) {
      setShowAll(false);
    }
    setParameter(event.target.value);
  };

  // adds person to phonebook
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      id: String(persons.length + 1),
      number: newNumber,
    };

    const a = persons.filter((p) => newName === p.name); // returns an array

    if (a.length > 0) {
      if (
        !confirm(
          `${newName} already exists in the phonebook, replace the old number with a new one?`
        )
      ) {
        return;
      }
      const newP = { ...a[0], number: newNumber };
      personsService
        .update(newP.id, newP)
        .then((response) => {
          setNewName("");
          setNewNumber("");
        })
        .then(() => {
          refresh();
        });

      return;
    }

    personsService.create(personObject).then((response) => {
      setPersons(persons.concat(personObject));
      console.log(response);
      setNewName("");
      setNewNumber("");
    });
  };

  // variable to determine which numbers to display based on filter
  const numbersToShow = showAll
    ? persons
    : persons.filter((p) =>
        p.name.toLowerCase().includes(parameter.toLowerCase())
      );

  // deletes person from phonebook
  const deletePerson = (id, name, event) => {
    event.preventDefault();
    if (!confirm(`Delete ${name}?`)) {
      return;
    }
    personsService
      .deleteMethod(id)
      .then(() => {
        refresh();
      })
      .catch((error) => {
        console.log(`Failed to retrieve person id: ${id}`);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={parameter} method={handleSearch} />
      <h2>add a new</h2>
      <PersonForm
        onSubmitMethod={addPerson}
        nameVal={newName}
        nameOnChangeHandler={handleNameChange}
        numVal={newNumber}
        numOnChangeHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {numbersToShow.map((person) => (
          <Person
            key={person.id}
            person={person}
            deleteMethod={(e) => deletePerson(person.id, person.name, e)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
