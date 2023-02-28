const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
if (searchButton) {searchButton.addEventListener('click', () => {
  const inputValue = searchInput.value;
  search(inputValue);
});
}



function search(loc){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            var jsonObj = JSON.parse(this.responseText);
           console.log(jsonObj);
            document.getElementById("school").innerHTML = jsonObj[0].name;
            document.getElementById("country").innerHTML = jsonObj[0].country;

        }
    }
    xhttp.open("GET", "https://smolae.eastus.cloudapp.azure.com/node/api");
    xhttp.send();
}