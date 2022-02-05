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

  document.getElementsByClassName("item__img").innerHTML = `
  ${kanapData.imageUrl}
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
  document.getElementById("colors").innerHTML = `
  <option value="">${kanapData.colors[0]}</option>
       <option value="">${kanapData.colors[1]}</option>
       <option value="">${kanapData.colors[2]}</option>
  `;
};
// appel la fonction
//fetchKanap();
//appel la fonction
kanapDisplay();
