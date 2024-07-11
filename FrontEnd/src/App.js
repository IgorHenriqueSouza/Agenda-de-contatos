import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/contacts")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the contacts!", error);
      });
  }, []);

  const validarTelefone = (telefone) => {
    const regex = /^[0-9]{9}$/;
    return regex.test(telefone);
  };

  const addContact = () => {
    if (validarTelefone(phone)) {
      axios
        .post("http://localhost:3001/add-contact", { name, phone })
        .then((response) => {
          console.log(response.data);
          setContacts([...contacts, { name, phone }]);
          setName("");
          setPhone("");
        })
        .catch((error) => {
          console.error("There was an error adding the contact!", error);
        });
    } else {
      alert(
        "Número de telefone inválido. Insira um número válido com 9 dígitos."
      );
    }
  };

  return (
    <div>
      <h1>Contact List</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addContact();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Add Contact</button>
      </form>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            {contact.name} - {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
