document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("taskManager JS imported successfully!");
  },
  false
);

var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
  myInput.focus()
})