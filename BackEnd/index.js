const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/Contatos")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Contact = mongoose.model("Contact", contactSchema);

app.post("/add-contact", (req, res) => {
  const { name, phone } = req.body;
  const newContact = new Contact({ name, phone });
  newContact
    .save()
    .then(() => res.send("Contact added"))
    .catch((err) => res.status(400).send(err));
});

app.get("/contacts", (req, res) => {
  Contact.find()
    .then((contacts) => res.json(contacts))
    .catch((err) => res.status(400).send(err));
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
