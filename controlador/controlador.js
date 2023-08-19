const validar = require("../Utils/validador");
const check = require("../Utils/poneElId");

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const uri = process.env.MONGODB_URISTRING;

const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(uri);

// Mensaje de bienvenida
async function casa(req, res) {
  res.send("Frutas para todos y todas!!");
}

// Listado completo.
async function listado(req, res) {
  try {
    await client.connect();
    console.log("listado: Conexión exitosa a la BD !");
    const collection = client.db("Pruebas").collection("Frutas");
    const frutas = await collection.find().toArray();
    if (frutas == null)
      res.status(404).res.status(404).json("No se encontró su búsqueda");
    res.json(frutas);
    // Informe del query
    console.log("El query --> Todos los documentos");
    const total = await collection.countDocuments();
    console.log("Total de documentos --> ", total, "\n");
  } catch (error) {
    console.error("Listado: Error al acceder la base");
    res.status(500).json({ error: "Listado: Error del servidor" });
  } finally {
    await client.close();
  }
}

// Busca nombre exacto, es case sensitive
async function singleNameSearch(req, res) {
  if (!validar.validarTextInputs(req.params.nombre)) {
    res.status(400).send("Nombre inválido");
    return;
  }
  try {
    await client.connect();
    console.log("singleNameSearch: Conexión exitosa a la BD !");
    const collection = client.db("Pruebas").collection("Frutas");
    const frutas = await collection.findOne(req.params);  
    if (frutas == null)  {
      res.status(404).json("No se encontró su búsqueda")
    } else {
    res.json(frutas);
    }
  } catch (error) {
    res.status(500).json("singleNameSearch: Error del servidor" );
  } finally {
    await client.close();
  }
}

// Búsqueda parcial, es case sensitive
async function busquedaParcial(req, res) {
  if (!validar.validarTextInputs(req.params.parcial)) {
    res.status(400).send("Nombre inválido");
    return;
  }
  try {
    var reg = new RegExp(req.params.parcial);
    await client.connect();
    console.log("singleNameSearch: Conexión exitosa a la BD !");
    const collection = client.db("Pruebas").collection("Frutas");
    const frutas = await collection.find({ nombre: { $regex: reg } }).toArray();

    res.json(frutas);
    
  } catch (error) {
    if (frutas.length === 0) {
      console.log("singleNameSearch: No se encontro un resultado -->",frutas.length)
      res.status(404).res.json("No se encontró su búsqueda")
    } else {   
      console.log(frutas.length)
      res.json(frutas);
    }
    console.error("busquedaParcial: Error al acceder la base");
    
    res.status(500).json({ error: "busquedaParcial: Error del servidor" });
  } finally {
    await client.close();
  }
}

async function modificaDoc(req, res) {
  try {
    await client.connect();
    console.log("modificaDoc: Conexión exitosa a la BD !");
    var id = req.params.id;
    let newData = req.body;
    let importe = newData.importe;

    if (
      id == null ||
      newData.importe == null ||
      id == undefined ||
      newData.importe == undefined
    ) {
      res.status(400).send("Modifica: Datos vacios o erroneos !");
      return;
    }

    const collection = client.db("Pruebas").collection("Frutas");
    const frutas = await collection.findOne(req.params.nombre);

    await collection.updateOne(
      { id: parseInt(frutas.id) },
      { $set: { importe: importe } }
    );

    res.json("Modificación exitosa");
  } catch (error) {
    console.error("modificaDoc: Error al acceder la base");
    res.status(500).json({ error: "modificaDoc: Error del servidor" });
  } finally {
    await client.close();
  }
}

async function altaDoc(req, res) {
  try {
    await client.connect();
    console.log("altaDoc: Conexión exitosa a la BD !");
    let obj = req.body;
    let myId = req.body.id;
    let name = req.body.nombre;

    if (
      (obj.id == null && obj.name == null) ||
      (obj.id == undefined && obj.name == undefined)
    ) {
      res.status(400).send("Alta: Datos vacios o erroneos !");
      return;
    }

    const collection = client.db("Pruebas").collection("Frutas");
    const total = (await collection.countDocuments()) + 1;

    if (!(await check.repetidos(name, myId))) {
      const frutas = await collection.insertOne(obj);
      await collection.updateOne(
        { nombre: name },
        { $set: { id: parseInt(total) } }
      );
      res.json(obj);
    } else {
      console.log("else");
      res.status(409).json("El id o nombre ya existen");
    }
  } catch (error) {
    console.error("altaDoc: Error al acceder la base");
    res.status(500).json({ error: "altaDoc: Error del servidor" });
  } finally {
    await client.close();
  }
}

module.exports = {
  casa,
  listado,
  singleNameSearch,
  busquedaParcial,
  modificaDoc,
  altaDoc,
};
