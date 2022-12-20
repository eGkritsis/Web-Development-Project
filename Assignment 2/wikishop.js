// Get the template
const template = Handlebars.compile(document.querySelector('#category-template').innerHTML);



// Get the data for the categories from the API
fetch('https://api.wikishop.com/categories')
  .then(response => response.json())
  .then(data => {
    // Generate the HTML for the categories
    const html = data.map(category => template(category)).join('');

    // Insert the HTML into the page
    document.querySelector('#categories-list').innerHTML = html;
  });