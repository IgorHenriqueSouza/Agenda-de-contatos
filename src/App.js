import React, { useState } from "react";
import "./App.css";

const ContactList = () => {
  // Estado para armazenar os contatos
  const [contacts, setContacts] = useState([]);

  // Função para adicionar um contato
  const addContact = (name, phone) => {
    setContacts([...contacts, { name, phone }]);
  };

  // Função para validar o telefone
  const validarTelefone = (telefone) => {
    // Expressão regular para validar um número de telefone com 9 dígitos
    const regex = /^[0-9]{9}$/;
    return regex.test(telefone);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const phone = event.target.elements.phone.value;

    // Verifica se o telefone é válido antes de adicionar o contato
    if (validarTelefone(phone)) {
      addContact(name, phone);
      // Limpa os campos do formulário após adicionar o contato
      event.target.reset();
    } else {
      alert(
        "Número de telefone inválido. Insira um número válido com 9 dígitos."
      );
      // Pode-se adicionar lógica adicional, como focar no campo de telefone novamente
      // event.target.elements.phone.focus();
    }
  };

  // JSX para renderizar os contatos na lista
  return (
    <div>
      <h2>Agenda de Contatos</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" id="name" placeholder="Nome" />
        <input type="text" id="phone" placeholder="Telefone" />
        <button type="submit">Adicionar Contato</button>
      </form>
      <div id="contactList">
        {contacts.map((contact, index) => (
          <div key={index} className="contact">
            <strong>{contact.name}</strong>: {contact.phone}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
