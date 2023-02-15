let url = `https://api.nytimes.com/svc/news/v3/content/nyt/all.json?limit=200&api-key=f6UlyHuNBqB1956iWJNZvKlvV6a4jt7Y`;

$(document).ready(function() {
    console.log("hello");
    getMatch();
}); 

function getMatch() {
    var poke;
    $.ajax({
      type: 'GET',
      url: '/match', 
      dataType: 'json'
      }).done(function(data){
        poke = JSON.stringify(data)
      });
      console.log(poke);
  }