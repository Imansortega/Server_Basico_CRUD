module.exports = {
  
  // Valida que solo haya caracteres alfabéticos
  validarTextInputs(query) {
    let ExpRegSoloLetras = "^[a-zA-_ZñÑáéíóúÁÉÍÓÚ]+$";
    // Distinto de NULL, hay match ---> true !!
    if (query.match(ExpRegSoloLetras) != null) {
      return true;
    } else {
      return false;
    }
  },

  // Valida que solo haya numeros. Igual Postman no los admite
  validarNumberInputs(numero) {
    let ExpRegSoloNumeros = "^[0-9]+$";
    if (numero.match(ExpRegSoloNumeros) != null) {
      const p = false
      console.log("*Texto NO OK ",p)
      return true;
    } else {
      const q = true
      console.log("*Texto OK ",q)
      return false;
    }
  },

  // Detectar campos nulos
  detectarNull(busqueda) {
    if (busqueda != null) {
      return true;
    } else {
      return false;
    }
  },

  validaCampos(myId, name,importe,stock) {
    if (
      myId == null || name == null ||
      importe == undefined || stock == undefined ||
      myId == undefined || name == undefined ||
      importe == undefined || stock == undefined ||
      !this.validarTextInputs(name)
      ) {
        const p = false
      return p;
      } else {
        const q = true
        return q
      }
  },

  validaIdImporte(id, importe) {
    if (
      myId == null || name == null ||
      importe == null || stock == null ||
      myId == undefined || name == undefined ||
      importe == undefined || stock == undefined ||
      !validar.validarTextInputs(name)
    ) {
      return false;
    }
  },

  // Valida rutas. No se usa
  validarRutas(ruta) {
    switch (ruta) {
      case "/":
        return true;
        break;
      case "/Frutas":
        return true;
        break;
      case "/Frutas/nombre/:nombre":
        return true;
        break;
      case "/Frutas/parcial/:parcial":
        return true;
        break;
      default:
        return false;
        break;
    }
    return error;
  },
};
