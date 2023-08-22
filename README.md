# Server_Basico_CRUD

### Rutas

// Mensaje de bienvenida
- app.get("/", casa);

// Ruteo para listado completo
- app.get("/Frutas", listado);

// Ruteo para búsqueda individual. Retorna primera coincidencia
- app.get("/Frutas/nombre/:nombre", singleNameSearch);

// Filtro/Búsqueda parcial. Retorna todas las coincidencias
- app.get("/Frutas/parcial/:parcial", busquedaParcial);

/* Alta de documentos. No hace falta poner id. La app pone el correcto.
  En caso de poner id duplicado, da un warning. Si se pone id no duplicado no 
  importa, pone el correcto
*/
- app.post("/Frutas/alta", altaDoc);

// Modifica precio en documentos individuales a partir del nombre de la fruta
- app.patch("/Frutas/modifica/:id", modificaDoc);

// Ruta para paths no definidos o campos vacios
- app.use((req, res) => {....
 

