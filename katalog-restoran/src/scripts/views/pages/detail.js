import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import CONFIG from '../../globals/config';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const Detail = {
  async render() {
    return `
    <section class="content">
    <div class="latest">
        <h1 id="restoName"></h1>
        <div class="detail-content" id="detail"></div>
        <div id="likeButtonContainer"></div>
    </div>
    </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    let dataDetail = '';
    let listCategory = '';
    let listMakanan = '';
    let listMinuman = '';
    let listReview = '';
    const detailResto = await RestaurantSource.detailRestaurant(url.id);
    console.log(detailResto);
    detailResto.restaurant.categories.forEach((data) => {
      listCategory += `
          <div class="tag">${data.name}</div>
      `;
    });
    detailResto.restaurant.menus.foods.forEach((data) => {
      listMakanan += `
          ${data.name},
      `;
    });
    detailResto.restaurant.menus.drinks.forEach((data) => {
      listMinuman += `
          ${data.name},
      `;
    });
    detailResto.restaurant.customerReviews.forEach((data) => {
      listReview += `
      <div class="review">
          <p><b>${data.name}</b> - ${data.date}</p>
          <p>${data.review}</p>
      </div>
      `;
    });
    dataDetail += `
      <div class="list_item">
          <img class="list_item_img lazyload" data-src="${CONFIG.BASE_IMAGE_URL_MEDIUM + detailResto.restaurant.pictureId}" alt="${detailResto.restaurant.name}" title="${detailResto.restaurant.name}">
          <div class="city">${detailResto.restaurant.city}</div>
          <div class="list_item_content" style="text-align:left;">
              <p class="list_item_rating">
                  Rating : ${detailResto.restaurant.rating}
              </p>
              <h2>${detailResto.restaurant.name}</h2>
              <p class="alamat">${detailResto.restaurant.address}</p>
              <div class="list_item_desc_detail">${detailResto.restaurant.description}</div>
              <br>
              <h2>Menu</h2>
              <h3 style="margin-bottom: 10px;">Kategori</h3>
              <div style="">${listCategory}</div>
              <h3 style="margin-top: 10px;">Makanan</h3>
              <div style="">${listMakanan}</div>
              <h3>Minuman</h3>
              <div style="margin-bottom: 20px;">${listMinuman}</div>
              <h2>Review</h2>
              <p>Apa kata mereka yang sudah pernah berkunjung ke sini?</p>
              <div>${listReview}</div>
          </div>
      </div>
  `;
    document.querySelector('#restoName').innerHTML = 'DETAIL RESTORAN';
    document.querySelector('#detail').innerHTML = dataDetail;

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: detailResto.restaurant.id,
        name: detailResto.restaurant.name,
        description: detailResto.restaurant.description,
        rating: detailResto.restaurant.rating,
        pictureId: detailResto.restaurant.pictureId,
      },
    });
  },
};

export default Detail;
