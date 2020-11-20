let addMessage = document.querySelector('.today-add__message'),
  todo = document.querySelector('.today-list'),
  todoList = [],
  lvl = '',
  lvlNumber = "1";
  document.querySelector(".lvl-count").innerHTML = String(lvlNumber);
  newDay = document.querySelector(".header-info__button");

if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessage();
}

if (localStorage.getItem('lvlprogress')) {
  lvl = JSON.parse(localStorage.getItem('lvlprogress'));
  displayMessage();
}

if (localStorage.getItem('lvlnumber')) {
  lvlNumber = JSON.parse(localStorage.getItem('lvlnumber'));
  displayMessage();
}

newDay.addEventListener('click', function () {
  todoList.forEach(function (item) {
    item.checked = false;
    localStorage.setItem('todo', JSON.stringify(todoList));
    displayMessage();
  });
});

addMessage.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    if (!addMessage.value) return;
    let newTodo = {
      todo: addMessage.value,
      checked: false
    };
    todoList.push(newTodo);
    displayMessage();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = "";
    localStorage.setItem('lvlprogress', JSON.stringify(lvl));
    localStorage.setItem('lvlnumber', JSON.stringify(lvlNumber));
  }
});

todo.addEventListener('change', function (event) {
  let idInput = event.target.getAttribute('id');
  let forLabel = todo.querySelector('[for=' + idInput + ']');
  let valueLabel = forLabel.innerHTML;

  todoList.forEach(function (item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(todoList));

      if (item.checked === true) {
        lvl = document.querySelector('.header-info__progress').value += 10;
        localStorage.setItem('lvlprogress', lvl);
      } else {
        lvl = document.querySelector('.header-info__progress').value -= 10
        localStorage.setItem('lvlprogress', lvl);
      };
    }
  });
  if (lvl >= 100) {
    lvl = 0;
    lvlNumber = +lvlNumber + 1;
    document.querySelector(".lvl-count").innerHTML = String(lvlNumber);
    localStorage.setItem('lvlnumber', lvlNumber);
    localStorage.setItem('lvlprogress', lvl);
    displayMessage();
  };
  if (lvl < 0) {
    lvl = 100
    lvlNumber = +lvlNumber - 1;
    document.querySelector(".lvl-count").innerHTML = String(lvlNumber);
    localStorage.setItem('lvlnumber', lvlNumber);
    localStorage.setItem('lvlprogress', lvl);
    displayMessage();
  }
});

removeTask();

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
      localStorage.setItem('todo', JSON.stringify(todoList));
    });
  });
}