// Fetch categories and subcategories from the API and render them on the page
function renderCategories() {
  fetch('https://wiki-shop.onrender.com/categories')
    .then(response => response.json())
    .then(categories => {
      // Compile the Handlebars template
      const template = Handlebars.compile(
        document.getElementById('category-template').innerHTML
      );
      // Render the template with the fetched categories
      const html = template({ categories });
      // Insert the rendered HTML into the page
      document.getElementById('categories').innerHTML = html;

      // Iterate over each category and fetch its subcategories
      categories.forEach(category => {
        fetch(`https://wiki-shop.onrender.com/categories/${category.id}/subcategories`)
          .then(response => response.json())
          .then(subcategories => {
            // Compile the Handlebars template
            const template = Handlebars.compile(
              document.getElementById('subcategory-template').innerHTML
            );
            // Render the template with the fetched subcategories
            const html = template({ subcategories });
            // Insert the rendered HTML into the page
            document.getElementById(`subcategories-${category.id}`).innerHTML = html;
          });
      });
    });
}

// Fetch products from the API and render them on the page
function renderProducts(categoryId) {
  fetch(`https://wiki-shop.onrender.com/categories/${categoryId}/products`)
    .then(response => response.json())
    .then(products => {
      // Compile the Handlebars template
      const template = Handlebars.compile(
        document.getElementById('product-template').innerHTML
      );
      // Render the template with the fetched products
      const html = template({ products });
      // Insert the rendered HTML into the page
      document.getElementById('products').innerHTML = html;
    });
}

// Add event listeners for navigating between categories, subcategories, and products
document.addEventListener('DOMContentLoaded', () => {
  // Render categories on the homepage
  renderCategories();
  // Render products when a category or subcategory is clicked
  document.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (link && link.href.includes('/categories/')) {
      event.preventDefault();
      const categoryId = link.href.split('/').pop();
      renderProducts(categoryId);
    }
  });
});