let operation = [], newvalue = '', oldvalue = '', result = '';

const display = document.querySelector('#display'),
      ongoingvalue = document.querySelector('#ongoing_process'),
      buttons = document.querySelectorAll('button');

function process() {
  oldvalue = '';
  newvalue = '';
  operation = [];
  display.innerHTML = '0';
  ongoingvalue.innerHTML = '';
  buttons.forEach(attachListener);
  console.log('Clear');
}

function attachListener(button) {
  button.addEventListener('click', handleClick);
};

function handleClick(event) {
  let e = event.currentTarget;
  if (e.value === 'equals') {
    handleOperation();
  } else if (e.value === 'clear') {
    process();
  } else if (e.classList.contains('operator')) {
    handleOperator(e);
  } else if (e.classList.contains('function')) {
    handleFunction(e);
  } else {
    handleNumbers(e.value);
  }
};

function handleOperation() {
  if (!oldvalue) {
    return;
  };
  operation.push(parseInt(newvalue));
  ongoingvalue.innerHTML += newvalue;
  while (operation.length > 1) {
    console.log(`Report: ${operation}`);
    if (operation.includes('multiply')) {
      let m = operation.indexOf('multiply');
      console.log(operation);
      operation.splice(m - 1, 3, multiply(operation[m - 1], operation[m + 1]));
    } else if (operation.includes('divide')) {
      let d = operation.indexOf('divide');
      console.log(operation);
      operation.splice(d - 1, 3, divide(operation[d - 1], operation[d + 1]));
    } else if (operation.includes('add')) {
      let a = operation.indexOf('add');
      console.log(operation);
      operation.splice(a - 1, 3, add(operation[a - 1], operation[a + 1]));
    } else {
      let s = operation.indexOf('subtract');
      console.log(operation);
      operation.splice(s - 1, 3, subtract(operation[s - 1], operation[s + 1]));
    }
  }
  newvalue = operation[0];
  oldvalue = '';
  operation = [];
  display.innerHTML = Number.isInteger(newvalue) ? newvalue : parseFloat(newvalue.toFixed(4));
}

function handleOperator(operator) {
  if (!newvalue) {
    return;
  } 
  !oldvalue ? ongoingvalue.innerHTML = `${newvalue} ${operator.textContent} ` : ongoingvalue.innerHTML += `${newvalue} ${operator.textContent} `; 
  oldvalue = Number(newvalue);
  operation.push(oldvalue);
  operation.push(operator.value);
  newvalue = '';
  display.innerHTML = '';
}

function handleFunction(key) {
  switch(key.value) {
    case 'percent':
      newvalue = percent(newvalue);
      display.innerHTML = `${newvalue} `;
      break;
    case 'sign':
      newvalue = sign(newvalue);
      display.innerHTML = `${newvalue} `;
      break;
    case 'decimal':
      if (newvalue.includes('.')) {
        return;
      }
      newvalue += '.';
      display.innerHTML = `${newvalue}`;
      break;
    default:
      break;
  }
}

function handleNumbers(num) {
  newvalue += num;
  display.innerHTML = `${newvalue} `
}

function add() {
  return arguments[0] + arguments[1];
}

function subtract() {
  return arguments[0] - arguments[1];
}

function multiply() {
  return arguments[0] * arguments[1];
}

function divide() {
    if (arguments[1] == 0) {
        display.innerHTML = 'Error';    }
    else return arguments[0] / arguments[1];
}

function percent(num) {
  return num/100;
}

function sign(num) {
  return num * -1;
}

process();