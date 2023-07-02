// function check if user is login

function loginStatus() {
  fetch("https://api.shipap.co.il/login", {
    credentials: "include", // accept send and receive cookies
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == "success") {
        handelUserData(data.user);
      } else {
        handelUserData();
      }
    });
}

// function to login to the server

function login() {
  const obj = {
    userName: document.querySelector("#userName").value,
    password: document.querySelector("input[type=password]").value,
  };

  // send to the server

  fetch("https://api.shipap.co.il/login", {
    method: "POST",
    credentials: "include", // accept send and receive cookies
    headers: {
      "Content-Type": "application/json", // setup the type of data
    },
    body: JSON.stringify(obj), // content to see the server
  })
    // get the response from the server
    .then((res) => res.json())
    // get the data from the response
    .then((data) => {
      if (data.status == "success") {
        handelUserData(data.user);
      } else {
        handelUserData();
        alert(data.message);
      }
    });
}

function handelUserData(user = null) {
  const divLogin = document.querySelector(".login");
  const divUser = document.querySelector(".user");

  if (user) {
    divLogin.style.display = "none";
    divUser.style.display = "block";
    divUser.innerHTML = `${user.fullName} מחובר!`;
    getProducts();
  } else {
    divLogin.style.display = "block";
    divUser.style.display = "none";
  }
}

// function to logout from the server
function logout(){
    fetch("https://api.shipap.co.il/logout", {
        credentials: "include", // accept send and receive cookies
    })
        // get the response from the server
        .then((res) => res.json())
        // get the data from the response
        .then((data) => {
            if (data.status == "success") {
                handelUserData();
            } else {
                alert(data.message);
            }
        });
}

function getProducts() {
  fetch("https://api.shipap.co.il/products", {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".products").style.display = "block";
      const tbody = document.querySelector(".products tbody");
      tbody.innerHTML = "";

      data.forEach((p, i) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
                <td>${i + 1}</td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.discount}</td>
                <td></td>
            `;

        tbody.appendChild(tr);
      });
    });
}

function addProduct(){
    const name = document.querySelector('#name').value;
    const price = document.querySelector('#price').value;
    const discount = document.querySelector('#discount').value;

    const obj = {
        name: name,
        price:+price,
        discount:+discount,
    }
    name.innerHTML = '';
    price.innerHTML = '';
    discount.innerHTML = '';

    fetch("https://api.shipap.co.il/products",{
        method: 'POST',
        credentials: "include",
        headers: {
            "Content-Type": "application/json", // setup the type of data
        },
        body: JSON.stringify(obj), // content to see the server
    })
    .then(res => res.json())
    .then(data => {
        if(data.status == 'success'){
            getProducts();
        }else{
            alert(data.message);
        }
    })
}