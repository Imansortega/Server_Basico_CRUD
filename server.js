
/* 
  Server_Basico_CRUD ver. 1.0
  Ignacio Manso 19/08/2023
 */
const {
  casa,
  listado,
  singleNameSearch,
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

const express = require("express");
const app = express();

app.use(express.json());

// Mensaje de bienvenida
app.get("/", casa);

// Ruteo para listado completo
app.get("/Frutas", listado);

// Ruteo para búsqueda individual. Retorna primera coincidencia
app.get("/Frutas/nombre/:nombre", singleNameSearch);

// Filtro/Búsqueda parcial. Retorna todas las coincidencias
app.get("/Frutas/parcial/:parcial", busquedaParcial);

/* Alta de documentos. No hace falta poner id. La app pone el correcto.
  En caso de poner id duplicado, da un warning. Si se pone id no duplicado no 
  importa, pone el correcto
*/
app.post("/Frutas/alta", altaDoc);

// Modifica precio en documentos individuales
app.patch("/Frutas/modifica/:id", modificaDoc);

// Ruta para paths no definidos o campos vacios
app.use((req, res) => {
  console.log("Este path ---> ", req.path, " ...Naaaaa");
  if (validar.detectarNull(!req.params.nombre)) {
    res
      .status(404)
      .send("El campo está vacío, incompleto o la pagina no existe");
  } else {
    res.status(404).send("La página buscada no existe");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor WEB iniciado en el puerto 3000");
});
