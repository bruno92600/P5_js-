// fonction pour récuperer les produits par l'API
async function recupProduits() {
  let produits = await fetch("http://localhost:3000/api/products");
  return produits.json();
}
// appel de la fonction pour récupérer les produits disponibles
recupProduits();

// fonction pour la création des éléments a, h3, img etc...
async function creaProduits() {
  let resultats = await recupProduits().then((produits) => {
    for (let i = 0; i < produits.length; i++) {
      // créer et inserer l'élément 'a' (href)
      let produitsLien = document.createElement("a");
      document.querySelector(".items").appendChild(produitsLien);
      produitsLien.href = `product.html?id=${produits[i]._id}`;

      // créer et inserer l'élement 'article' (ensemble img description etc.)
      let produitsArticle = document.createElement("article");
      produitsLien.appendChild(produitsArticle);

      // creer et inserer l'img (image)
      let produitsImg = document.createElement("img");
      produitsArticle.appendChild(produitsImg);
      produitsImg.src = produits[i].imageUrl;
      produitsImg.alt = produits[i].altTxt;

      // creer et inserer le titre h3
      let produitsNom = document.createElement("h3");
      produitsArticle.appendChild(produitsNom);
      produitsNom.classList.add("produitsNom");
      produitsNom.innerHTML = produits[i].name;

      // creer et inserer le 'p' (description du produit)
      let produitsDescript = document.createElement("p");
      produitsArticle.appendChild(produitsDescript);
      produitsDescript.classList.add("produitsNom");
      produitsDescript.innerHTML = produits[i].description;
    }
  });
}
// appel de la fonction pour la création des éléments via la liste API
creaProduits();
