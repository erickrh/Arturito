const formulario = document.getElementById('formTasks');
formulario.addEventListener('submit', saveTask);

function saveTask(e) {
  let description = document.getElementById('areaTexto').value;

  const task = {
    description
  }

  if (localStorage.getItem('tasksList') === null) {
    let tasksList = [];
    tasksList.unshift(task);
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
  } else {
    let tasksList = JSON.parse(localStorage.getItem('tasksList'));
    tasksList.unshift(task);
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
  }
  e.preventDefault();

  getTasks();
  formulario.reset();
}

function getTasks() {
  if (localStorage.getItem('tasksList') === null) {
    let tasksList = [];
    localStorage.setItem('tasksList', JSON.stringify(tasksList));
  } else {
    let tasksList = JSON.parse(localStorage.getItem('tasksList'));
    let recordatorios = document.getElementById('recordatorios');
  
    recordatorios.innerHTML = "";
  
    for (let i = 0; i < tasksList.length; i++) {
      let description = tasksList[i].description;
      
      recordatorios.innerHTML += `
      <div class="card mb-3 animate__animated animate__headShake">
        <div class="card-body">
          <p>${description}</p>
          <div class="btn btn-danger btn-sm" onclick="deleteTasks('${i}')">Delete</div>
        </div>
      </div>
      `; // End Template String
    }
  }
}

function deleteTasks(i) {
  let tasksList = JSON.parse(localStorage.getItem('tasksList'));
  tasksList.splice(i, 1);

  // Save Tasks
  localStorage.setItem('tasksList', JSON.stringify(tasksList));
  
  // Show new tasks
  getTasks();
}

getTasks();