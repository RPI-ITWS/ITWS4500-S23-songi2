
$(document).ready(function() {
    console.log("hello");
    getMatch();
}); 

function getMatch() {
    var poke;
    $.ajax({ 
      type: 'GET',
      url: '/node/match', 
      dataType: 'json'
      }).done(function(data){
        poke = JSON.stringify(data)
        console.log(poke[0]);
      });
  }