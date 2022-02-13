// recuperer l'id via les paramètres de l'URL
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

// creer choix couleurs et quantiter
const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

// appel de la fonction pour recuperer les produits
getArticle();

//fonction pour récuperer les produits par l'API
function getArticle() {
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
      return res.json();
    })
    // répartir les données de l'API dans le DOM

    .then(async function (resultatAPI) {
      article = await resultatAPI;
      console.table(article);
      if (article) {
        getPost(article);
      }
    })
    .catch((error) => {
      console.log("Erreur requête");
    });
}

function getPost(article) {
  // ajout de l'image du produit
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  // ajout et modif du titre 'h1' du produit
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  // ajout et modif du prix du produit
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  // ajout et modif de la description du produit
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  // ajout des option des couleurs du produit
  for (let colors of article.colors) {
    console.table(colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  addToCart(article);
}

//Gestion du panier
function addToCart(article) {
  const btn_envoyerPanier = document.querySelector("#addToCart");

  // "écouter" panier avec deux conditions : couleur non null et quantiter entre un et 100
  btn_envoyerPanier.addEventListener("click", (event) => {
    if (
      quantityPicked.value > 0 &&
      quantityPicked.value <= 100 &&
      quantityPicked.value != 0
    ) {
      // choix de la couleur du produit
      let choixCouleur = colorPicked.value;

      // choix de la quantité des produits
      let choixQuantite = quantityPicked.value;

      // récup option du poduits à ajouter au panier
      let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt,
      };

      // initialisation du stockage local (local storage)
      let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

      // création fenêtre pop up
      const popupConfirmation = () => {
        if (
          window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)
        ) {
          window.location.href = "cart.html";
        }
      };

      // importer dans le stockage local (local storage)
      // si panier a déja au moins un article
      if (produitLocalStorage) {
        const resultFind = produitLocalStorage.find(
          (el) =>
            el.idProduit === idProduct && el.couleurProduit === choixCouleur
        );
        // si le produit est déja dans le panier
        if (resultFind) {
          let newQuantite =
            parseInt(optionsProduit.quantiteProduit) +
            parseInt(resultFind.quantiteProduit);
          resultFind.quantiteProduit = newQuantite;
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();
          //Si le produit n'est pas dans le panier
        } else {
          produitLocalStorage.push(optionsProduit);
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();
        }
        //Si le panier est vide
      } else {
        produitLocalStorage = [];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
      }
    }
  });
}
