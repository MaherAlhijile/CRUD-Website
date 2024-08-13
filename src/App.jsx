import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Person from "./components/Person";
import axios from "axios";
import Services from "./Services";
import "./style/style.css";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    console.log("UseEffect Called");
    Services.getAll().then((res) => setPersons(res));
  }, []);

  const handleNameChange = (event) => {
    console.log("handleNameChange Called");

    setNewName(event.target.value);
  };
  const handleTitleChange = (event) => {
    console.log("handleTitleChange Called");

    setNewTitle(event.target.value);
  };
  const handlePhoneChange = (event) => {
    console.log("handlePhoneChange Called");

    setNewPhone(event.target.value);
  };

  const clearVars = () => {
    console.log("clearVars Called");

    setNewName("");
    setNewTitle("");
    setNewPhone("");
  };

  const addPerson = (event) => {
    console.log("addPerson Called");
    event.preventDefault();

    //empty filed check
    if (
      newName.trim().length === 0 ||
      newPhone.trim().length === 0 ||
      newTitle.trim().length === 0
    ) {
      return alert("Fill all fields");
    }

    //number is all digits check
    for (var i = 0; i < newPhone.length; i++) {
      if (!(newPhone.charCodeAt(i) >= 48 && newPhone.charCodeAt(i) <= 57)) {
        return alert("Must be all numbers");
      }
    }

    //wrong phone number format
    if (newPhone.length != 10) {
      return alert("Number must be 10 digits");
    }

    //already exist check
    if (persons.find((person) => person.phone === newPhone)) {
      return alert("Try a differnt phone");
    }

    Services.addPerson({
      name: newName,
      title: newTitle,
      phone: newPhone,
    }).then((res) => {
      Services.getAll().then((res) => setPersons(res));
      clearVars();
      console.log("User added successfully:", res);
    });
  };

  const deletePerson = (person) => {
    console.log("deletePerson Called");
    if (confirm("Delete " + person.name + "?") == true) {
      Services.remove(person)
        .then((res) => {
          Services.getAll().then((res) => setPersons(res));
          console.log("User deleted successfully:", res);
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    } else {
      return;
    }
  };

  return (
    <div className="main">
      <div className="sub">
        <h1>List of Names</h1>

        <div className="form">
          <h2>New Entry Form</h2>
          <form onSubmit={addPerson}>
            <input
              placeholder="Name"
              value={newName}
              onChange={handleNameChange}
              className="field"
            ></input>
            <input
              placeholder="Title"
              className="field"
              value={newTitle}
              onChange={handleTitleChange}
            ></input>
            <input
              placeholder="Phone"
              className="field"
              value={newPhone}
              onChange={handlePhoneChange}
            ></input>
            <button type="submit" className="addButton">
              Add
            </button>
          </form>
        </div>
        <div className="grid">
          {persons.map((person) => (
            <li key={person.id} className="person">
              <h1>{person.name} </h1>
              <h2>{person.title}</h2>
              <p>{person.phone}</p>
              <button
                className="removeButton"
                onClick={() => deletePerson(person)}
              >
                Delete
              </button>
              <button className="contactButton">Contact</button>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
