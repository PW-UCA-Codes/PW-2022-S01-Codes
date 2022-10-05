const divPromise = (a, b) => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Calculando ${a} / ${b}`);

      if (b == 0) {
        reject(new Error("Error: Div entre 0"));
      } else {
        resolve(a / b);
      }

    }, 3000);
  });

}

console.log("------ Antes de la promesa ------");

divPromise(2, 3)
  .then((result) => {
    console.log(`El resultado 01 es: ${result}`);
    return divPromise(result, 5);
  })
  .then(result => {
    console.log(`El resultado 02 es: ${result}`);
  })
  .catch((error) => { 
    console.error(error.message);
  })

console.log("------ Después de la promesa ------");