setTheTable();



function setTheTable(){
  document.querySelector("#addTask").addEventListener("click", createEntryFields);
}

function createEntryFields(){
  document.querySelector("#taskEntry").classList.toggle("hidden");
}