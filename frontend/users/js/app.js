function editUser(button){

    let url = (window.location).href;
    let id = url.substring(url.lastIndexOf('?') + 1);
    
    $.get('http://localhost:8888/api/users/' + id + '/edit', {
        'id': $(button).data("user-id"),
        'first_name': $(button).data("user-first_name"),
        'last_name': $(button).data("user-last_name")
    })
        .done(function(res){
            for(let i=0;i<res.length;i++){
                $('#first_name').val(res[0]['first_name']);
                $('#last_name').val(res[0]['last_name']);
            }
        })
        .fail(function() {
            alert( "error" );
        });
}


function deleteUser(button){
    
    let id = $(button).data("user-id");

    $.post('http://localhost:8888/api/users/' + id + '/delete', {
            'id': $(button).data("user-id"),
            'type': 'DELETE'
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
        let tbody = document.getElementsByTagName('tbody');
        let thName = document.getElementById('thName');
        let thValue = document.getElementById('thValue');
        let thOperations = document.getElementById('thOperations');

        $(thName).text('Keresztnév');
        $(thValue).text('Vezetéknév');
        $(thOperations).text('Műveletek');

        for(let i=0;i<res.length;i++){
            let tr = document.createElement('tr');
            let tdFirstName = document.createElement('td');
            let tdLastName = document.createElement('td');
            let tdOperations = document.createElement('td');
            let editButton = document.createElement('button');
            let deleteButton = document.createElement('button');

            $(tdFirstName).text(res[i].first_name);
            $(tdLastName).text(res[i].last_name);
            $(editButton).text('Edit');
            $(deleteButton).text('Delete');
            
            editButton.setAttribute("href", 'http://jsrest.dev/users/views/users.edit.html?' + res[i].id);
            editButton.setAttribute("data-user-id", res[i].id);
            editButton.setAttribute("data-user-first_name", res[i].first_name);
            editButton.setAttribute("data-user-last_name", res[i].last_name);
            $( editButton ).click(function () {
                window.location='http://jsrest.dev/users/views/users.edit.html?' + res[i].id;
            });

            deleteButton.setAttribute("data-user-id", res[i].id);
            $( deleteButton ).click(function () {
                deleteUser(this);
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
            'last_name': lastNameInput.val(),
            'type': 'PUT'
       })
        .done(function() {            
            window.location="http://jsrest.dev/users/views/users.index.html";
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
            window.location="http://jsrest.dev/users/views/users.index.html";
        })
        .fail(function(error) {
           console.log(error);
        });
    }
 });

window.onload = function() {
    loadUsers();
};