### Server_Basico_CRUD ver. 1.0
#### Ignacio Manso 22/08/2023
---

#### Rutas:

- app.get("/", casa); ---> *Mensaje de bienvenida*
- app.get("/Frutas", listado); ---> *Ruteo para listado completo*
- app.get("/Frutas/nombre/:nombre", singleNameSearch); ---> *Ruteo para búsqueda individual. Retorna primera coincidencia. Es case sensitive.*
- app.get("/Frutas/parcial/:parcial", busquedaParcial); ---> *Filtro/Búsqueda parcial. Retorna todas las coincidencias. Es case sensitive.*
- app.post("/Frutas/alta", altaDoc); ---> *Alta de documentos. No hace falta poner id. La app pone el correcto.
  En caso de poner id duplicado, da un warning. Si se pone id no duplicado pero no consecutivo, no 
  importa, pone el correcto.*
- app.patch("/Frutas/modifica/:id", modificaDoc); ---> *Modifica precio en documentos individuales a partir del nombre de la fruta.*
- app.use((req, res) => {.... ---> *Ruta para paths no definidos o campos vacios.*
---
 #### Descripción:
 
Las rutas con "get" se resuelven en modo estandard. Hay control de errores para control de validación para los nombres y rutas desconocidas. El resultado null se informa también. El error de base de datos se resuelve con el catch correspondiente.

Para la modificación con el método PATCH se aplican los mismos controles de errores. La función "busquedaParcial" solo modifica el importe. No importa si en el body hay otros campos. Solo modifica importe. Los controles de errores son similares a los empleados en los métodos GET. Se agregan controles de null y undefined.

El alta se realiza proponiendo un id = nro total de documentos + 1. Luego se hace una búsqueda en la base para evaluar si ya está siendo usado. En caso que el id esté siendo usado, se incrementa en uno y se vuelve a buscar. Así hasta encontrar uno libre. De esta manera se inserta el nuevo documento con el id adecuado, aún si hubo documentos que fueron eliminados de la base.
El código emplea esta numeración sin considerar que en el body haya un id presente.
Además de los controles de errores comunes se agrega un control de repetición de nombre para que no haya dos iguales.

**nota:** No pude realizar el chequeo de campo vacío y caracteres no numéricos en los campos id e importe debido a que Postman no admite dichos campos erroneos. Por lo que veo el parser de Postman lo rechaza. Igual dejo las funciones de chequeo de dichos errores ya que creo que si el frontend no está bien codeado podría dejar pasar campos con null y erroneos.
