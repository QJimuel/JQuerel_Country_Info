let countriesBox = document.getElementById('countriesBox');
    
async function getCountiesPopulation(){
    try{
        const response = await fetch("https://restcountries.com/v2/all")
        const countriesData = await response.json()
            
        return countriesData
    }catch (error){
        console.error(error)
    }
}

async function displayCountriesInfo(){
    const countries = await getCountiesPopulation()
    console.log(countries)  

    try{
        for(let country of countries){
            const row = document.createElement('div')
            row.classList.add('country1')
            

            const counInnerHTML = `
            <div class="img-container">
                <img src="${country.flag} " />   
            </div>

            <div class="country">
        
                <h4>${country.name}</h4>
                <h5 class = "region">Region: &nbsp${country.region}</h5>
                <h5>Sub Region: &nbsp${country.subregion}</h5>
                <h5>Capital: &nbsp${country.capital}</h5>
                <h5>Language: &nbsp${country.languages.map(language => language.name).join(', ')}</h5>
                <h5>Population: &nbsp${country.population}</h5>
                <h5>Time Zone: &nbsp${country.timezones[0]}</h5>
                <h5>Calling Code: &nbsp${'+'+country.callingCodes}</h5>
            
            </div> 
            `;

            /*const nameCell = document.createElement('div')
            nameCell.textContent = country.name
            row.appendChild(nameCell)

            const flagCell = document.createElement('div')
            const flagImg = document.createElement('img')
            flagImg.src = country.flag
            flagCell.appendChild(flagImg)
            row.appendChild(flagCell)
        */

            row.innerHTML= counInnerHTML

            

            countriesBox.appendChild(row)
        }  
    } catch (error){
        console.error(error)
    }


}

function searchCountry(){
    const inputCountry = document.getElementById("search").value;
    
    

    if(inputCountry == ''){
        location.reload();
    }else {

    var containers = document.querySelectorAll(".country1");
    

    containers.forEach(function(container) {
        var items = container.querySelectorAll("h4");
        items.forEach(function(item) {
       
          if (!item.textContent.toLowerCase().includes(inputCountry.toLowerCase())) {
            container.style.display = "none";

          }else{
            container.style.display = "block";
          }
        });
      });
    }

}

function searchRegion(region){
    if (region == 'All') {
     
        location.reload();
    } else {
       
        var containers = document.querySelectorAll(".country1");

        for (let i = 0; i < containers.length; i++) {
            const item = containers[i];

            // Check if the item's content matches the specified condition
            if (item.textContent.includes(region)) {
              // If the condition is met, display the item
              item.style.display = 'block';
            
            } else {
              // If the condition is not met, hide the item
              item.style.display = 'none';
            }
          }

    }
}

displayCountriesInfo()