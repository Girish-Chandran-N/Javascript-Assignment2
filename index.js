const productList = document.getElementById("productList");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    async function getAllProducts() {
      const response = await fetch('https://fakestoreapi.com/products');
      const productsArray = await response.json();
      displayProductCards(productsArray);
    }

    getAllProducts();

    function displayProductCards(productsArray) {
      productList.innerHTML = "";
      productsArray.forEach(function (product) {
        const articleTag = document.createElement('article');
        articleTag.classList.add("product", "col-md-4", "mb-4");

        const productCard = `
          <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.title}" />
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text">${product.description}</p>
              <p class="price">£${product.price}</p>
              <a href="#" class="btn btn-warning view-product">View Product</a>
              <a href="#" class="btn btn-primary add-to-cart">Add to cart</a>
            </div>
          </div>
        `;
        articleTag.innerHTML = productCard;
        productList.appendChild(articleTag);
      });
    }

    searchButton.addEventListener("click", async function () {
      const query = searchInput.value.toLowerCase();
      if (!query) {
        alert("Please enter a product title to search.");
        return;
      }

      const response = await fetch('https://fakestoreapi.com/products');
      const productsArray = await response.json();
      const filteredProducts = productsArray.filter(product => product.title.toLowerCase().includes(query));
      displayProductCards(filteredProducts);
    });