"use strict";

let taskArray = [];

function Task(title, content){
  this.title = title;
  this.content = content;
  this.timeAdded = Date.now();
};

init();

function init(){
  document.querySelector("#addTask").addEventListener("click", toggleEntryFields);
  document.querySelector("#submit").addEventListener("click", handleSubmitClick);
  document.querySelector("#clearInput").addEventListener("click", clearInput);
  console.log(taskArray);
  console.log(localStorage.todoTaskArray);
  if(localStorage.getItem("todoTaskArray") != null){
    taskArray = JSON.parse(localStorage.getItem("todoTaskArray"));
  }
  console.log(taskArray);
  drawTaskList();
}

function toggleEntryFields(){
  if (document.querySelector("#addTask").innerHTML === "-"){
    document.querySelector("#addTask").innerHTML = "+";
  }
  else {
    document.querySelector("#addTask").innerHTML = "-";
  }
  document.querySelector("#taskEntry").classList.toggle("hidden");
}

function handleSubmitClick(){
  taskArray.push(new Task(
    document.querySelector("#titleField").value,
    document.querySelector("#taskField").value
  ));

  updateTaskStorage();
  clearInput();
  toggleEntryFields();
  drawTaskList();
}

function clearInput(){
  document.querySelector("#titleField").value = "";
  document.querySelector("#taskField").value = "";
}

function drawTaskList(){
  let buildEntry = "";
  
  for(let task of taskArray.reverse()){
    buildEntry += 
    `<div class="taskItem">
    <span class="taskTitle">
    ${task.title}
    </span>
    <br />
    ${task.content}
    <button onclick="removeEntry(${taskArray.indexOf(task)})">x</button>
    </div>`;
  }
  
  document.querySelector("#taskArray").innerHTML = buildEntry;
}

function removeEntry(entryNumber){
  taskArray.splice(entryNumber, 1);
  updateTaskStorage();
  drawTaskList();
}

function updateTaskStorage(){
  localStorage.setItem("todoTaskArray", JSON.stringify(taskArray));
}