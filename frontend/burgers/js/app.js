function loadBurgers(){
    $.get('//localhost:8888/api/burgers', {

    })
    .done(function(res){
        
    })
    .fail(function(){
        alert("error");
    });
}

window.onload = function() {
    loadBurgers();
};