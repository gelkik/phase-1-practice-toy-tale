let addToy = false;

document.querySelector(".add-toy-form").addEventListener('submit',handleSubmit)

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function renderToy(toy){
  const div = document.createElement('div')
  div.className = 'card'

  const h2 = document.createElement('h2');
  h2.textContent = toy.name
  
  const img = document.createElement('img');
  img.src = toy.image;
  img.alt = `${toy.name} Cover`;
  img.className = 'toy-avatar';
  
  const p = document.createElement('p');
  p.textContent = `${toy.likes} Likes`
  
  const btn = document.createElement('button');
  btn.className = 'like-btn';
  btn.id = toy.id
  btn.textContent = 'Like ❤️'
  
  div.append(h2,img,p,btn);
  // toy.innerHTML = `
  // <h2>${toy.name}</h2>
  // <img src="${toy.image}" class="toy-avatar" />
  // <p>${toy.likes} Likes</p>
  // <button class="like-btn" id="${toy.id}">Like ❤️</button>
  // `

  document.querySelector('#toy-collection').appendChild(div);

  div.querySelector('.like-btn').addEventListener('click',()=>{
      div.querySelector('p').textContent = `${++toy.likes} Likes`
      updateToy(toy)
    })
  

}

function handleSubmit(e){
  e.preventDefault()
  let toy = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0,
  }
  renderToy(toy);
  newToy(toy);
}

function getToys(){
  fetch("http://localhost:3000/toys")
  .then(response=>response.json())
  .then(data=>data.forEach(toy=>renderToy(toy)))
  //.then(data=>renderToy(data))
  console.log('data fetched')
}
getToys()

function newToy(toy){
  fetch(`http://localhost:3000/toys`,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toy)
  })
  .then(response=>response.json())
  .then(data=>console.log(data))
}

function updateToy(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toy)
  })
  .then(response=>response.json())
  .then(data=>console.log(data))
}

