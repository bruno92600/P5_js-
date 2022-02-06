//<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//              <div class="cart__item__img">
//              <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//          </div>
//        <div class="cart__item__content">
//        <div class="cart__item__content__description">
//         <h2>Nom du produit</h2>
//       <p>Vert</p>
//      <p>42,00 €</p>
//  </div>
//<div class="cart__item__content__settings">
//<div class="cart__item__content__settings__quantity">
// <p>Qté : </p>
// <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//               </div>
//             <div class="cart__item__content__settings__delete">
//             <p class="deleteItem">Supprimer</p>
//         </div>
//     </div>
// </div>
// </article>

// je crée une variable pour aller chercher la clef dans le localstorage + récupe du tableau
let addProduits = JSON.parse(localStorage.getItem("produits"));
// variables pour aller directement a l'api

// fonction
const panierDisplay = async () => {
  // si produits présent
  if (addProduits) {
    await addProduits;
    // si true il existe bien
    console.log(addProduits);
    cart__items.innerHTML = addProduits.map(
      (produit) => `
     <article class="cart__item" data-id="" data-color="">
               <div class="cart__item__img">
             <img src="${produit.imageUrl}" alt="${produit.altTxt}">
          </div>
         <div class="cart__item__content">
         <div class="cart__item__content__description">
          <h2>${produit.name}</h2>
        <p>${produit.colors}</p>
       <p>${produit.price} €</p>
   </div>
 <div class="cart__item__content__settings">
 <div class="cart__item__content__settings__quantity">/  <p>Qté : </p>
  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
              <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
          </div>
      </div>
  </div>
  </article>
     `
    );
  } else {
  }
  `)
    // si pas de produit = alerte
//     document.getElementById("cart__items").innerHTML = kanapData
//       .map(
//         (canape) => `;
  //     <article class="cart__item" data-id="" data-color="">
  //               <div class="cart__item__img">
  //              <img src="${canape.imageUrl}" alt="${canape.altTxt}">
  //           </div>
  //         <div class="cart__item__content">
  //         <div class="cart__item__content__description">
  //          <h2>${canape.name}</h2>
  //        <p>${canape.colors}</p>
  //       <p>${canape.price} €</p>
  //   </div>
  // <div class="cart__item__content__settings">
  // <div class="cart__item__content__settings__quantity">
  //  <p>Qté : </p>
  //  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
  //                </div>
  //              <div class="cart__item__content__settings__delete">
  //              <p class="deleteItem">Supprimer</p>
  //          </div>
  //      </div>
  //  </div>
  //  </article>
  //     `
  //       )
  //       .join("");
  //   } else {
  //   }
};
panierDisplay();

// variables pour aller directement a l'api
// let kanapData = [];

// fetch http pour récuperer les produits de API
// const fetchKanap = async () => {
//   await fetch("http://localhost:3000/api/products")
//     .then((res) => res.json())
//     .then((promise) => {
//       kanapData = promise;
//       console.log(kanapData);
//     });
// };
