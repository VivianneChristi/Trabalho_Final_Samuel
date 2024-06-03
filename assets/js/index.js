const main = document.querySelector(".container");
const urlImg = "http://10.92.198.38:8080/";
let currentPage = 1;
const postsPerPage = 3;
 
async function getPersons(page = 1) {
  const response = await fetch(`http://10.92.198.38:8080/feed/posts?page=${page}&limit=${postsPerPage}`);
  const posts = await response.json();
  console.log(posts);
  return posts;
}
 
function cards(data) {
  const main = document.querySelector('main'); // Certifique-se de que o elemento main existe
  main.innerHTML = ""; // Limpar posts antigos

  const arrayDatas = data.posts;
  if (arrayDatas.length === 0) {
    const message = document.createElement("p");
    message.className = "no-images-message";
    message.textContent = "Não há mais imagens para exibir.";
    main.appendChild(message);
    return;
  }

  const cardContainer = document.createElement("div");
  cardContainer.className = "card-container";

  arrayDatas.slice(0, 3).forEach((element) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <div class="banner">
            <img src="${urlImg + element.imageUrl}" alt="Image" />
        </div>
        <div class="content">
            <div class="texts">
                <h3 class="name">${element.title}</h3>
                <h5 class="species">${element.content}</h5>
            </div>
        </div>
    `;
    cardContainer.appendChild(card);
  });

  main.appendChild(cardContainer);
}

 
 
async function loadPage(page) {
  const data = await getPersons(page);
  cards(data);
}
 
document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  loadPage(currentPage);
});
 
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadPage(currentPage);
  }
});
 
// Carregar a primeira página ao iniciar
loadPage(currentPage);
//-----------------------------------------------------------Animação dos Next/Prev---------------------------------------------//
var arrows = document.querySelectorAll(".arrow-main");

arrows.forEach(function(arrow) {
  arrow.addEventListener("click", function(e) {
    e.preventDefault();

    if (!arrow.classList.contains("animate")) {
      arrow.classList.add("animate");
      setTimeout(function() {
        arrow.classList.remove("animate");
      }, 1600);
    }
  });
});



