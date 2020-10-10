//search
$(document).ready(function() {
	$('#search').keyup(function(){
		var data = $(this).val();
		$.ajax({
			async: false,
            type: 'POST',
            url: '/search',
            dataType: 'html',
            data : {keyword:data},
            cache: false,
            success: function(data,status,xhr) {
                $('#content-table').replaceWith(data);
            },
            error: function(jqXhr, textStatus, errorMessage) {
               console.log('Error: ' + errorMessage);
            },
		});
	})
})