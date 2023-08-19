module.exports = {
  
  // Valida que el solo haya caracteres alfabéticos
  validarTextInputs(query) {
    let ExpRegSoloLetras = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
    // Distinto de NULL, hay match ---> true !!
    if (query.match(ExpRegSoloLetras) != null) {
      return true;
    } else {
      return false;
    }
  },

  // Valida que el solo haya numeros. Igual Postman no los admite
  validarNumberInputs(numero) {
    let ExpRegSoloNumeros = "^[0-9]+$";
    if (numero.match(ExpRegSoloNumeros) != null) {
      return true;
    } else {
      return false;
    }
  },

  // DEtectar campos nulos
  detectarNull(busqueda) {
    if (busqueda != null) {
      return true;
    } else {
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
