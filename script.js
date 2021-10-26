const body = document.querySelector("body");
// const theme1 = document.getElementById("theme1");
// const theme2 = document.getElementById("theme2");
// const theme3 = document.getElementById("theme3");
const theme1 = document.querySelector(".theme--1");
const theme2 = document.querySelector(".theme--2");
const theme3 = document.querySelector(".theme--3");

theme1.addEventListener("click", (e) => {
  e.preventDefault();

  body.classList.add("theme1");
  body.classList.remove("theme2");
  body.classList.remove("theme3");
});

theme2.addEventListener("click", (e) => {
  e.preventDefault();

  body.classList.remove("theme1");
  body.classList.add("theme2");
  body.classList.remove("theme3");
});

theme3.addEventListener("click", (e) => {
  e.preventDefault();

  body.classList.remove("theme1");
  body.classList.remove("theme2");
  body.classList.add("theme3");
});

const screen = document.querySelector(".screen");
const numbers = document.querySelectorAll("[data-number]");
const operations = document.querySelectorAll("[data-operation]");
const del = document.querySelector("[data-del]");
const reset = document.querySelector("[data-reset]");
const equal = document.querySelector("[data-equal]");

let num = "";
let prev = "";
let cur = "";
let operator;
let hasDot = false;

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    e.preventDefault();

    num = e.target.innerText;

    if (num === "." && !hasDot) {
      hasDot = true;
    } else if (num === "." && hasDot) {
      return;
    }

    if (prev === "") {
      cur = cur + num;
      screen.innerText = cur;
    } else if (prev !== "") {
      cur = cur + e.target.innerText;
      screen.innerText = prev + " " + operator + " " + cur;
    }
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    e.preventDefault();
    if (operator) {
      screen.innerText = "";
      compute(operator);
    }

    hasDot = false;

    if (cur === "") {
      if (prev === "") {
        return;
      } else if (prev !== "") {
        operator = e.target.innerText;
        screen.innerText = prev + " " + operator;
      }
    } else if (cur !== "") {
      if (prev === "") {
        prev = cur;
        operator = e.target.innerText;
        screen.innerText = prev + " " + operator;
        cur = "";
      } else if (prev !== "") {
        operator = e.target.innerText;
        screen.innerText = cur + " " + operator;
        prev = cur;
        cur = "";
      }
    }
  });
});

function compute(operation) {
  if (cur === "") {
    return;
  }
  {
    switch (operation) {
      case "+":
        cur = parseFloat(prev) + parseFloat(cur);
        break;
      case "x":
        cur = parseFloat(prev) * parseFloat(cur);
        break;
      case "-":
        cur = parseFloat(prev) - parseFloat(cur);
        break;
      case "/":
        cur = parseFloat(prev) / parseFloat(cur);
        break;
      default:
        return;
    }
  }
}

reset.addEventListener("click", (e) => {
  e.preventDefault();

  cur = "";
  prev = "";
  operator = "";
  screen.innerText = "";
});

del.addEventListener("click", (e) => {
  e.preventDefault();

  if (prev && operator && cur) {
    cur = cur.toString().slice(0, -1);
    screen.innerText = prev + " " + operator + " " + cur;
  } else if (prev && operator && !cur) {
    cur = parseFloat(screen.innerText.slice(0, -1).replace(" ", ""));
    operator = "";
    screen.innerText = cur;
    prev = "";
  } else if (prev && !operator && !cur) {
    cur = parseFloat(screen.innerText.trim().slice(0, -1));
    screen.innerText = cur;
    prev = "";
  } else if (!prev && !operator && cur) {
    if (screen.innerText.length > 1) {
      cur = parseFloat(screen.innerText.trim().slice(0, -1));
      screen.innerText = cur;
    } else {
      cur = "";
      screen.innerText = cur;
    }
  } else if (screen.innerText === "") {
    return;
  }
});

equal.addEventListener("click", (e) => {
  e.preventDefault();

  compute(operator);
  screen.innerText = cur;
  prev = "";
  operator = "";
});

document.addEventListener("keydown", (event) => {
  //   event.preventDefault();

  if (
    event.key === "0" ||
    event.key === "1" ||
    event.key === "2" ||
    event.key === "3" ||
    event.key === "4" ||
    event.key === "5" ||
    event.key === "6" ||
    event.key === "7" ||
    event.key === "8" ||
    event.key === "9" ||
    event.key === "."
  ) {
    clickNumber(event.key);
  } else if (event.key === "/" || event.key === "-" || event.key === "+") {
    clickOperation(event.key);
  } else if (event.key === "*") {
    clickOperation("x");
  } else if (event.key === "Enter") {
    clickEqual();
  }

  switch (event.key) {
    case "Backspace":
      del.click();
      break;

    case "c":
      reset.click();
      break;
  }
});

function clickNumber(key) {
  numbers.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickOperation(key) {
  operations.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}

function clickEqual() {
  equal.click();
}
