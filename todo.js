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
  listOfTasks.unshift(new Task(
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
  
  for(let task of listOfTasks){
    buildEntry += 
    `<div class="taskItem inheritWidth">
    <div class="taskTitle inheritWidth">
    ${task.title}
    </div>
    <div class="taskContent inheritWidth">
    ${task.content}
    </div>
    <button onclick="editEntry(${listOfTasks.indexOf(task)})">edit</button>
    <button onclick="removeEntry(${listOfTasks.indexOf(task)})">delete</button>
    </div>
    <hr>
    `;
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

function editEntry(entryNumber){
  document.querySelector("#titleField").value = listOfTasks[entryNumber].title;
  document.querySelector("#taskField").value = listOfTasks[entryNumber].content;
  listOfTasks.splice(entryNumber, 1);
  updateTaskStorage();
  populateTaskList();
  if(document.querySelector("#addTask").innerHTML === "+"){
    toggleEntryFields();
  }
}