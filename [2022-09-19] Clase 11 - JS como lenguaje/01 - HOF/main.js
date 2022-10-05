const calculate = (numbers = [], process) => {
  if(numbers.length === 0) return 0;

  let prev = numbers[0];

  for(let i=1; i<numbers.length; i++) {
    prev = process(prev, numbers[i]);
  }

  return prev;
}

const flatArray = (key = "add") => {
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

  return (numbers = []) => calculate(numbers, selectedProcess);
}

// Main function

const main = () => {
  const testNumbers01 = [5, 4 ,9, 8 ,7, 3, 10];

  /* const result = calculate(testNumbers01);
  console.log(`Suma de elementos: ${result}`); */

  console.log("-------- CALLBACKS --------\n");

  const addCallback =   (a, b) => a + b;
  const subCallback =   (a, b) => a - b;
  const timesCallback = (a, b) => a * b;
  const divCallback =   (a, b) => b === 0 ? a : a/b;

  console.log(`Suma de elementos: ${calculate(testNumbers01, addCallback)}`);
  console.log(`Resta de elementos: ${calculate(testNumbers01, subCallback)}`);
  console.log(`Producto de elementos: ${calculate(testNumbers01, timesCallback)}`);
  console.log(`División de elementos: ${calculate(testNumbers01, divCallback)}`);
  console.log(`Módulo de elementos: ${calculate(testNumbers01, (a, b)=> a % b)}`);


  console.log("\n-------- CALLBACKS --------");
  console.log("-------- Higher Order Function --------\n");

  console.log(`Suma de elementos: ${flatArray("add")(testNumbers01)}`);
  console.log(`Suma de elementos: ${flatArray()(testNumbers01)}`);
  console.log(`Resta de elementos: ${flatArray("suB")(testNumbers01)}`);
  console.log(`Producto de elementos: ${flatArray("tImeS")(testNumbers01)}`);
  console.log(`División de elementos: ${flatArray("Div")(testNumbers01)}`);
  console.log(`Nada de elementos: ${flatArray("Michelle")(testNumbers01)}`);
  
  console.log("\n-------- Higher Order Function --------");


}

main();