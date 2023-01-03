//import { Cart } from "../../models/cart";
//import { Product } from "../../models/product";
//import { User } from "../../models/user";

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

		// Create product objects maybe?

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

	console.log("here!!");
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

const form = document.getElementById('login-form');
form.addEventListener('submit', LS);

// Login Service - LS
function LS(event) {
	// Prevent the default form submission behavior
	event.preventDefault();
	
	const formData = new FormData(form);
	const username = formData.get('username');
	const password = formData.get('password');

	// Send a POST request to the '/LoginService' route
	fetch('http://127.0.0.1:8080/LoginService', {
		method: 'POST',
		body: JSON.stringify({ username, password }),
		headers: {
			'Content-Type': 'application/json',
			 Accept: "application/json",
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

const cisForm = document.getElementById('buy-form');
form.addEventListener('submit', CIS);

// Cart Item Service - CIS
function CIS(event) {
	// Prevent the default form submission behavior
	event.preventDefault();

	// Retrieve product's information 
	
	const productElement = document.getElementsByClassName('product')[0];

	const image = productElement.children[0].getAttribute('data-value');
	const title = productElement.children[1].dataset.value;
	const productId = productElement.children[2].dataset.value;
	const subcategoryId = productElement.children[3].dataset.value;
	const description = productElement.children[4].dataset.value;
	const cost = productElement.children[5].dataset.value;

	// Retrieve user's information
	//const username = ??
	//const sessionId = ??
	
	//console.log(username);
	//console.log(sessionId);
	console.log(title);
	console.log(cost);
	console.log(productId);
	console.log(description);
	console.log(image);
	console.log(subcategoryId);

	// Send a POST request to the '/CIS' route
	fetch('http://127.0.0.1:8080/CIS', {
		method: 'POST',
		body: JSON.stringify({ username, sessionId, productId, title, subcategoryId, description, cost, image }),
		headers: {
			'Content-Type': 'application/json',
			 Accept: "application/json",
		}
	})
	.then(response => {
		if (response.status >= 200 && response.status < 300) {
			return response.json();
		} else {
			throw new Error('Failed to add product to Cart');
		}
	})
	.then(data => {
		// Logs 
		console.log(data); 

		// Display a successful login message
		const messageSection = document.getElementById('cart-msg');
		messageSection.innerHTML = 'Product added to your Cart';
		messageSection.classList.add('success');
	}).catch(error => {
		console.log(error);

		// Display a failed login message
		const messageSection = document.getElementById('cart-msg');
		messageSection.innerHTML = 'Failed to add product to your Cart';
		messageSection.classList.add('error');
	});
}

fetchSubcategories();
fetchProducts();
