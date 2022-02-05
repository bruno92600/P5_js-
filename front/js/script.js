// fetch va chercher les canapé sur l'API
//function getProducts() {
// return fetch("http://localhost:3000/api/products")
//   .then((res) => res.json())
//  .then((articles) => {
//     afficherArticles(articles);
//   })
// .catch(function (error) {
//  console.error(`erreur recuperation produits:`, error);
// });
//}

//getProducts();

//function afficherArticles(articles) {
//for (article of articles) {
//  const articleHtml = `
// <a href=${"./product.html"}>
//   <article>
//    <img src="${article.imageUrl}" alt="${article.altTxt}>
//   <h3 class="productName">${article.name}</h3>
//   <p class="productDescription">${article.description}</p>
//  </article>
//  </a>
//  `;
//  items.innerHTML += articleHtml;
// }
//}

//<p>
//${article.name} - ${article.price}
//</p>;
//console.log("je suis la");

// const items = getProducts().then((res) => {
//   return res;
// });
// console.log(`--> items ici:`, items);

// (async function () {
//   const items = await getProducts();
//   //console.log(`--> items ici:`, items);

//   for (item of items) {
//     console.log(item);
//   }
// });

// déclare une variable en tableau(array)
let kanapData = [];

// fetch http pour récuperer les produits de API
const fetchKanap = async () => {
  await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((promise) => {
      kanapData = promise;
      console.log(kanapData);
    });
};

// fonction qui va faire apparaitre chaque élément
const kanapDisplay = async () => {
  await fetchKanap();
  document.getElementById("items").innerHTML = kanapData
    .map(
      (canape) => `
        <a href="./product.html?${canape._id}">
            <article>
              <img src="${canape.imageUrl}" alt="${canape.altTxt}">
              <h3 class="productName">${canape.name}</h3>
              <p class="productDescription">${canape.description}</p>
            </article>
          </a>
`
    )
    // enlève les virgules entre chaque canapé
    .join("");
};

//appel la fonction
kanapDisplay();
