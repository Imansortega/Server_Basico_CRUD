const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const uri = process.env.MONGODB_URISTRING;

const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(uri);

module.exports = {
  /* 
    Función que propone (número docs) + 1 como el id para un nuevo documento.
    Posteriormente busca si el id existe. Si existe, incrementa en uno el id y 
    lo vuelve a buscar. Así hasta que encuentre un id libre. En ese momento lo devuelve 
    en un return, en la variable "total".
  */
  async generaId() {
    try {
      await client.connect();
      const collection = client.db("Pruebas").collection("Frutas");
      // Propongo id = total docs + 1
      let total = await collection.countDocuments();
      // Busco si existe
      let IdRepetido = 0;
      do {
        total = total + 1;
        IdRepetido = await collection.findOne({ id: total });
      } while (IdRepetido != null);
      return total;
    } catch (error) {
      console.error("generaId: Error al acceder la base", error);
    } finally {
      await client.close();
    }
  },

  /* 
  Chequea si el documento a crear ya ha sido creado
*/
  async repetidos(name) {
    try {
      await client.connect();
      const collection = client.db("Pruebas").collection("Frutas");
      const total = await collection.countDocuments();
      const NombreRepetido = await collection.findOne({ nombre: name });
      if (NombreRepetido != null) {
        //console.log("repetidos: El nombre ya existe");
        return true;
      } else {
        //console.log("repetidos: El nombre NO existe");
        return false;
      }
    } catch (error) {
      console.error("Error al acceder la base", error);
    } finally {
      await client.close();
    }
  }

};
