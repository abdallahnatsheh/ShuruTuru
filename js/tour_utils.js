let final=[]
$(document).ready(function () {
    query_guides();

//form validator
    $("form[name='user_form']").validate({
        // Specify validation rules
        rules: {
          "name":{
              minlength: 3
          },
          "id_field": {
            minlength: 6
          },
            digits:{
                required: true,
                digits: true,
            },
            to_date: {
                required: true,
                date: true,
            },
          "email":{
            "email":true
          }
        },
        // Specify validation error messages
        messages: {
            to_date:{
                required: "Date is required in format YYYY-MM-DD",
                date:"enter date only FORMAT YYYY-MM-DD "
            },
          name: "Your name must be at least 5 characters long",
          id_field:{
            digits:"Please enter only digits",
            minlength: "Your name must be at least 6 characters long"
          },
          email: "email structure is some@domain "
        }
      });

    // process the form
    $('#user_form').submit(function (event) {
        if(!$("#user_form").valid()) return;

        console.log("in submit");
        
        // process the form
        $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: '/create_tour', // the url where we want to POST
            contentType: 'application/json',
            data: JSON.stringify({
                    date: $("#tourdate").val(),
                    duration: $("#tduration").val(),
                    price: $("#tprice").val(),
                    guideId: $("#guardId").val()
            }),
            processData: false,            
            encode: true,
            success: function( data, textStatus, jQxhr ){
                alert("new tour added");
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
    function query_guides(){
        // process the form
        $.ajax({
            type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
            url: "/guides/", // the url where we want to POST
            success: function (data) {
                final=data
                console.log(final)
                printguide()

            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert("error get guide data")
                console.log(errorThrown);
            }

        })

    }
    function printguide(){
        var select = document.getElementById("guardId");
        if(final.length>0){
            for (let i=0;i< final.length ; i++){
                select.options[select.options.length] = new Option(final[i]["name"], final[i]["_id"]);
            }
        }else{
            select.options[select.options.length] = new Option("add guide", "");
        }
    }

});
