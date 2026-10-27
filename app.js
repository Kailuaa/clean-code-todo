const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  const taskLabel = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  taskLabel.innerText = taskText; //innerText encodes special characters, HTML does not.
  taskLabel.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkbox, taskLabel, editInput, editButton, deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const taskItem = this.parentNode;

  const editInput = taskItem.querySelector('input[type=text]');
  const taskLabel = taskItem.querySelector('label');
  const editBtn = taskItem.querySelector('.edit');

  if (taskItem.classList.contains('editMode')) {
    taskLabel.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = taskLabel.innerText;
    editBtn.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  this.parentNode.remove();
};

const taskCompleted = function () {
  const taskItem = this.parentNode;
  completedTasksHolder.appendChild(taskItem);
  bindTaskEvents(taskItem, taskIncomplete);
};

const taskIncomplete = function () {
  const taskItem = this.parentNode;
  incompleteTaskHolder.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskItem, checkBoxEventHandler) {
  const checkbox = taskItem.querySelector('input[type=checkbox]');
  const editButton = taskItem.querySelector('button.edit');
  const deleteButton = taskItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = checkBoxEventHandler;
};

const bindEventsToTasks = function (taskList, checkboxEventHandler) {
  Array.from(taskList.children).forEach((taskItem) => {
    bindTaskEvents(taskItem, checkboxEventHandler);
  });
};

bindEventsToTasks(incompleteTaskHolder, taskCompleted);
bindEventsToTasks(completedTasksHolder, taskIncomplete);
