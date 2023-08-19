module.exports = {
  validarTextInputs(query) {
    let ExpRegSoloLetras = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
    // Distinto de NULL, hay match ---> true !!
    if (query.match(ExpRegSoloLetras) != null) {
      return true;
    } else {  
      return false;
    }
  },
  validarNumberInputs(numero) {
    let ExpRegSoloNumeros = "^[0-9]+$";
    if (numero.match(ExpRegSoloNumeros) != null) {  
      return true;
    } else {
      return false;
    }
  },
  
  detectarNull(busqueda) {
    if (busqueda != null) {
      return true
    } else {
      return false
    }
  },

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

//module.exports = (validarRutas, validarTextInputs, validarNumberInputs)


