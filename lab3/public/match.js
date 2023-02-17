
$(document).ready(function() {
    console.log("hello");
    getArticles();
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

// async function getArticles(){
//     const response = await fetch(`https://songi2.eastus.cloudapp.azure.com/node/match`);
//     var data = await response.json();
//     console.log(data);
//     console.log(data["match"][0]);
// }
async function getArticles(){
    const response = await fetch(`data2.json`);
    var data = await response.json();
    var display = "";
    for (let i = 0; i < 4; i++){
        var keys = Object.keys(data[0])[i];
        console.log(keys);
        display += `<div class="accordion-item  container py-5 my-5 opacity-75 rounded-2" style="background-color: #28aa83;">
        <h2 class="accordion-header " id="flush-heading${i}">
            <button class="accordion-button collapsed text-center" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
                <h1>${keys}</h1>
            </button>
        </h2>
          <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#accordionFlushExample">`
        for(let j = 0; j < 10; j++){
            const homeLogo = data[0][keys][j]["homeLogo"];
            const homeTeam = data[0][keys][j]["homeTeam"];
            const awayLogo = data[0][keys][j]["awayLogo"];
            const awayTeam = data[0][keys][j]["awayTeam"];
            const homeTeamScore = data[0][keys][j]["homeTeamScore"];
            const awayTeamScore = data[0][keys][j]["awayTeamScore"];
            display += `<div class="accordion-body py-5" >
            <div class="row text-center" style="background-color: #79d2b8;">
                <div class="col text-center">
                    <h5>Home Team</h5>
                    <img src="${homeLogo}">
                    <h5>${homeTeam}</h5>
                </div>
                <div class="col text-center">
                    <h5>Away Team</h5>
                    <img src="${awayLogo}">
                    <h5>${awayTeam}</h5>
                </div>
                <h1>${homeTeamScore} - ${awayTeamScore}</h1>
                <h2>FT</h2>
            </div>
        </div>`;
            // console.log(homeLogo);
            // console.log(homeTeam);
            // console.log(awayLogo);
            // console.log(awayTeam);
            // console.log(homeTeamScore);
            // console.log(awayTeamScore);
            }
        display += `</div>
        </div>
      </div>`;
    }
    $(database).html(display);
}