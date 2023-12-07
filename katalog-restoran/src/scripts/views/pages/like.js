import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantTemplate } from '../templates/template-creator';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const Like = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Favorite Restaurants</h2>
        <div id="movies" class="movies">

        </div>
      </div>
    `;
  },

  async afterRender() {
    const movies = await FavoriteRestaurantIdb.getAllRestaurants();
    const moviesContainer = document.querySelector('#movies');
    movies.forEach((movie) => {
      moviesContainer.innerHTML += createRestaurantTemplate(movie);
    });
  },
};

export default Like;
