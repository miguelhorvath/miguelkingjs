function loadBurgers(){
    $.get('http://localhost:8888/api/burgers', {

    })
    .done(function(res){
        console.log('REPÜL A FASZBURGER!!!');
    })
    .fail(function(){
        alert("error");
    });
}

window.onload = function() {
    //loadBurgers();
};