class User {
    constructor(username, password) {
        this._username = username;
        this._password = password;
        this._sessionId = null;
    }

    get username() {
        return this._username;
    }

    set username(username) {
        this._username = username;
      }
    
    get password() {
    return this._password;
    }

    set password(password) {
    this._password = password;
    }

    get sessionId() {
    return this._sessionId;
    }

    set sessionId(sessionId) {
    this._sessionId = sessionId;
    }
}

module.exports = User; 