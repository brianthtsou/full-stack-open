import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import PersonList from "./components/PersonList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [parameter, setParameter] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(false);
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
      setFetchAgain(false);
    });
  }, [fetchAgain]);

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
      number: newNumber,
    };

    const a = persons.filter((p) => newName === p.name); // returns an array

    // Case: identical name found
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
        .then(() => {
          setNewName("");
          setNewNumber("");
          setSuccessMessage(`${newP.name} number was successfully changed!`);
        })
        .catch((error) => {
          setError(true);
          setSuccessMessage(
            `Information of ${newP.name} has already been removed from server`
          );
        })
        .finally(() => {
          setTimeout(() => {
            setSuccessMessage(null);
            setError(false);
          }, 5000);
        });
      setFetchAgain(true);
      return;
    }
    // else if no identical name, create new person in phonebook
    else {
      personsService.create(personObject).then((response) => {
        // retrieve new person data (with id included) from backend
        const allPeople = response.data; // backend returns the entire list of people
        console.log(allPeople);
        // concat new person with id to persons state
        setPersons(allPeople);
        setSuccessMessage(`${personObject.name} was added to the phonebook!`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
      setFetchAgain(true);
    }
  };

  // deletes person from phonebook
  const deletePerson = (id, name, event) => {
    event.preventDefault();
    if (!confirm(`Delete ${name}?`)) {
      return;
    }
    personsService.deleteMethod(id).catch((error) => {
      console.log(`Failed to retrieve person id: ${id}`);
    });
    setFetchAgain(true);
  };

  // variable to determine which numbers to display based on filter
  const numbersToShow = showAll
    ? persons
    : persons.filter((p) =>
        p.name.toLowerCase().includes(parameter.toLowerCase())
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} error={error} />
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
      {persons.length > 0 && (
        <PersonList numbersToShow={numbersToShow} deletePerson={deletePerson} />
      )}
    </div>
  );
};

export default App;
