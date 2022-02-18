// initialisation du stockage local (local storage)
let productLocalStorage = JSON.parse(localStorage.getItem("cart"));

if (!productLocalStorage) {
  const titleCart = document.querySelector("h1");
  const sectionCart = document.querySelector(".cart");

  titleCart.innerHTML = "Votre panier est vide !";
  sectionCart.style.display = "none";
} else {
  for (let i = 0; i < productLocalStorage.length; i++) {
    // création balise 'article' et ajout dans la section
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute("data-id", productLocalStorage[i].idKanap);

    // ajout d'une 'div' pour l'image du produit
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    // ajout de l'image du produit
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = productLocalStorage[i].imgKanap;

    // ajout d'une 'div' pour la description du produit
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // ajout d'une 'div' pour prix du produit
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";

    // ajout du titre h2 de chaque produit
    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = productLocalStorage[i].nameKanap;

    // ajout de la couleur de chaque produit
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = productLocalStorage[i].colorKanap;
    productColor.style.fontSize = "22px";

    // ajout du prix de chaque produit
    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = productLocalStorage[i].priceKanap + " €";

    // ajout d'une 'div'
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // ajout d'une 'div' pour les "quantiter" de chaque produit
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className =
      "cart__item__content__settings__quantity";

    // ajout de l'élément "Qté : "
    let productQty = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQty);
    productQty.innerHTML = "Qté : ";

    // ajout de la quantité de chaque produit
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = productLocalStorage[i].qtyKanap;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // ajout d'une 'div' pour supprimer
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className =
      "cart__item__content__settings__delete";

    // ajout d'un "p" pour pouvoir supprimer l'article ou les articles
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";
    productSupprimer.addEventListener("click", (e) => {
      e.preventDefault;

      // enregistrement de l'id et de la couleur séléctionnés par le bouton supprimer
      let deleteId = productLocalStorage[i].idKanap;
      let deleteColor = productLocalStorage[i].colorKanap;

      // filtré ce qui a été cliqué par le bouton sipprimer
      productLocalStorage = productLocalStorage.filter(
        (elt) => elt.idKanap !== deleteId || elt.colorKanap !== deleteColor
      );

      // envoie des nouvelles données dans le stockage local
      localStorage.setItem("cart", JSON.stringify(productLocalStorage));

      // prevenir de la suppression du produit puis recharger la page
      alert("Votre article a bien été supprimé.");

      // si aucun produit dans le stockage local, afficher que le panier est vide
      if (productLocalStorage.length === 0) {
        localStorage.clear();
      }
      // raffraichissement de la page
      location.reload();
    });
  }
}

// fonction de récuperation du total des produits en quantité et prix
function getTotals() {
  // récupérer le total des quantités des produits
  var elemsQtt = document.getElementsByClassName("itemQuantity");
  var myLength = elemsQtt.length,
    totalQtt = 0;

  for (var i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }

  let productTotalQuantity = document.getElementById("totalQuantity");
  productTotalQuantity.innerHTML = totalQtt;

  // récupérer le prix total
  totalPrice = 0;
  for (var i = 0; i < myLength; ++i) {
    totalPrice += elemsQtt[i].valueAsNumber * productLocalStorage[i].priceKanap;
  }

  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = totalPrice;
}
getTotals();

// fonction pour modifier la quantiter des produits
function modifyQtt() {
  let qttModif = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < qttModif.length; k++) {
    qttModif[k].addEventListener("change", (event) => {
      event.preventDefault();

      // selection du produits a modifer en fonction de son id et couleur
      let quantityModif = productLocalStorage[k].qtyKanap;
      let qttModifValue = qttModif[k].valueAsNumber;

      const resultFind = productLocalStorage.find(
        (el) => el.qttModifValue !== quantityModif
      );

      resultFind.qtyKanap = qttModifValue;
      productLocalStorage[k].qtyKanap = resultFind.qtyKanap;

      localStorage.setItem("cart", JSON.stringify(productLocalStorage));

      // raffraichissement de la page
      location.reload();
    });
  }
}
modifyQtt();

// construction du formulaire a l'aide de regex
function getForm() {
  // insertion des Regex
  let form = document.querySelector(".cart__order__form");

  // integration des regex
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // "Ecoute" de la modification du prénom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // "Ecoute" de la modification du prénom
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // "Ecoute" de la modification du prénom
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // "Ecoute" de la modification du prénom
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // "Ecoute" de la modification du prénom
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}
getForm();

// fonction pour envoyer le formulaire au serveur
function postForm() {
  const order = document.getElementById("order");
  order.addEventListener("click", (event) => {
    event.preventDefault();

    // récupération des données dans un objet
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    // construction d'un tableau (array) depuis le stockage local
    let products = [];
    for (let i = 0; i < productLocalStorage.length; i++) {
      products.push(productLocalStorage[i].idKanap);
    }
    console.log(products);

    // mettre les valeurs du form et les produits séléctionnés dans un objet
    const sendFormData = {
      contact,
      products,
    };

    // envoie au serveur du form et du stockage local
    const options = {
      method: "POST",
      body: JSON.stringify(sendFormData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("orderId", data.orderId);
        document.location.href = "confirmation.html?id=" + data.orderId;
      });
  }); // fin de l'écoute (eventlistener) postForm
} // fin envoi du form postForm
postForm();
