function editBurger(button){

    let url = (window.location).href;
    let id = url.substring(url.lastIndexOf('?') + 1);
    
    $.get('http://localhost:8888/api/burgers/' + id + '/edit', {
        'id': $(button).data("burger-id"),
        'name': $(button).data("burger-name"),
        'value': $(button).data("burger-value")
    })
        .done(function(res){
            let burger = JSON.parse(res);
            $('#name').val(burger['name']);
            $('#value').val(burger['value']);
        })
        .fail(function() {
            alert( "error" );
        });

}

function deleteBurger(button){
    
    let id = $(button).data("burger-id");

    $.post('http://localhost:8888/api/burgers/' + id + '/delete', {
            'id': $(button).data("burger-id")
        })
        .done(function(){
            window.location.reload();
        })
        .fail(function() {
            alert( "error" );
        });
}

function loadBurgers(){
    $.get('http://localhost:8888/api/burgers', {

    })
    .done(function(res){
        let burgers = JSON.parse(res);
        let tbody = document.getElementsByTagName('tbody');
        let thName = document.getElementById('thName');
        let thValue = document.getElementById('thValue');
        let thOperations = document.getElementById('thOperations');

        $(thName).text('Szendvics Név');
        $(thValue).text('Ár');
        $(thOperations).text('Műveletek');

        for(let i=0;i<burgers.length;i++){
            let tr = document.createElement('tr');
            let tdName = document.createElement('td');
            let tdValue = document.createElement('td');
            let tdOperations = document.createElement('td');
            let editButton = document.createElement('button');
            let deleteButton = document.createElement('button');

            $(tdName).text(burgers[i].name);
            $(tdValue).text(burgers[i].value);
            $(editButton).text('Edit');
            $(deleteButton).text('Delete');
            
            editButton.setAttribute("href", 'http://jsrest.test/burgers/views/burgers.edit.html?' + burgers[i].id);
            editButton.setAttribute("data-burger-id", burgers[i].id);
            editButton.setAttribute("data-burger-name", burgers[i].name);
            editButton.setAttribute("data-burger-value", burgers[i].value);
            $( editButton ).click(function () {
                window.location='http://jsrest.test/burgers/views/burgers.edit.html?' + burgers[i].id;
            });

            deleteButton.setAttribute("data-burger-id", burgers[i].id);
            $( deleteButton ).click(function () {
                deleteBurger(this);
            });

            $(tbody).append(tr);
            $(tr).append(tdName);
            $(tr).append(tdValue);
            $(tr).append(tdOperations);
            $(tdOperations).append(editButton);
            $(tdOperations).append(deleteButton);

            $(editButton).addClass("btn btn-warning");
            $(deleteButton).addClass("btn btn-danger");
        }
    })
    .fail(function(){
        alert("error");
    });
}

$('#confirmBtn').click(function (){

    let nameInput = $( '#name' );
    let valueInput = $( '#value' );
    let url = (window.location).href;
    let id = url.substring(url.lastIndexOf('?') + 1);

    $.post('http://localhost:8888/api/burgers/' + id + '/update', {
            'name': nameInput.val(),
            'value': valueInput.val()
       })
        .done(function() {            
            window.location="http://jsrest.test/burgers/views/burgers.index.html";
        })
        .fail(function(error) {
           console.log(error);
        });
});

$( "#sendBtn" ).click(function() {
    let nameInput = $( '#name' );
    let valueInput = $( '#value' );
    if(nameInput.val() === '' || valueInput.val() === ''){
       alert('One of the inputs is empty! d:@');
    } else {
       $.post('http://localhost:8888/api/burgers', {
            'name': nameInput.val(),
            'value': valueInput.val()
       })
        .done(function() {            
            window.location="http://jsrest.test/burgers/views/burgers.index.html";
        })
        .fail(function(error) {
           console.log(error);
        });
    }
 });

window.onload = function() {
    loadBurgers();
};