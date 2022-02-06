// va afficher sur le log l'Id sans ?
const kanap = window.location.search.split("?").join("");
console.log(kanap);

// déclare une variable en tableau(array)
let kanapData = [];

// fetch http pour récuperer les produits de API
const fetchKanap = async () => {
  await fetch(`http://localhost:3000/api/products/${kanap}`)
    .then((res) => res.json())
    .then((promise) => {
      kanapData = promise;
      console.log(promise);
    });
};

// fonction qui va faire apparaitre chaque élément
const kanapDisplay = async () => {
  await fetchKanap();
  // queryselector pour img car by classname ne fonctionnde pas
  document.querySelector(".item__img").innerHTML = `
  <img src="${kanapData.imageUrl}" alt="${kanapData.altTxt}${kanapData.name}">
  `;
  document.getElementById("title").innerHTML = `
  ${kanapData.name}
  `;

  document.getElementById("price").innerHTML = `
  ${kanapData.price}
  `;

  document.getElementById("description").innerHTML = `
  ${kanapData.description}
  `;

  // je vais chercher chaque couleur grace au tableau(array)
  let select = document.getElementById("colors");
  console.log(select);

  kanapData.colors.forEach((couleurs) => {
    console.log(document.createElement("option"));
    let colorOption = document.createElement("option");

    colorOption.innerHTML = `${couleurs}`;
    colorOption.value = `${couleurs}`;

    select.appendChild(colorOption);
  });
  addPanier(kanapData);
};
// appel la fonction
//fetchKanap();
//appel la fonction
kanapDisplay();

// mise en place du panier
const addPanier = () => {
  let button = document.getElementById("addToCart");
  console.log(button);
  button.addEventListener("click", () => {
    let kanapTableau = JSON.parse(localStorage.getItem("produits"));
    let select = document.getElementById("colors");
    console.log(select);
    console.log(kanapTableau);
    // constante couleurs pour ajouter au local storage
    const fusioncanapecolor = Object.assign({}, kanapData, {
      teinte: `${select.value}`,
      quantiter: 1,
    });
    console.log(fusioncanapecolor);
    teinte: if (kanapTableau == null) {
      kanapTableau = [];
      kanapTableau.push(fusioncanapecolor);
      console.log(kanapTableau);
      localStorage.setItem("produits", JSON.stringify(kanapTableau));
    }
  });
};
//innerHTML = `
// <option value="">${kanapData.colors[0]}</option>
//     <option value="">${kanapData.colors[1]}</option>
//   <option value="">${kanapData.colors[2]}</option>
// `
