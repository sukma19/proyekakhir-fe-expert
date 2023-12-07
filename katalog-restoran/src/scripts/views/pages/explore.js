import RestaurantSource from '../../data/restaurant-source';
import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const Explore = {
  async render() {
    return `
      <div class="hero">
        <div class="hero_inner">
          <h1 class="hero_title">Cari Restaurant Langgananmu</h1>
          <p class="hero_tagline">
            Temukan restaurant yang sesuai untukmu dan dapatkan makanan fovoritmu
          </p>
        </div>
      </div>

      <div class="content">
        <h2 class="content__heading">Explore Restaurant</h2>
        <div id="tes" class="movies">

        </div>
      </div>
    `;
  },

  async afterRender() {
    const resto = await RestaurantSource.exploreRestaurant();
    let dataList = '';
    console.log(resto);
    resto.restaurants.forEach((restaurant) => {
      dataList += `
      <div class="restaurant-item">
      <div class="movie-item__header">
        <img class="movie-item__header__poster lazyload" alt="${restaurant.name}"
             data-src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL_MEDIUM + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
        <div class="movie-item__header__rating">
          <p>⭐️<span class="movie-item__header__rating__score">${restaurant.rating}</span></p>
        </div>
      </div>
      <div class="movie-item__content">
        <h3><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
        <p>${restaurant.description}</p>
      </div>
    </div>
            `;
    });
    document.querySelector('#tes').innerHTML = dataList;
  },
};

export default Explore;
