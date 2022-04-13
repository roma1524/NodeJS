require('colors');
const Colors = {GREEN: 0, YELLOW: 1, RED: 2};

let currentColor = Colors.GREEN;
const firstArg = +process.argv[2];
const secondArg = +process.argv[3];
let notASimplу = true;

if (isNaN(firstArg) || isNaN(secondArg)) {
  console.log('Error'.red);
  return;
}

const simpleNumber = (num) => {
  if (num <= 1) return false;

  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
    return true;
  }
}

const changeColor = () => {
  currentColor++;
  if (currentColor > Colors.RED)
    currentColor = Colors.GREEN;
}


const colorPrint = (num) => {
  if (notASimplу) notASimplу = false;
  switch (currentColor) {
    case Colors.RED:
      console.log(`${num}`.red);
      break;
    case Colors.GREEN:
      console.log(`${num}`.green);
      break;
    case Colors.YELLOW:
      console.log(`${num}`.yellow);
      break;
  }
  changeColor();
}


for (let i = firstArg; i <= secondArg; i++) {
  if (simpleNumber(i)) colorPrint(i);
}
if (notASimplу)
  console.log('Not a simple number' + firstArg + secondArg.red);

console.log(process.argv[2].red)