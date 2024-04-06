let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  function displayData() {
    fetch("http://localhost:3000/toys")
     .then(response => response.json())
     .then(data => {
        const toys = data;
        toys.forEach(element => {
          const toyCollection = document.querySelector("#toy-collection");
          const creatDiv = document.createElement("div");
          creatDiv.className = 'card';
          creatDiv.innerHTML = `<h2>${element.name}</h2>
        <img src="${element.image}" class="toy-avatar" />
        <p>${element.likes} Likes</p>
        <button class="like-btn" id="[toy_id]">Like ❤️</button>`;
          creatDiv.querySelector(".like-btn").addEventListener('click', function() {
            element.likes += 1;
            creatDiv.querySelector('p').textContent= `${element.likes} Likes`;
            updateToys(element);
          },false);
          toyCollection.appendChild(creatDiv);
        });
      });
  }

  function updateToys(toyobj) {
    fetch(`http://localhost:3000/toys/${toyobj.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toyobj)
      })
      .then(response=>response.json())
      .then(data=>data)
  }

  function adoptToy(toyobj) {
    fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toyobj)
      })
      .then(response=>response.json())
      .then(data=>data)
  }

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy =!addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      const form = document.querySelector(".add-toy-form");
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let toyobj = {
          name: e.target.name.value,
          image: e.target.image.value,
          likes: 0
        };
        adoptToy(toyobj);
      });
    } else {
      toyFormContainer.style.display = "none";
    }
  },false);

  displayData();
},false);