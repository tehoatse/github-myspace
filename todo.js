setTheTable();



function setTheTable(){
  document.querySelector("#addTask").addEventListener("click", createEntryFields);
}

function createEntryFields(){

  if (document.querySelector("#addTask").innerHTML === "-"){
    document.querySelector("#addTask").innerHTML = "+";
  }
  else {
    document.querySelector("#addTask").innerHTML = "-";
  }
  document.querySelector("#taskEntry").classList.toggle("hidden");
}