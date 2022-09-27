const promiseFunc = () => {
  return new Promise((resolve, reject) => {
    
    //Proceso largo
    setTimeout(()=> {
      console.log("------ No me mintieron ------");
      resolve();
    }, 3000);

    

  });
}

console.log("------ Antes de la promesa ------");

promiseFunc()
  .then(() => {
    console.log("------ Después de la promesa (100% real) ------");
  });

console.log("------ Después de la promesa ------");