// getproduct est déclarer
const getProduct = document.getElementById("items");

// allproduct est déclarer pour chaque canapé
const allProduct = document.getElementsByClassName("items");

// fetch va chercher les canapé sur l'API
fetch("http://localhost:3000/api/products").then((res) => {
  getProduct.innerHTML = `
  <a href="./product.html?id=107fb5b75607497b96722bda5b504926">
  <article>
  <img src="pcinq/back/images/kanap01.jpg" alt="Photo d'un canapé bleu, deux places">
  <h3 class="productName">Kanap Sinopé</h3>
  <p class="productDescription">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
</article>
</a>
  `;
});

fetch(
  "http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926"
).then((res) => {
  allProduct.innerHTML = `
  <a href="./product.html?id=107fb5b75607497b96722bda5b504926">
  <article>
  <img src="pcinq/back/images/kanap01.jpg" alt="Photo d'un canapé bleu, deux places">
  <h3 class="productName">Kanap Sinopé</h3>
  <p class="productDescription">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
</article>
</a>
  `;
});
