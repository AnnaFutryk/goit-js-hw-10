const URL = 'https://api.thecatapi.com/v1/breeds';
const URL_CAT_INFO = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = 'live_d4SFDLCAEfChM1rp1UYrzdYDdDHJDUbP9SYKqh3tejx4l0Yjjoh0mcsCdlqj4GSW';

function fetchBreeds() {
    return fetch(`${URL}?api_key=${API_KEY}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error('Error fetching cat breeds');
            } return res.json()
        })
      
}

function fetchCatByBreed(breedId) {
    return fetch(`${URL_CAT_INFO}?api_key=${API_KEY}&breed_ids=${breedId}`)
    .then((res) => {
        if (!res.ok) {
                throw new Error('Error fetching cat breeds');
            } return res.json()
    })
}

export { fetchBreeds, fetchCatByBreed };