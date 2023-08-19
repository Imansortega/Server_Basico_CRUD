module.exports = {
  validarTextInputs(query) {
    //console.log(query);
    var ExpRegSoloLetras = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";
    if (query.match(ExpRegSoloLetras) != null) {
      return true;
    } else {
      return false;
    }
  },
  validarNumberInputs(numero) {
    var ExpRegSoloNumeros = "^[0-9]+$";
    return NumeroValido.match(ExpRegSoloNumeros);
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
