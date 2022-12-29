function fetchProducts() {
	let params = new URLSearchParams(window.location.search);
	let categoryId = params.get('categoryId');
    let base_url = 'http://127.0.0.1:5000/https://wiki-shop.onrender.com/categories/';
    let url = base_url + categoryId + '/products/';
    //console.log(url)
    fetch(url, {
      method: 'GET',
    }).then(response => {
      	if (response.status >= 200 && response.status < 300) {
        	return response.json();
      	} else {
        	console.log("error");
      	}
    }).then(products => {
		// Compile the Handlebars template
        const template = Handlebars.compile(
            document.getElementById('product-template').innerHTML
        );
        // Render the template with the fetched categories
        const html = template({products});
        // Insert the rendered HTML into the page
        document.getElementById('products').innerHTML = html;
    }).catch(error => {
        console.log(error);
    });
}

function fetchSubcategories() {
    let params = new URLSearchParams(window.location.search);
	  let categoryId = params.get('categoryId');
    let base_url = 'http://127.0.0.1:5000/https://wiki-shop.onrender.com/categories/';
    let url = base_url + categoryId + '/subcategories/';
    //console.log(url)
    fetch(url, {
      method: 'GET',
    }).then(response => {
      	if (response.status >= 200 && response.status < 300) {
        	return response.json();
      	} else {
        	console.log("error");
      	}
    }).then(subcategories => {
		// Compile the Handlebars template
        const template = Handlebars.compile(
            document.getElementById('filter-template').innerHTML
        );
        // Render the template with the fetched categories
        const html = template({subcategories});
        // Insert the rendered HTML into the page
        document.getElementById('filter-radio').innerHTML = html;
    }).catch(error => {
        console.log(error);
    });
}


function filterProducts(value) {
	// Get the currently displayed products
	const displayedProducts = document.querySelectorAll('.product');
	console.log(displayedProducts);


	// Check if there are any products on the page
	if (displayedProducts.length === 0) {
		console.error('No product elements found on the page');
		return;
	} 

	// Hide all products
	displayedProducts.forEach(product => product.style.display = 'none');

	if (value === 'all') {
		displayedProducts.forEach(product => product.style.display = 'block');
	} else {
		displayedProducts.forEach(product => {
			console.log(product.dataset.subcategory_id);
			console.log("value:", value);
			if (product.dataset.subcategory_id === value) {
				product.style.display = 'block';
			}
		})
	}
}


fetchSubcategories();
fetchProducts();

