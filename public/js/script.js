document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("taskManager JS imported successfully!");
  },
  false
);

// var myModal = document.getElementById('myModal')
// var myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })

<script type="text/javascript">
   $(document).on("click", ".open-modal", function () {
	 var x = new Date(); 
     var myHeading = "<p>I Am Added Dynamically </p>";
     $("#modal-body").html(myHeading + x);     
     $('#modal').modal('show');
    });

</script>