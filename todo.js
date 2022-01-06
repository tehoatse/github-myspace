"use strict";

let listOfTasks = [];

function Task(title, content){
  this.title = title;
  this.content = content;
  this.timeAdded = Date.now();
};

init();

function init(){
  document.querySelector("#addTask").addEventListener("click", toggleEntryFields);
  document.querySelector("#submit").addEventListener("click", handleSubmitClick);
  document.querySelector("#clearInput").addEventListener("click", clearEntryFields);
  if(localStorage.getItem("storedListOfTasks") != null){
    listOfTasks = JSON.parse(localStorage.getItem("storedListOfTasks"));
  }
  populateTaskList();
}

function toggleEntryFields(){
  let collapseButton = document.querySelector("#addTask");
  if (collapseButton.innerHTML === "-"){
    collapseButton.innerHTML = "+";
  }
  else {
    collapseButton.innerHTML = "-";
  }
  document.querySelector("#taskEntry").classList.toggle("hidden");
}

function handleSubmitClick(){
  listOfTasks.push(new Task(
    document.querySelector("#titleField").value,
    document.querySelector("#taskField").value
  ));

  updateTaskStorage();
  clearEntryFields();
  toggleEntryFields();
  populateTaskList();
}

function clearEntryFields(){
  document.querySelector("#titleField").value = "";
  document.querySelector("#taskField").value = "";
}

function populateTaskList(){
  let buildEntry = "";
  
  for(let task of listOfTasks.reverse()){
    buildEntry += 
    `<div class="taskItem">
    <span class="taskTitle">
    ${task.title}
    </span>
    <br />
    ${task.content}
    <button onclick="removeEntry(${listOfTasks.indexOf(task)})">x</button>
    </div>`;
  }
  
  document.querySelector("#taskList").innerHTML = buildEntry;
}

function removeEntry(entryNumber){
  listOfTasks.splice(entryNumber, 1);
  updateTaskStorage();
  populateTaskList();
}

function updateTaskStorage(){
  localStorage.setItem("storedListOfTasks", JSON.stringify(listOfTasks));
}