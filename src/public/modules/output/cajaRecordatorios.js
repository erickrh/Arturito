"use strict";

var formulario = document.getElementById('formTasks');
formulario.addEventListener('submit', saveTask);

function saveTask(e) {
  var description = document.getElementById('areaTexto').value;
  var task = {
    description: description
  };

  if (localStorage.getItem('tasksList') === null) {
    var tasksList = [];
    tasksList.push(task);
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
  } else {
    var _tasksList = JSON.parse(localStorage.getItem('tasksList'));

    _tasksList.push(task);

    localStorage.setItem('tasksList', JSON.stringify(_tasksList));
  }

  e.preventDefault();
  getTasks();
  formulario.reset();
}

function getTasks() {
  if (localStorage.getItem('tasksList') === null) {
    var tasksList = [];
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
  } else {
    var _tasksList2 = JSON.parse(localStorage.getItem('tasksList'));

    var recordatorios = document.getElementById('recordatorios');
    recordatorios.innerHTML = "";

    for (var i = 0; i < _tasksList2.length; i++) {
      var description = _tasksList2[i].description;
      recordatorios.innerHTML += "\n      <div class=\"card mb-3 animate__animated animate__headShake\">\n        <div class=\"card-body\">\n          <p>".concat(description, "</p>\n          <div class=\"btn btn-danger btn-sm\" onclick=\"deleteTasks('").concat(description, "')\">Delete</div>\n        </div>\n      </div>\n      "); // End Template String
    }
  }
}

function deleteTasks(description) {
  var tasksList = JSON.parse(localStorage.getItem('tasksList'));

  for (var i = 0; i < tasksList.length; i++) {
    if (tasksList[i].description == description) {
      tasksList.splice(i, 1);
    }
  } // Save Tasks


  localStorage.setItem('tasksList', JSON.stringify(tasksList)); // Show new tasks

  getTasks();
}

getTasks();