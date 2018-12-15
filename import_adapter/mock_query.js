function getMockData(){
    $.ajax({
        url: "import_adapter/mock_data.json",
        method: "get",
        dataType: "json"
    })
        .done(function(result){
            return result;
        });
}