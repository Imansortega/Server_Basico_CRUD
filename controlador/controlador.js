/* 
  Controlador para las rutas definidas
*/
const validar = require("../Utils/validador");
const check = require("../Utils/poneElId");

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const uri = process.env.MONGODB_URISTRING;

const { MongoClient, ObjectId } = require("mongodb");
const client = new MongoClient(uri);

// Mensaje de bienvenida para root
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
  } 
  
  catch (error) {
    console.error("Listado: Error del servidor");
    res.status(500).json("Listado: Error del servidor");
  } 
  finally {
    await client.close();
  }
}

// Busca nombre exacto, es case sensitive, retorna la primera ocurrencia
async function singleNameSearch(req, res) {

  // Valida que el texto sea alfabético
  if (!validar.validarTextInputs(req.params.nombre)) {
    res.status(400).send("Nombre inválido");
    return;
  }

  try {
    await client.connect();
    console.log("singleNameSearch: Conexión exitosa a la BD !");
    const collection = client.db("Pruebas").collection("Frutas");
    const frutas = await collection.findOne(req.params);

    if (frutas == null) {
      res.status(404).json("No hay resultados de su búsqueda");
    } else {
      res.json(frutas);
    }
  } 
  catch (error) {
    res.status(500).json({ error: "singleNameSearch: Error del servidor" });
  } 
  finally {
    await client.close();
  }
}

// Búsqueda parcial, es case sensitive
async function busquedaParcial(req, res) {

  // Valida que el texto sea alfabético
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

    if (frutas.length == 0) {
      res.status(404).json("No hay resultados de su búsqueda");
    } else {
      res.json(frutas);
    }
  } 
  
  catch (error) {
    res.status(500).json({ error: "busquedaParcial: Error del servidor" });
  } finally {
    await client.close();
  }
}

// Modifica solo el precio de un documento individual
async function modificaDoc(req, res) {

  try {
    await client.connect();
    console.log("modificaDoc: Conexión exitosa a la BD !");
    var id = req.params.id;
    let newData = req.body;
    let importe = newData.importe;

    // Control de nulos, indefinidos y campo numérico
    if (
      id == null ||
      importe == null ||
      id == undefined ||
      importe == undefined ||
      validar.validarNumberInputs(toString(importe))
    )
    {
      res.status(400).send("ModificaDoc: Datos vacios o erroneos !");
      return;
    }

    const collection = client.db("Pruebas").collection("Frutas");
    const frutas = await collection.findOne(req.params.nombre);

    await collection.updateOne(
      { nombre: id },
      { $set: { importe: importe } }
    );
    res.json("Modificación exitosa");
  } 
  catch (error) {
    console.error("modificaDoc: Error del servidor");
    res.status(500).json({ error: "modificaDoc: Error del servidor" });
  } 
  finally {
    await client.close();
  }
}

// Alta de un nuevo producto/documento
async function altaDoc(req, res) {

  try {
    await client.connect();
    console.log("altaDoc: Conexión exitosa a la BD !");
    let obj = req.body;
    let myId = req.body.id;
    let name = req.body.nombre;
    
    // Control validez de id y nombre
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
  } 
  catch (error) {
    console.error("altaDoc: Error al acceder la base");
    res.status(500).json({ error: "altaDoc: Error del servidor" });
  } 
  finally {
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
