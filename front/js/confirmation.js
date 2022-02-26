// Récupération de l'id de chaque produit via les paramètres de l'url
const id = new URL(window.location.href).searchParams.get("id");

const orderId = document.getElementById("orderId");
// envoie du "bon/numéro" de commande a l'utilisateur
orderId.innerHTML = id;

//  vide le stockage local une fois la validation de la commande passé
localStorage.clear();
