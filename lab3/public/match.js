
$(document).ready(function() {
    console.log("hello");
    // getMatch();
}); 

// function getMatch() {
//     var poke;
//     $.ajax({ 
//       type: 'GET',
//       url: '/node/match', 
//       dataType: 'json'
//       }).done(function(data){
//         poke = JSON.stringify(data)
//         console.log(poke[0]["homeTeam"]);
//       });
//   }

async function getArticles(){
    const response = await fetch(`https://songi2.eastus.cloudapp.azure.com/node/match`);
    var data = await response.json();
    console.log(data);
    console.log(data[0][0]);
}