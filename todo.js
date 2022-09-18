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
  let buildEntries = "";
  
  for(let task of listOfTasks){
    buildEntries += 
    `<div onmouseover="showTaskButtons(this)" onmouseleave="hideTaskButtons(this)" class="taskItem inheritWidth">
    <div class="taskTitle inheritWidth">
    ${task.title}
    </div>
    <div class="taskContent inheritWidth">
    ${task.content}
    </div>
    <div id="taskButtons" class="invisible">
      <button onclick="editEntry(${listOfTasks.indexOf(task)})">edit</button>
      <button onclick="removeEntry(${listOfTasks.indexOf(task)})">done</button>
    </div>
    </div>
    <hr>
    `;
  }
  
  document.querySelector("#taskList").innerHTML = buildEntries;
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

function showTaskButtons(taskPanel){
  taskPanel.querySelector("#taskButtons").classList.remove("invisible");
  console.log(taskPanel.querySelector("button").classList);
}

function hideTaskButtons(taskPanel){
  taskPanel.querySelector("#taskButtons").classList.add("invisible");
  console.log(taskPanel.querySelector("button").classList);
} 