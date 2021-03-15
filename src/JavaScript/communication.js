//ToDo Senden von json von Client zu Server

function getLanguageJson(name){
    let json = "hallo";
    let url = "http://localhost:3000/data/" + name + ".json";
    console.log("test1");
    $.ajax({
        url: url,
        dataType: "json",
        success: function(result) {
            console.log(result);
            json = result;
        },
        complete: function(e, xhr, settings) {
            if (e.status === 304) {
                console.log("304");
            } else if (e.status === 403) {
                console.log("403");
            } else if (e.status === 404) {
                console.log("404");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
    console.log(json);
    return json;
}