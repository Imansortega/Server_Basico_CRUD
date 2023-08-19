const {
  casa,
  listado,
  singleNameSearch,
  busquedaEstandard,
  busquedaParcial,
  modificaDoc,
  altaDoc,
} = require("./controlador/controlador");
const validar = require("./Utils/validador");

const path = require("path");
const dotenv = require("dotenv").config;
if (dotenv.error) {
  throw result.error;
}
const PORT = process.env.PORT;

const express = require("express"); // Es un "Import"
const app = express(); // instanciamos un objet "app" de la "clase" express

app.use(express.json()); // Middleware para parsear Json

app.get("/", casa);

app.get("/Frutas", listado);

app.get("/Frutas/nombre/:nombre", singleNameSearch);

app.get("/Frutas/parcial/:parcial", busquedaParcial);

app.post("/Frutas/alta", altaDoc);

app.patch("/Frutas/modifica/:id", modificaDoc);

app.use((req, res) => {
  console.log("Este path ---> ", req.path, " ...Naaaaa");
  if (validar.detectarNull(!req.params.nombre)) {
    res.status(404).send("El campo está vacío, incompleto o la pagina no existe");
  } else {
    res.status(404).send("La página buscada no existe");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor WEB iniciado en el puerto 3000");
});
