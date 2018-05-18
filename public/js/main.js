$(document).ready(function(){
	$('.deleteNotice').on('click', deleteNotice);
});

function deleteNotice(){

	
		var confirmation = confirm('Are you sure to delete selected Notice ?');

	if(confirmation){
		$.ajax({
			type : 'DELETE',
			url : 'notices/delete/' + $(this).data('id')
		}).done(function(response){
			window.location.replace('/');
		});
			window.location.replace('/');
	}


		else{
			return false;
		}
	
}