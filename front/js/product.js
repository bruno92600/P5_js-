//Récupération de l'id de chaque produit via les paramètres de l'url
const idProduct = new URL(window.location.href).searchParams.get("id");

// creation et Récupération des sélecteurs pour les futurs modifications
let titleProduct = document.getElementById("title");
let priceProduct = document.getElementById("price");
let descriptionProduct = document.getElementById("description");
let colorsProduct = document.getElementById("colors");
let imgProduct = document.querySelector(".item__img");
let img = document.createElement("img");
imgProduct.appendChild(img);

//Récupération de l'article grace a l'id + affichage des données de ce dernier
async function getArticle() {
  await fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => response.json())
    .then((product) => {
      // ajout par setAttribute de l'image et texte de l'image
      img.setAttribute("src", product.imageUrl);
      img.setAttribute("alt", product.altTxt);
      // ajout des infos produits par innerHTML
      titleProduct.innerHTML = product.name;
      priceProduct.innerHTML = product.price;
      descriptionProduct.innerHTML = product.description;
      document.title = product.name;
      // ajout des options pour les couleurs disponible
      for (let i = 0; i < product.colors.length; i++) {
        let color = document.createElement("option");
        color.setAttribute("value", product.colors[i]);
        color.innerHTML = product.colors[i];
        colorsProduct.appendChild(color);
      }
    });
}
// appel la fonction getArticle
getArticle();

// Ajouté un article au panier
let addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", addToCart);

// fonction pour ajouté au panier selon quantiter et couleurs choisi
function addToCart() {
  const colorChoice = document.querySelector("#colors");
  const quantityChoice = document.querySelector("#quantity");

  // nombre de canapé de 1 a 100 ou différent de 0
  if (
    quantityChoice.value > 0 &&
    quantityChoice.value <= 100 &&
    quantityChoice.value != 0 &&
    colorChoice.value != 0
  ) {
    // getItem va ajouter au local storage le produit choisi
    if (localStorage.getItem("cart")) {
      // json.parse passe la chaine de caractères en objet javascript
      let productCart = JSON.parse(localStorage.getItem("cart"));

      // variables pour le choix des couleurs/quantité
      let idKanap = idProduct;
      let colorKanap = document.querySelector("#colors").value;
      let qtyKanap = document.querySelector("#quantity").value;

      // variables pour le resultat trouvé suite au choix de l'utilisateur
      const resultFind = productCart.find(
        (el) => el.idKanap === idProduct && el.colorKanap === colorKanap
      );

      // parseInt permet de convertir qtyKanap en chaine
      if (resultFind) {
        let newQuantite = parseInt(qtyKanap) + parseInt(resultFind.qtyKanap);
        resultFind.qtyKanap = newQuantite;
        // JSON.stringify permet de transformer le contenu en chaine de caractère au formot json
        localStorage.setItem("cart", JSON.stringify(productCart));
        //Si le produit commandé n'est pas dans le panier
      } else {
        // json.parse passe la chaine de caractères en objet javascript
        let productCart = JSON.parse(localStorage.getItem("cart"));

        // variables pour les différente info produits
        let idKanap = idProduct;
        let nameKanap = document.querySelector("#title").textContent;
        let colorKanap = document.querySelector("#colors").value;
        let qtyKanap = document.querySelector("#quantity").value;
        let imgKanap = img.src;
        let altImg = img.alt;
        let priceKanap = document.querySelector("#price").textContent;

        // variables pour englober toutes les infos des différents produits dans productCartObj
        let productCartObj = {
          idKanap: idProduct,
          nameKanap: nameKanap,
          colorKanap: colorKanap,
          qtyKanap: qtyKanap,
          imgKanap: imgKanap,
          altImg: altImg,
          priceKanap: priceKanap,
        };

        // permet d'ajouter les valeurs a productCart
        productCart.push(productCartObj);

        // JSON.stringify permet de transformer le contenu en chaine de caractère au formot json
        let objCart = JSON.stringify(productCart);

        // setItem ajoute les produits au localstorage
        localStorage.setItem("cart", objCart);

        // une alerte est créer pour l'ajout au panier
        alert("Ajouté au panier !");
      } // si le produit est dans le panier
    } else {
      // création d'un array(tableau) pour y contenir l'ensemble des info du produit ajouté au panier
      let productCart = [];

      // variables pour les différente info produits
      let idKanap = idProduct;
      let nameKanap = document.querySelector("#title").textContent;
      let colorKanap = document.querySelector("#colors").value;
      let qtyKanap = document.querySelector("#quantity").value;
      let imgKanap = img.src;
      let altImg = img.alt;
      let priceKanap = document.querySelector("#price").textContent;

      // variables pour englober toutes les infos des différents produits dans productCartObj
      let productCartObj = {
        idKanap: idProduct,
        nameKanap: nameKanap,
        colorKanap: colorKanap,
        qtyKanap: qtyKanap,
        imgKanap: imgKanap,
        altImg: altImg,
        priceKanap: priceKanap,
      };

      // permet d'ajouter les valeurs a productCart
      productCart.push(productCartObj);

      // JSON.stringify permet de transformer le contenu en chaine de caractère au formot json
      let objCart = JSON.stringify(productCart);

      // setItem ajoute les produits au localstorage
      localStorage.setItem("cart", objCart);

      // une alerte est créer pour l'ajout au panier
      alert("Ajouté au panier !");
    }
  }
}
