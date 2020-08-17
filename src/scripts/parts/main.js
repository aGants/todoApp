export default function initToDoList() {
  loadingLocalStorage();
  newDayButton();
  addToDo();
  watchCheck();
  removeTask();
}
let addMessage = document.querySelector('.today-add__message'),
todo = document.querySelector('.today-list'),
todoList = [],
lvl = '',
lvlNumber = "1";
document.querySelector(".lvl-count").innerHTML = String(lvlNumber);

function loadingLocalStorage() {
  todoList = checkLocalStorage('todo');
  lvl = checkLocalStorage('lvlprogress');
  lvlNumber = checkLocalStorage('lvlnumber');
  displayMessage();
}

function checkLocalStorage(key) {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    switch (key) {
      case todo: return [];
      case lvl: return ''; 
      case lvlNumber: return '1';
    }
  }
}

function addStringToLocal(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

function newDayButton() {
  let newDay = document.querySelector(".header-info__button");
  newDay.addEventListener('click', function () {
    todoList.forEach(function (item) {
      item.checked = false;
      addStringToLocal('todo', todoList);
      displayMessage();
    });
  });
}

function addToDo() {  
  return addMessage.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
      if (!addMessage.value) return;
      let newTodo = {
        todo: addMessage.value,
        checked: false
      };
      todoList.push(newTodo);
      displayMessage();
      addStringToLocal('todo', todoList);
      addMessage.value = "";
      addStringToLocal('lvlprogress', lvl);
      addStringToLocal('lvlnumber', lvlNumber);
    }
  });
}
 
function watchCheck() {
  todo.addEventListener('change', function (event) {
  let idInput = event.target.getAttribute('id');
  let forLabel = todo.querySelector('[for=' + idInput + ']');
  let valueLabel = forLabel.innerHTML;
  todoList.forEach(function (item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      addStringToLocal('todo', todoList);
      progressChange(item);
    }
  });
  lvlUp();
  lvlDown();
  });
}

function lvlUp() {
  if (lvl >= 100) {
    lvl = 0;
    lvlNumber = +lvlNumber + 1;
    lvlSave();
  }
}

function lvlDown() {
  if (lvl < 0) {
    lvl = 100;
    lvlNumber = +lvlNumber - 1;
    lvlSave();
  }
}

function lvlSave() {
  document.querySelector(".lvl-count").innerHTML = String(lvlNumber);
  addStringToLocal('lvlnumber', lvlNumber);
  addStringToLocal('lvlprogress', lvl);
  displayMessage();
}

function progressChange(item) {
  if (item.checked === true) {
    lvl = document.querySelector('.header-info__progress').value += 10;
    addStringToLocal('lvlprogress', lvl);
  } else {
    lvl = document.querySelector('.header-info__progress').value -= 10;
    addStringToLocal('lvlprogress', lvl);
  }
}

function displayMessage() {
  let displayMessage = '';
  todoList.forEach(function (item, i) {
    displayMessage += `
      <li class = 'today-list__item' >
          <input type = 'checkbox' id = 'item_${i}' ${item.checked ? 'checked' : ''}>
          <label for='item_${i}'>${item.todo}</label> 
          <input type = "image"class = "today-list__item-delete delete" id = "${i}" src = "assets/images/delete.png" >
      </li>`;
    todo.innerHTML = displayMessage;
    removeTask();
    document.querySelector('.header-info__progress').value = lvl;
    document.querySelector(".lvl-count").innerHTML = String(lvlNumber);
  });

}

function removeTask() {
  document.querySelectorAll('.today-list__item-delete').forEach(function (item) {
    item.addEventListener('click', function () {
      let todelete = item.getAttribute('id');
      let listItem = this.parentNode;
      let ul = listItem.parentNode;
      ul.removeChild(listItem);
      todoList.splice(todelete, 1);
      displayMessage();
      addStringToLocal('todo', todoList);
    });
  });
}