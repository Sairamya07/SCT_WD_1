const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDateTime = document.getElementById("taskDateTime");
const taskList = document.getElementById("taskList");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const taskText = taskInput.value.trim();
  const taskTime = taskDateTime.value;

  if (taskText && taskTime) {
    addTask(taskText, taskTime);
    taskInput.value = "";
    taskDateTime.value = "";
  }
});

function addTask(text, time) {
  const li = document.createElement("li");

  const taskContent = document.createElement("div");
  taskContent.innerHTML = `<strong>${text}</strong><br><small>${new Date(time).toLocaleString()}</small>`;
  li.appendChild(taskContent);

  const btnGroup = document.createElement("div");
  btnGroup.className = "task-buttons";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.className = "complete";
  completeBtn.onclick = () => {
    taskContent.classList.toggle("completed");
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.className = "edit";
  editBtn.onclick = () => editTask(taskContent, text, time);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete";
  deleteBtn.onclick = () => li.remove();

  btnGroup.appendChild(completeBtn);
  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(deleteBtn);

  li.appendChild(btnGroup);
  taskList.appendChild(li);
}

function editTask(taskContent, oldText, oldTime) {
  const newText = prompt("Edit task:", oldText);
  const newTime = prompt("Edit date and time (YYYY-MM-DDTHH:MM):", oldTime);

  if (newText && newTime) {
    taskContent.innerHTML = `<strong>${newText}</strong><br><small>${new Date(newTime).toLocaleString()}</small>`;
  }
}
