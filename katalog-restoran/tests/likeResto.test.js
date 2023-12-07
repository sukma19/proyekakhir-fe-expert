import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

// eslint-disable-next-line no-undef
describe('Liking A Restaurant', () => {
  // eslint-disable-next-line no-undef
  it('should show the like button when the restaurant has not been liked before', async () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';

    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),

      restaurant: {
        id: 1,
      },
    });

    // eslint-disable-next-line no-undef
    expect(document.querySelector('[aria-label="like this movie"]')).toBeTruthy();
  });

  // eslint-disable-next-line no-undef
  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });
    // eslint-disable-next-line no-undef
    expect(document.querySelector('[aria-label="unlike this movie"]')).toBeFalsy();
  });

  // eslint-disable-next-line no-undef
  it('should be able to like the restaurant', async () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';

    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const resto = await FavoriteRestaurantIdb.getRestaurant(1);
    // eslint-disable-next-line no-undef
    expect(resto).toEqual({ id: 1 });
    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  // eslint-disable-next-line no-undef
  it('should not add a restaurant again when its already liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: 1,
      },
    });

    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    // eslint-disable-next-line no-undef
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  // eslint-disable-next-line no-undef
  it('should not add a restaurant when it has no id', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {},
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // eslint-disable-next-line no-undef
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
