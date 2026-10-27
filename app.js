const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incompleteTasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  const taskLabel = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  taskLabel.innerText = taskString; //innerText encodes special characters, HTML does not.
  taskLabel.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkbox);
  listItem.appendChild(taskLabel);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
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
  const isEditing = taskItem.classList.contains('editMode');

  if (isEditing) {
    taskLabel.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = taskLabel.innerText;
    editBtn.innerText = 'Save';
  }

  taskItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;

  taskList.removeChild(taskItem);
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

addButton.onclick = addTask;
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
  for (let i = 0; i < taskList.children.length; i++) {
    bindTaskEvents(taskList.children[i], checkboxEventHandler);
  }
};

bindEventsToTasks(incompleteTaskHolder, taskCompleted);
bindEventsToTasks(completedTasksHolder, taskIncomplete);
