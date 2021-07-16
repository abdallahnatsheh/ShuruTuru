let maindata = [] //all json data here
let sitesdata=[] //all site data
let guidedata = [] //all guides data

$(document).ready(function () {
    var mytable = $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');

    $(document).ready(function () {
            $.ajax({
                url: "/users",
                success: function (result) {
                    $('#dtBasicExample tbody').on( 'click', 'button', function () {
                        var data = mytable.row( $(this).parents('tr') ).data();
                        printTour(data[0]);
                    } );
                    maindata = Object.entries(result);
                        for (i = 0; i < maindata.length; i++) {
                            document.getElementById("tableContents");
                            mytable.row.add([
                                maindata[i][1]["_id"],
                                maindata[i][1]["date"],
                                maindata[i][1]["duration"],
                                maindata[i][1]["price"],
                                "<button class=\"btn btn-outline-primary\" type='button'>Click me for Details!</button>"
                            ]).draw(false);
                        }

                },
                error: function (err) {
                    console.log("err", err);
                }
            });

    });

        $("#addit").click(function () {
            location.href = "/create_tour";
        });
        $("#updateit").click(function () {
            location.href = "/update_tour";
        });

        $("#addsite").click(function () {
            location.href = "/create_site";
        });
    $("#addguide").click(function () {
        location.href = "/create_guide";
    });

        $("#deleteit").click(function () {
            const str1 = '/users/';
            const str2 = $('#inputID').val();
            // process the form
            $.ajax({
                type: 'DELETE',
                url: str1.concat('', str2),
                contentType: 'application/json',
                data: JSON.stringify({
                    id: $("#inputID").val()
                }),
                processData: false,
                encode: true,
                success: function( data, textStatus, jQxhr ){
                    alert("tour deleted");
                    location.href = "/list";

                },
                error: function( jqXhr, textStatus, errorThrown ){
                    alert("id not existed")
                    console.log( errorThrown );
                }
            })

            });

    //print tour using id
       function printTour (tourid) {
           query_sites(tourid);
           query_guides()
           const str1 = '/users/';
           const str2 = tourid;
           // process the form
           $.ajax({
               type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
               url: str1.concat('', str2), // the url where we want to POST
               contentType: 'application/json',
               data: JSON.stringify({
                   "id": tourid
               }),
               processData: false,
               // dataType: 'json', // what type of data do we expect back from the server
               encode: true,
               success: function (data) {
                   showDetail(data[0]["_id"],data[0]["guideId"])
               },
               error: function (jqXhr, textStatus, errorThrown) {
                   alert("id not existed")
                   console.log(errorThrown);
               }
           })
       }


        $("#deletepath").click(function () {
            const str1 = '/delete_site/';
            const str2 = $('#inputID').val();
            let str3 = $('#inputpname').val();
            if (!str3)
                str3 = "ALL";
            // process the form
            $.ajax({
                type: 'DELETE', // define the type of HTTP verb we want to use (POST for our form)
                url: str1.concat('', str2,'/',str3), // the url where we want to POST
                contentType: 'application/json',
                data: JSON.stringify({
                    tourid: $("#inputID").val(),
                    name:$('#inputpname').val()
                }),
                processData: false,
                // dataType: 'json', // what type of data do we expect back from the server
                encode: true,
                success: function( data, textStatus, jQxhr ){
                    alert("path deleted");
                    location.href = "/list";

                },
                error: function( jqXhr, textStatus, errorThrown ){
                    alert("id or path not existed")
                    console.log( errorThrown );
                }
            })

        });
});
function query_sites(id){
    const str1 = '/read_site/';
    const str2 = id;
    // process the form
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url: str1.concat('', str2), // the url where we want to POST
        contentType: 'application/json',
        data: JSON.stringify({
            "id": id
        }),
        processData: false,
        // dataType: 'json', // what type of data do we expect back from the server
        encode: true,
        success: function (data) {
            sitesdata = data
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert("id not existed")
            console.log(errorThrown);
        }
    })

}
function query_guides(){
    // process the form
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url: "/guides/", // the url where we want to POST
        success: function (data) {
            guidedata = data
        },
        error: function (jqXhr, textStatus, errorThrown) {
            alert("error get guide data")
            console.log(errorThrown);
        }
    })

}

function showDetail(id,guideId) {
    let final = "";
    let guideDetail = "";
    let pathDetails = "";
    let index = guidedata.findIndex(x => x["_id"] ===guideId);
    if (index>-1){
    guideDetail += "<b>Guide:</b></br>"+"Name: "+guidedata[index]["name"]
    +"</br>Email: "+guidedata[index]["email"]+"</br>Cellular: "+guidedata[index]["cellular"];}
    else{
        guideDetail += "<b>Guide:</b></br>"+"no guide here in this trip update it "
    }

    pathDetails+="</br><b>Paths:</b></br>"
    if(sitesdata.length>0){
    for (let i=0;i< sitesdata.length ; i++){
        pathDetails+= "Name: "+ sitesdata[i]["name"]+"</br>Country: "+sitesdata[i]["country"]+"</br>"
        }
    }else{
        pathDetails+="No Paths for this trip add please"
    }


    final += guideDetail + pathDetails;
    document.getElementById("details").innerHTML = String(final);
    $(document).ready(function () {
        $('#exampleModalLong').modal("handleUpdate");
        $("#exampleModalLong").modal("show");
});
}
