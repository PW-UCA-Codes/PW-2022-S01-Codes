const calculatePromise = (a, b, process) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(process(a, b));
    }, 1000);
  })
}

const getCalculator = (key = "add") => {
  let selectedProcess = () => 0;

  switch(key.toUpperCase()) {
    case "ADD":
      selectedProcess = (a, b) => a + b;
      break;
    case "SUB":
      selectedProcess = (a, b) => a - b;
      break;
    case "TIMES":
      selectedProcess = (a, b) => a * b;
      break;
    case "DIV":
      selectedProcess = (a, b) => b === 0 ? a : a / b;
      break;  
  }

  return (a, b) => calculatePromise(a, b, selectedProcess);
}

const add = getCalculator("add");
const sub = getCalculator("sub");
const times = getCalculator("times");
const div = getCalculator("div");

// Ejecución

console.log("------ Antes de la promesa ------");


add(1, 3)
  .then(result => {
    console.log(`El resultado es: ${result}`);
    return sub(result, 2);
  })
  .then(result => {
    console.log(`El resultado es ${result}`);
    return times(result, 10);
  })
  .then(result => {
    console.log(`El resultado es: ${result}`);
    return div(result, 0);
  })
  .then (result => {
    console.log(`El resultado es: ${result}`);
  });

console.log("------ Después de la promesa ------");
