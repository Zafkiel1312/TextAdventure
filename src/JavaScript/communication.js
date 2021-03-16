//ToDo Senden von json von Client zu Server

async function getLanguageJson(name){
    let json = "hallo";
    let url = "http://localhost:3000/data/" + name + ".json";
    await $.ajax({
        url: url,
        dataType: "json",
        success: function(result) {
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
    return json;
}

async function getAllLanguages() {
    let languages;
    let url = "http://localhost:3000/data/languages.txt";
    await $.ajax({
        url: url,
        dataType: "text",
        success: function(result) {
            languages = result.split(';;');
            console.log(languages);
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
}