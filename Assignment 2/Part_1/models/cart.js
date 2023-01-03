const User = require("./user");

class Cart {
    constructor(user) {
        this.user = user;
        this.products = [];
    }

    addProduct(product) {
        if (product instanceof Product) {
            this.products.push(product);
            //product.setCart(this);
        } else {
            throw new Error('The item being added to the cart is not a product.');
        }
        
    }

    removeProduct(product) {
        if (product instanceof Product) {
            const index = this.products.indexOf(product);
            if (index !== -1) {
                this.products.splice(index, 1);
                //product.setCart(null);
            } else {
                throw new Error('The item being removed from the cart is not a product.');
            }
        }
    }

    getSize() {
        return { size: this.products.length };
    }
}

//export {Cart}; 
module.exports = Cart;