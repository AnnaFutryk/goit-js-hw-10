import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'

//======== without slimSelect =================//
// const refs = {
//     breedSelect: document.querySelector('.breed-select'),
//     catsWrapper: document.querySelector('.cat-info'),
//     loader: document.querySelector('.loader'),
//     error: document.querySelector('.error'),
// }

// refs.breedSelect.addEventListener('change', onChange);
// refs.error.classList.add('is-hidden');

// showLoader(refs.breedSelect);



// fetchBreeds().then((breeds) => {
//         // Наповнення breedSelect опціями порід
//         breeds.forEach(breed => {
//             const optionElement = document.createElement('option');
//             optionElement.value = breed.id;
//             optionElement.label = breed.name;
//             refs.breedSelect.appendChild(optionElement);
//         });
        
//     })
// .catch(onError)
// .finally(()=>hideLoader(refs.breedSelect));


// function onError(err) {
//     console.error(err);
//     // refs.error.classList.remove('is-hidden')
//     Notify.failure('Oops! Something went wrong! Try reloading the page!');
// };

// function onChange(event) {
//     event.preventDefault();
//     const breedId = event.target.value;
//     refs.error.classList.remove('visible'); 

//     showLoader(refs.catsWrapper);

//     fetchCatByBreed(breedId)
//         .then((catsData) => {
//         // Clear previous cat info
//         refs.catsWrapper.innerHTML = '';
//         return catsData.reduce(
//             (markup, catData) => markup + createMarkup(catData),
//             ''
//         );
//     })
//     .then(updateMarkup)     
//     .catch(onError)
//     .finally(() => hideLoader(refs.catsWrapper))
// }



// function createMarkup({ url, breeds}) {
//     const breed = breeds[0]
//     return `
//     <div class="catCard">
//     <img src="${url}" width="300">
//     <h2 class"name">${breed.name}</h2>
//     <p class="descr">${breed.description}</p>
//     <p class="temperament">Temperament: ${breed.temperament}</p>
//     </div>`
// }

// // function createMarkup(catsData) {
// //   return catsData.map(({ url, breeds: { name, description, temperament } }) => `
// //     <div class="catCard">
// //       <img src="${url}">
// //       <h2 class="name">${name}</h2>
// //       <p class="descr">${description}</p>
// //       <p class="temperament">${temperament}</p>
// //     </div>`
// //   ).join('');
// // }

// function updateMarkup(markup) {
//     refs.catsWrapper.innerHTML = markup;
    
// }

// function showLoader(element) {
//     element.classList.add('is-hidden'); 
//     refs.loader.classList.remove('is-hidden'); 
// }

// function hideLoader(element) {
//     element.classList.remove('is-hidden'); 
//     refs.loader.classList.add('is-hidden');
// }

//============= with slimSelect =============// 
const refs = {
  breedSelect: document.querySelector('#selectElement'),
  catsWrapper: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
}

refs.error.classList.add('is-hidden');

showLoader(refs.breedSelect);

let selectedBreedId = null;
let slimSelect;

fetchBreeds()
  .then((breeds) => {
    const options = breeds.map((breed) => ({
      text: breed.name,
      value: breed.id,
    }));

    slimSelect = new SlimSelect({
      select: refs.breedSelect,
      data: options,
      settings: {

        beforeOpen: () => {
          if (!slimSelect.selected) {
            return false;
          }
        },
      },
    });

    refs.breedSelect.addEventListener('change', onChange);

    if (!slimSelect.selected) {
      hideLoader(refs.breedSelect);
    }
  })
  .catch(onError)
  .finally(() => hideLoader(refs.breedSelect));

function onError(err) {
  console.error(err);
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function onChange(event) {
  event.preventDefault();
  selectedBreedId = event.target.value;
  refs.error.classList.remove('visible');

  showLoader(refs.catsWrapper);

  if (selectedBreedId) {
    fetchCatByBreed(selectedBreedId)
      .then((catsData) => {
        refs.catsWrapper.innerHTML = '';
        return catsData.reduce((markup, catData) => markup + createMarkup(catData), '');
      })
      .then(updateMarkup)
      .catch(onError)
      .finally(() => hideLoader(refs.catsWrapper));
  } else {
    refs.catsWrapper.innerHTML = '';
    hideLoader(refs.catsWrapper);
  }
}

function createMarkup({ url, breeds }) {
  const breed = breeds[0];
  return `
    <div class="catCard">
      <img src="${url}" width="300">
      <div class="text-part">
        <h2 class="name">${breed.name}</h2>
        <p class="descr">${breed.description}</p>
        <p class="temperament"><span class ="temperament-header">Temperament:</span> ${breed.temperament}</p>
      </div>
    </div>
  `;
}

function updateMarkup(markup) {
  refs.catsWrapper.innerHTML = markup;
}

function showLoader(element) {
  element.classList.add('is-hidden');
  refs.loader.classList.remove('is-hidden');
}

function hideLoader(element) {
  element.classList.remove('is-hidden');
  refs.loader.classList.add('is-hidden');
}









