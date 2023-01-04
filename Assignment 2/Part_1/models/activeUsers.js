const User = require("./user");
const Cart = require("./cart");

class activeUsers {
    constructor() {
        this.users = new Map();
        this.carts = new Map();
    }

    addUser(user, sessionId) {
        // Remove any previously active users
        this.users.forEach((value, key) => {
            this.users.delete(key)
        });

        // Add the new user
        this.users.set(user, sessionId);
    }

    removeUser(user) {
        this.users.delete(user);
    }

    // Checks if a specific user is active
    isActive(username, sessionId) {
        for (let [user, userSessionId] of this.users) {
            if (user.username === username && userSessionId === sessionId) {
                return true;
            }
        }
        return false;
    }

    // Checks if no one is active 
    noOneIsActive() {
        return this.users.size === 0; 
    }

    getActiveUser() {
        return this.users.entries().next().value[0];
    }

    getActiveSessionId() {
        return this.users.entries().next().value[1];
    }

    setCart(cart) {
        this.carts.set(this.getActiveUser().username, cart);
    }

    getCart() {
        return this.carts.get(this.getActiveUser().username);
    }
}

module.exports = activeUsers;