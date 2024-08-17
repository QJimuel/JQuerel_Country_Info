<!-- src/components/CountryInfo.vue -->

<template>
  <body>


  <div class>
    <header>

        <h1 class="brand">JQUEREL <h1 class="brandpig">Country Info</h1></h1>

    </header>

    <br>
    <br>
    <br>

    <div class="all">
      <div class="label1">
        <label class="countryLabel">Country</label>
      </div>

      <div class="searchBox">
        <table class="searchElement">
          <tr>
            <td>
              <input type="text" placeholder="Search Country" class="search" v-model="searchQuery" />
            </td>
            <td>
              <a href="#" @click="searchCountry"><i class="fa fa-search" id="se"></i></a>
            </td>
          </tr>
        </table>
      </div>

      <div class="label2">
        <label class="regionLabel">Region</label>
      </div>

      <div class="filter">
        <select v-model="selectedRegion" @change="searchRegion">
          <option value="All">All Region</option>
          <option value="Asia">Asia</option>
          <option value="Americas">Americas</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
          <option value="Antarctic">Antarctica</option>
          <option value="Oceania">Australia(Oceania)</option>
        </select>
      </div>
    </div>

    <div id="countriesBox" class="countries-box">
      <div v-for="country in filteredCountries" :key="country.name" class="country1">
        <div class="img-container">
          <img :src="country.flag" alt="Country Flag" />
        </div>
        <div class="country">
          <h4>{{ country.name }}</h4>
          <h5 class="region">Region: {{ country.region }}</h5>
          <h5>Sub Region: {{ country.subregion }}</h5>
          <h5>Capital: {{ country.capital }}</h5>
          <h5>Language: {{ country.languages.map(language => language.name).join(', ') }}</h5>
          <h5>Population: {{ country.population }}</h5>
          <h5>Time Zone: {{ country.timezones[0] }}</h5>
          <h5>Calling Code: {{ '+' + country.callingCodes }}</h5>
        </div>
      </div>
    </div>
  </div>
</body>
</template>

<script>
export default {
  data() {
    return {
      countries: [],
      searchQuery: '',
      selectedRegion: 'All',
      regions: [],
    };
  },
  async mounted() {
    await this.displayCountriesInfo();
  },
  methods: {
    async getCountiesPopulation() {
      try {
        const response = await fetch('https://restcountries.com/v2/all');
        this.countries = await response.json();
        this.regions = Array.from(new Set(this.countries.map(country => country.region)));
        return this.countries;
      } catch (error) {
        console.error(error);
      }
    },
    async displayCountriesInfo() {
      await this.getCountiesPopulation();
    },
    searchCountry() {
      var containers = document.querySelectorAll('.country1');
      containers.forEach(container => {
        var items = container.querySelectorAll('h4');
        items.forEach(item => {
          if (!item.textContent.toLowerCase().includes(this.searchQuery.toLowerCase())) {
            container.style.display = 'none';
          } else {
            container.style.display = 'block';
          }
        });
      });
    },
    searchRegion() {
      var containers = document.querySelectorAll('.country1');
      containers.forEach(container => {
        if (this.selectedRegion === 'All' || container.textContent.includes(this.selectedRegion)) {
          container.style.display = 'block';
        } else {
          container.style.display = 'none';
        }
      });
    },
  },
  computed: {
    filteredCountries() {
      return this.countries.filter(
        country =>
          country.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.selectedRegion === 'All' || country.region === this.selectedRegion)
      );
    },
  },
};
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;


    text-decoration: none;
    list-style: none;

}

body{

    justify-content: center;

    overflow-x: hidden;
    padding-top: 200px;
    height: 100vh;
    background-color: white ;
    background: linear-gradient(90deg, transparent 1px, #ccc 1px, #ccc 2px, transparent 2px),
                linear-gradient(0deg, transparent 1px, #ccc 1px, #ccc 2px, transparent 2px);

    background-size: 20px 20px, 20px 20px;

}

header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem 8%;
    display: block;
    z-index: 100;
    background: linear-gradient(90deg, transparent 1px, #ccc 1px, #ccc 2px, transparent 2px),
                linear-gradient(0deg, transparent 1px, #ccc 1px, #ccc 2px, transparent 2px),white;
    background-size: 20px 20px, 20px 20px;

}

header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    z-index: -1;
}

.brand{
    color: black;
    -webkit-text-stroke: 0.04rem black;
    font-size: 4rem;
    transition: all 0.3s ease 0s;
    font-family: 'black ops one', sans-serif;

}

.brand:hover{
    color: #ffd700;

}

.brandpig{
    color: black;
    -webkit-text-stroke: 0.04rem black;
    font-size: 3.5rem;
    transition: all 0.3s ease 0s;
    margin-bottom: 2%;
    text-transform: uppercase;
    font-family: 'black ops one', sans-serif;

}

.brandpig:hover{
    color: #ffd700;



}

.all{
    display: inline-block;
    position: relative;
    top: 10%;
    left: 10%;


}

.searchBox{

    width: 300px;
    height: 42px;
    border: solid 1px black;
    padding: 0px 10px;
    border-radius: 10px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

}





.searchElement{
    width: 100%;
    height: 100%;
    vertical-align: middle;
}

.search{
    border: none;
    height: 100%;
    width: 100%;
    padding: 0px 5px;
    border-radius: 20px;
    font-size: 18px;
    font-family: 'Courier New', Courier, monospace;
    color: #424242;

}

.search:focus{
    outline: none;
}

.search a{

    color: black;

}

select{
    border: 1px solid black;
    border-radius: 10px;
    height: 100%;
    width: 200px;
    padding: 0px 10px;
    font-size: 18px;
    font-family: 'Courier New', Courier, monospace;
    color: #424242;
}



#se{
    color: black;
}

.label2{
    padding-top: 5%;

}

.regionLabel{

    margin: auto;

    font-size: 18px;
    font-family: 'black ops one';
    color: black;
    display: flex;
    justify-content: center;

}

.filter{
    margin: auto;

    width: 100px;
    height: 42px;

    padding: 0px 10px;
    border-radius: 50px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

}


.countryLabel{

    margin: auto;

    font-size: 18px;
    font-family: 'black ops one';
    color: black;
    display: flex;
    justify-content: center;

}





.countries-box {
	display: grid;
    /*grid-template-columns: 25% 25% 25% 25%;*/
	grid-template-columns: repeat(4, 1fr);
    row-gap: 10px;

	/*display: flex;
	flex-wrap: wrap;*/
	align-items: space-between;
	column-gap: 15px;
	justify-content:center;
	margin: 0 auto;
	max-width: 1200px;
	padding-bottom: 100px;
    padding-top: 5%;


}

.country1 {
	/*background-color: #eee;*/
	background-color:white; /*#AEE2FF;*/
	border-radius: 20px;
    border: solid 1px black;

	margin: 10px;
	padding: 10px 40px;
	text-align: center;
	display: block;
  	margin-left: auto;
  	margin-right: auto;
      transition: all 0.3s ease 0s;



}



.country1 h4{
    text-align: center;
    padding-top: 10px;
    padding-bottom: 20px;
    font-size: 1.7rem;
    color: white;
    -webkit-text-stroke: 0.04rem black;
    font-family: 'lilita one';
    text-transform: uppercase;
    font-weight: 900;

    transition: all 0.3s ease 0s;


}

.country1 h4:hover{
    color: #ffd700;
}

.country1 .img-container {
	/*background-color: rgba(255, 255, 255, 0.6);*/

	width: 200px;
	height:180px;
	/*text-align: center;*/
	/*display: block;*/
  	margin-left: auto;
  	margin-right: auto;
    margin-top: 20px;

}

.country1 .img-container img {
    border: solid 1px black;
    object-fit: cover;
	margin-top: 15%;
	max-width: 90%;
	width: 100%;
	height: 100px;
 	margin-left: auto;
  	margin-right: auto;
}


.country1 h5{
  text-align: start;
  font-family: 'Times New Roman', Times, serif;

  font-size: .9rem;
  letter-spacing: 0px;


}


th,td{

    padding: 5px;
}

@media screen and (max-width: 650px) {
    /* Your CSS rules for cellphones go here */
    header{
        padding-left:5%;
        padding-bottom:1%;
        

    }
   

    .brand{
        font-size: 2.5rem;
       
    }

    .brandpig{
        font-size: 2rem;
        line-height: 10px;
    }

    .countries-box{
       
        grid-template-columns: 100%;
        

      }
    .all{
        left: 19%;
    }
  }

@media screen and (min-width: 651px) and (max-width: 768px) {
    /* Your CSS rules for cellphones go here */
    header{
        padding: 1rem 5%;

    }


    .brand{
        font-size: 3rem;
    }

    .brandpig{
        font-size: 2.7rem;
    }

    .countries-box{
        padding-top: 10%;
        grid-template-columns: 50% 50%;

      }


  }




  /* Styles for tablets (768px to 1024px width) */
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    /* Your CSS rules for tablets go here */

    .brand{
        font-size: 3rem;
    }

    .brandpig{
        font-size: 2.5rem;
    }
    header{
        padding: 1.3rem 7%;

    }

    .countries-box{
        padding-top: 10%;

        grid-template-columns: 50% 50%;



      }



  }

  /* Styles for laptops (1025px to 1440px width) */
  @media screen and (min-width: 1025px) and (max-width: 1440px) {
    /* Your CSS rules for laptops go here */
    .countries-box{
        padding-top: 10%;

        grid-template-columns: 33% 33% 33%;



      }




  }

  /* Styles for desktops (1441px and above width) */
  @media screen and (min-width: 1441px) and  (max-width: 1740px){
    /* Your CSS rules for desktops go here */

    .brand{
        font-size: 4rem;
    }

    .brandpig{
        font-size: 3.5rem;
    }

    .all{
        padding-left: 3%;
    }



  }

  @media screen and (min-width: 1741px){
    /* Your CSS rules for desktops go here */


    .brand{
        font-size: 4rem;
    }

    .brandpig{
        font-size: 3.5rem;
    }

    .all{
        padding-left: 13%;
    }



  }


</style>
