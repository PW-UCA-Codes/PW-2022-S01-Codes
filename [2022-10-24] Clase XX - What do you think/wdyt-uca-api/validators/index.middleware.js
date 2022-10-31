const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  //validar los parametros (Generica)
  const errors = validationResult(req);

  //Vrificamos si hay error
  if (!errors.isEmpty()) {
    //Retorno 400

    return res.status(400)
      .json({
        errors: errors.array().map(error => ({
          field: error.param,
          message: error.msg
        }))
      })
  }

  //Paso al siguiente middleware
  next();
}