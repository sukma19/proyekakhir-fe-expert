/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurant');
Before(({ I }) => {
  I.amOnPage('/#/like');
  I.wait(5);
});

Scenario('Like & Unlike', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.restaurant-item');
  const firstRestoran = locate('.restaurant-item a').first();
  const firstRestoranTitle = await I.grabTextFrom(firstRestoran);
  I.click(firstRestoran);
  I.wait(5);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/like');
  I.seeElement('.restaurant-item');
  const likedRestoran = locate('.restaurant-item a').first();
  const likedRestoranTitle = await I.grabTextFrom(likedRestoran);
  assert.strictEqual(firstRestoranTitle, likedRestoranTitle);
  I.click(likedRestoran);
  I.wait(5);
  I.seeElement('#likeButton');
  I.click('#likeButton');
  I.amOnPage('/#/like');
  I.dontSeeElement('.restaurant-item');
});
