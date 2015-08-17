console.log('linked');

$('#found').on('click' , function(){
	 swal({   title: "You found me!",   
	 	text: "If you are still in the building please turn in the item to the front desk. Please feel free to search the lost postings with keywords below!",   
	 	type: "input",   
	 	showCancelButton: true,   
	 	closeOnConfirm: false,   
	 	animation: "slide-from-top",   
	 	inputPlaceholder: "Write something" }
	 	, function(inputValue){   
	 		if (inputValue === false) return false;      
	 		if (inputValue === "") {     
	 			swal.showInputError("You need to write something!");     
	 			return false   }
	 		swal("Thanks!", "Let us search the posts with keywords : " + inputValue, "success"); });
});