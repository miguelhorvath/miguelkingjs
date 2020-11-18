function editBurger(button){

    let url = (window.location).href;
    let id = url.substring(url.lastIndexOf('?') + 1);
    
    $.get('http://localhost:8888/api/users/' + id + '/edit', {
        'id': $(button).data("user-id"),
        'first_name': $(button).data("user-first_name"),
        'last_name': $(button).data("user-last_name")
    })
        .done(function(res){
            let user = JSON.parse(res);
            $('#first_name').val(user['first_name']);
            $('#last_name').val(user['last_name']);
        })
        .fail(function() {
            alert( "error" );
        });
}

function deleteBurger(button){
    
    let id = $(button).data("user-id");

    $.post('http://localhost:8888/api/users/' + id + '/delete', {
            'id': $(button).data("user-id")
        })
        .done(function(){
            window.location.reload();
        })
        .fail(function() {
            alert( "error" );
        });
}

function loadUsers(){
    $.get('http://localhost:8888/api/users', {

    })
    .done(function(res){
        let users = JSON.parse(res);
        let tbody = document.getElementsByTagName('tbody');
        let thName = document.getElementById('thName');
        let thValue = document.getElementById('thValue');
        let thOperations = document.getElementById('thOperations');

        $(thName).text('Keresztnév');
        $(thValue).text('Vezetéknév');
        $(thOperations).text('Műveletek');

        for(let i=0;i<users.length;i++){
            let tr = document.createElement('tr');
            let tdFirstName = document.createElement('td');
            let tdLastName = document.createElement('td');
            let tdOperations = document.createElement('td');
            let editButton = document.createElement('button');
            let deleteButton = document.createElement('button');

            $(tdFirstName).text(users[i].first_name);
            $(tdLastName).text(users[i].last_name);
            $(editButton).text('Edit');
            $(deleteButton).text('Delete');
            
            editButton.setAttribute("href", 'http://jsrest.test/users/views/users.edit.html?' + users[i].id);
            editButton.setAttribute("data-user-id", users[i].id);
            editButton.setAttribute("data-user-first_name", users[i].first_name);
            editButton.setAttribute("data-user-last_name", users[i].last_name);
            $( editButton ).click(function () {
                window.location='http://jsrest.test/users/views/users.edit.html?' + users[i].id;
            });

            deleteButton.setAttribute("data-user-id", users[i].id);
            $( deleteButton ).click(function () {
                deleteBurger(this);
            });

            $(tbody).append(tr);
            $(tr).append(tdFirstName);
            $(tr).append(tdLastName);
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

    let firstNameInput = $( '#first_name' );
    let lastNameInput = $( '#last_name' );
    let url = (window.location).href;
    let id = url.substring(url.lastIndexOf('?') + 1);

    $.post('http://localhost:8888/api/users/' + id + '/update', {
            'first_name': firstNameInput.val(),
            'last_name': lastNameInput.val()
       })
        .done(function() {            
            window.location="http://jsrest.test/users/views/users.index.html";
        })
        .fail(function(error) {
           console.log(error);
        });
});

$( "#sendBtn" ).click(function() {
    let firstNameInput = $( '#first_name' );
    let lastNameInput = $( '#last_name' );
    if(firstNameInput.val() === '' || lastNameInput.val() === ''){
       alert('One of the inputs is empty! d:@');
    } else {
       $.post('http://localhost:8888/api/users', {
            'first_name': firstNameInput.val(),
            'last_name': lastNameInput.val()
       })
        .done(function() {            
            window.location="http://jsrest.test/users/views/users.index.html";
        })
        .fail(function(error) {
           console.log(error);
        });
    }
 });

window.onload = function() {
    loadUsers();
};