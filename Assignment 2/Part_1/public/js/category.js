function fetchProducts() {
	let params = new URLSearchParams(window.location.search);
	let categoryId = params.get('categoryId');
    let base_url = 'http://127.0.0.1:5000/https://wiki-shop.onrender.com/categories/';
    let url = base_url + categoryId + '/products/';

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
			if (product.dataset.subcategory_id === value) {
				product.style.display = 'block';
			}
		})
	}
}

function LS(event) {
	// Prevent the default form submission behavior
	// xwris auto tha se petaksei se ena keno page me to sessionId h me error mhnuma *na doume ti apta 2 theloume h pws prepei na ginei*
	event.preventDefault();

	const form = document.getElementById('login-form');
	const formData = new FormData(form);
	const username = formData.get('username');
	const password = formData.get('password');

	// Send a POST request to the '/category.html' route
	fetch('/category.html', {
		method: 'POST',
		body: JSON.stringify({ username, password }),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.json();
		} else {
			throw new Error('Failed to login');
		}
	})
	.then(data => {
		// Logs the sessionId e.g. { sessionId: "7b3e2313-8553-4cba-88d3-7d3dfd9020b0" }
		console.log(data); 

		// Display a successful login message
		const messageSection = document.getElementById('message');
		messageSection.innerHTML = 'Successful login';
		messageSection.classList.add('success');
	}).catch(error => {
		console.log(error);

		// Display a failed login message
		const messageSection = document.getElementById('message');
		messageSection.innerHTML = 'Failed to login';
		messageSection.classList.add('error');
	});
}


fetchSubcategories();
fetchProducts();

