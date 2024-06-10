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

//--------------------------------------- Postagem ----------------------------------//
const content = document.getElementById('content');

const title = document.getElementById('title');
const btn = document.getElementById('btn')

btn.addEventListener('click', ()=> {
    
    // const userData = JSON.stringify({
    //     title: title.value,
    //     content : content.value,
    // })
    const image = document.getElementById('image');
    const formData = new FormData();

    formData.append('image', image.files[0]);
    formData.append('title', title.value);
    formData.append('content', content.value);

    console.log(title.value)
    console.log(content.value)
    
    const userData = JSON.stringify({
        title : title,
        content : content,
        image : formData.get('image')
    })


    fetch("http://10.92.198.38:8080/feed/post", {
        method: "Post",
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZ21haWwuY29tIiwidXNlcklkIjoiNjY0MjU0YTY0M2VjYTkzOTE3MTI3YTc4IiwiaWF0IjoxNzE1NzA0OTU3LCJleHAiOjE3MTU3MTkzNTd9.meC29AB4xiTIpDykhJrkULSW5_QqmIs1lJpr9MjuU18"
        },
        
    }).then(result => result.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
})
//------------------------------------------ Fim da Postagem -------------------------------//
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



