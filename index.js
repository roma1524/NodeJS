function arrSimpleNumber(){
  let arrSim = [2];  // Изначальное значение в массиве
  let num = 3;       // Значение, с которого мы начинаем обход

  for(num; num <= 100; num++){
    if(simpleCheck(num, arrSim)){ // функция в if вернет либо true либо false
      arrSim.push(num);
    }
  }
  return arrSim;
}

function simpleCheck(n, arr) {
  let mark = true;

  arr.forEach(elm => {
    if(!(n % elm)) mark = false;
  })
  return mark;
}

console.log(arrSimpleNumber());