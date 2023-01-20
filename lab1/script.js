let url = `https://api.nytimes.com/svc/news/v3/content/nyt/all.json?limit=200&api-key=f6UlyHuNBqB1956iWJNZvKlvV6a4jt7Y`;

$(document).ready(function() {
    getArticles();
    StartTransition();
});

async function getArticles(){
    const response = await fetch(url);
    var data = await response.json();
    let apiInfo = data.results;

    LoopArticles(apiInfo, "#News");
    //console.log(apiInfo[2].section);
}

var timer;
         
function StartTransition() {
    timer = setInterval(function() {
    console.log("5 seconds are up");
    getArticles();
    }, 10000);
}

function PauseTransition() {
    clearInterval(timer);
}
function LoopArticles(info, section){
    let random_number = Math.random() * 200;
    //console.log(random_number);
    let loop_article = Math.floor(random_number);
    var card = "";
    for(let cnt = 0; cnt < 5; loop_article++){
        var article = info[loop_article];
        if(article != null && article.multimedia != null && article.multimedia[0].url != null){
            //console.log(article.multimedia[0].url);
            let im = article.multimedia[2].url;
            if(cnt == 0){
                card += `<div class = "row">`;
            }
            if(cnt < 3){
                card += `
                <div class="col-md-4 mb-2">
                    <a href="${article.url}">
                    <div class="card">
                    <img src="${im}" class="card-img-top mb-3" alt="..." >
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.byline}</p>
                            <p class="card-text fs mb-2">${article.abstract}</p>
                        </div>
                    </div>
                    </a>
                </div>
            `;
            if(cnt == 3){card += `</div> <div class = "row">`;}}
            if(cnt > 2){
                card += `
                <div class="col-md-6 mb-2">
                    <a href="${article.url}">
                    <div class="card">
                    <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.byline}</p>
                            <p class="card-text fs mb-2">${article.abstract}</p>
                    </div>
                    <img src="${im}" class="card-img-top mb-3" alt="..." >
                    </div>
                    </a>
                </div>
            `;
            }
            cnt++;
        }
        
        console.log(cnt);
    }
    $(section).html(card);
}
