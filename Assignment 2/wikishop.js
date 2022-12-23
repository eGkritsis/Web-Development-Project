// Fetch categories and subcategories from the API and render them on the page
function fetchCategories() {
  fetch('https://wiki-shop.onrender.com/categories')
    .then(response => response.json())
    .then(categories => {
      // Compile the Handlebars template
      const template = Handlebars.compile(
        document.getElementById('category-template').innerHTML
      );
      // Render the template with the fetched categories
      const html = template({categories});
      // Insert the rendered HTML into the page
      document.getElementById('categories').innerHTML = html;
    });
}

// Fetch products from the API and render them on the page
function fetchProducts(id) {

  // Probably does not work as it should!!! TO BE FIXED!

  fetch('https://wiki-shop.onrender.com/categories/${id}/products')
    .then(response => response.json())
    .then(products => {
      /*
      // Compile the Handlebars template
      const template = Handlebars.compile(
        document.getElementById('product-template').innerHTML
      );
      // Render the template with the fetched products
      const html = template({products});
      // Insert the rendered HTML into the page
      document.getElementById('products').innerHTML = html;
      */
     const template = document.querySelector('#product-template').innerHTML;
     const compiledTemplate = Handlebars.compile(template);
     const html = compiledTemplate({products})

     // Insert the rendered HTML into the page
     document.querySelector('#products').innerHTML = html;
    });
}

// Add event listeners for navigating between categories and products
document.addEventListener('DOMContentLoaded', () => {
  // Fetch and render categories on the homepage
  fetchCategories();
  // Render products when a category is clicked
  document.addEventListener('click', event => {
    //const link = event.target.closest('a');

    //if (link && link.href.includes('/category.html/')) {
      //event.preventDefault();
      //const id = link.href.split('/').pop();
      //fetchProducts(id);
    //}

    // Does not find the {{id}} correctly
    fetchProducts(1);
  });
});

// Use the URLSearchParams API to retrieve the value of the id query parameter
//const id = new URLSearchParams(window.location.search).get('id');
/*
function navigateToCategory(id) {
  // Use the URLSearchParams API to set the id query parameter
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('id', id);

  // Navigate to the category.html page with the id query parameter
  window.location.href = `/category.html?${searchParams}`;
}
*/

