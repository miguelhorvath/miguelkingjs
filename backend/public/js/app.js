function getAllBurgers(){
    $.get('http://localhost:8888/api/burgers', {

    })
        .done(function(res){
            console.log(res);
        })
        .fail(function(){
            alert("error");
        });
}

function deleteItem(button){

    $.post('//localhost:8888/server.php', {
            'id': $(button).data("burger-id-delete")
        })
        .done(function(res){
            window.location.reload();
        })
        .fail(function() {
            alert( "error" );
        });
}

function editItem(button){

    $.get('//localhost:8888/server.php', {
        'id': $(button).data("burger-id-edit"),
        'name': $(button).data("burger-name-edit")
    })
        .done(function(res){
            let burgerData = JSON.parse(res);
            $('#item').val(burgerData.name);
            $("#sendBtn").attr({
                "data-burger-id-update": burgerData.id
            })
            $("#sendBtn").text("Módosítás");
        })
        .fail(function() {
            alert( "error" );
        });


}

function loadList() {
   let $ul = $('#szenyolista');
   $.get('//localhost:8888/server.php')
        .done(function(res) {
            $("#szenyolista li").remove();
            let burgersData = JSON.parse(res);
            let burgers = burgersData['burgers'];
            for(let i=0;i<burgers.length;i++) {

                let li = document.createElement('li');
                let a = document.createElement('a');

                $( li ).addClass("list-group-item");

                let span = document.createElement('span');

                $(li).append(span);
                $( a ).text(burgers[i].name);
                $(li).append(a);

                //Delete gomb
                let deleteGomb = document.createElement('button');
                $( deleteGomb ).click(function () {
                    deleteItem(this);
                });
                $( deleteGomb ).addClass("btn btn-danger btn-check");
                $( li ).append(deleteGomb);
                deleteGomb.setAttribute("data-burger-id-delete", burgers[i].id);
                deleteGomb.setAttribute("data-burger-name-delete", burgers[i].name)
                $( deleteGomb ).text('Delete');

                //Edit gomb
                let editGomb = document.createElement('button');
                $( editGomb ).click(function () {
                    editItem(this);
                });
                $( editGomb ).addClass("btn btn-warning");
                $( li ).append(editGomb);
                editGomb.setAttribute("data-burger-id-edit", burgers[i].id);
                editGomb.setAttribute("data-burger-name-edit", burgers[i].name)
                $( editGomb ).text('Edit');

                $ul.append(li);
            }
        })
        .fail(function() {
            alert( "error" );
        });
}

function szendvicsKereso() {

    let input = document.getElementById('search');
    let filter = input.value.toUpperCase();
    let ul = document.getElementById("szenyolista");
    let li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        let szoveg = a.textContent || a.innerText;
        if (szoveg.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


$( "#sendBtn" ).click(function() {
   let $item = $('#item');
   if($item.val() === ''){
      alert('MIÉRT NEM ADTÁL MEG SEMMIT TE DEGENERÁLT SEGGARC, NEM CSODA HOGY KIKAPSZ MINDIG AZ ATITÓL MORTALBAN MERT HÜLYE VAGY MINT A FASZ!!!!!!4!!!!négy!!! >:@');
   } else {
      $.post('//localhost:8888/server.php', {
         'burger': $item.val(),
          'id':$("#sendBtn").data("burger-id-update"),
          '_method': 'PUT'
      })
       .done(function(res) {
           window.location.reload();
          let burgersData = JSON.parse(res);

          let burgers = burgersData.burgers;

          burgers.forEach(function (element) {
               $('#szenyolista').append(element);
          });

       })
       .fail(function() {
          alert( "error" );
       });
   }
});

window.onload = function() {
  
    getAllBurgers();
};