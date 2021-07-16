$(document).ready(function () {
//form validator
    $("form[name='user_form']").validate({
        // Specify validation rules
        rules: {
          "name":{
              minlength: 3,
              required: true
          },
            digits:{
                required: true,
                digits: true,
            },
          "email":{
              required: true,
              "email":true
          }
        },
        // Specify validation error messages
        messages: {
          name: "Your name must be at least 5 characters long",
          email: "email structure is some@domain ",
            cellular:"numbers only"
        }
      });

    // process the form
    $('#user_form').submit(function (event) {
        if(!$("#user_form").valid()) return;

        console.log("in submit");
        
        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/create_guide', // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
                    name: $("#gname").val(),
                    email: $("#email").val(),
                    cellular: $("#gcell").val(),

            }),
            processData: false,            
            encode: true,
            success: function( data, textStatus, jQxhr ){
                alert("new guide added");
                console.log(data);
                location.href = "/list";

            },
            error: function( e ){
                console.log(e["responseJSON"]["message"]);
                alert(e["responseJSON"]["message"]);
            }
        })
          
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});
