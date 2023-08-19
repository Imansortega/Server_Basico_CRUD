/* 
Esta función evalua la cantidad de documentos que hay en una colección y le pone
al documento a dar de alta, cuyo nombre se pasa como argumento en el body,
el número de id igual a nro de documentos + 1.
Solo para ser llamado después de la creación de un documento en el controlador
*/
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const uri = process.env.MONGODB_URISTRING;

const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(uri);

module.exports = {
  async repetidos(name, myId) {
    try {
      console.log(name, " - ", myId)
      await client.connect();
      const collection = client.db("Pruebas").collection("Frutas");
      const total = await collection.countDocuments();
      const IdRepetido = await collection.findOne({ id: myId });
      const NombreRepetido = await collection.findOne({ nombre: name });
      if (IdRepetido != null || NombreRepetido != null) {
        console.log("El id o nombre ya existen");
        return true;
      } else {
        console.log("El id o nombre NO existen");
        return false;
      }

    } catch (error) {
      console.error("Error al acceder la base", error);
    } finally {
      await client.close();
    }
  },
};
