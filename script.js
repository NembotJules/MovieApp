const apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1" ; 

const imgPath = "https://image.tmdb.org/t/p/w1280" ; 
const main = document.querySelector('main'); 
const form  = document.getElementById("form"); 
const search = document.getElementById("search"); 
const searchApi = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=" ; 
getMovies(apiUrl); 

async function getMovies(url){
    const resp = await fetch(url); 
    const respData = await resp.json(); 
    showMovies(respData.results);
    console.log(respData);
}


function showMovies(movies){
    main.innerHTML = ''; 
    movies.forEach(movie => { 
        console.log(movie);
        const {poster_path, title, vote_average, overview} = movie ;
        const movieEl = document.createElement('div'); 
        movieEl.classList.add('movie'); 
        movieEl.innerHTML = `<div class="movie">
                                <img src="${imgPath+ poster_path}" alt="${title}">
                                <div class="movie-info">
                                    <h3>${title}</h3>
                                    <span class="${getClassByRate(vote_average)}"> ${vote_average} </span>
                                </div>
                                <div class="overview">
                                <h3>Overview:</h3>
                                  ${overview}
                                </div>
                                  
                            </div>
                         
                            `
        main.appendChild(movieEl); 
    });
}

function getClassByRate(vote){
    if (vote >= 8){
        return "green"; 
    }
    else if(vote>=5){
        return "orange"; 
    }
    else {
        return "red"; 
    }
}


form.addEventListener('submit', (e)=>{
    e.preventDefault(); 
    const searchValue = search.value; 
   if(searchValue){
       getMovies(searchApi+searchValue);
       search.value = ""; 
   }
})