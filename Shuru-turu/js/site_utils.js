$(document).ready(function () {

    $("form[name='user_form']").validate({
        // Specify validation rules
        rules: {
          "name":{
              required: true,
              minlength: 3
          },
          "id_field": {
            required: true,
            minlength: 6
          }
        },
        // Specify validation error messages
        messages: {
          name: "Your name must be at least 3 characters long",
          id_field:{
            minlength: "Your name must be at least 6 characters long"
          }
        }
      });

    // process the form
    $('#user_form').submit(function (event) {
        if(!$("#user_form").valid()) return;
        console.log("in submit");
        const str1 = '/create_site/';
        const str2 = $('#tid').val();

        console.log("in submit");
        
        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: str1.concat('', str2), // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
                        tourid: $("#tid").val(),
                        name: $("#gname").val(),
                        country: $("#cname").val()
            }),
            processData: false,            
            encode: true,
            success: function( data, textStatus, jQxhr ){
                alert("new path added");
                console.log(data);
                location.href = "/list";

            },
            error: function( jqXhr, textStatus, errorThrown ){
                alert("new path  existed or invalid tourID");
                console.log( errorThrown );
            }
        })
          
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
