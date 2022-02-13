// initialisation du stockage local (local storage)
let produitLocalStorage = JSON.parse(localStorage.getItem("cart"));

//
if (!produitLocalStorage) {
  const titreCart = document.querySelector("h1");
  const sectionCart = document.querySelector(".cart");

  titreCart.innerHTML = "Votre panier est vide";
  sectionCart.style.display = "none";
} else {
  for (let i = 0; i < produitLocalStorage.length; i++) {
    // création balise 'article' et ajout dans la section
    let productArticle = document.createElement("article");
    document.querySelector("#cart_item").appendChild(productArticle);
    productArticle.className = "cart_item";
    productArticle.setAttribute("data-id", produitLocalStorage[i].idKanap);

    // ajout de l'élement 'div' pour l'image du produit
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart_item_content";

    //
  }
}
