
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

async function getArticles(){
    const response = await fetch(`node/match`);
    var data = await response.json();
    var display = "";
    for (let i = 0; i < 4; i++){
        var keys = Object.keys(data[0])[i];
        console.log(keys);
        display += `<div class="accordion-item container py-5 my-5 opacity-75 rounded-2" data-aos="zoom-in" style="background-color: #e2725b;">
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
            display += `<div class="accordion-body py-5 mx-5" >
            <div class="row text-center rounded-2" style="background-color: #E1E6E1;">
                <div class="col py-5 text-center">
                    <h2>Home Team</h2>
                    <img src="${homeLogo}">
                    <h4>${homeTeam}</h4>
                </div>
                <div class="col py-5 text-center">
                    <h2>Away Team</h2>
                    <img src="${awayLogo}">
                    <h4>${awayTeam}</h4>
                </div>
                <h4>${homeTeamScore} - ${awayTeamScore}</h4>
                <h5>FT</h5>
            </div>
        </div>`;
            // console.log(homeLogo);
            // console.log(homeTeam);
            // console.log(awayLogo);
            // console.log(awayTeam);
            // console.log(homeTeamScore);
            // console.log(awayTeamScore);
            }
        display += `<button class="accordion-button collapsed text-center" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapse${i}">
        <h5>Collapse</h5>
    </button></div>
        </div>
      </div>`;
    }   
    $(database).html(display);
}