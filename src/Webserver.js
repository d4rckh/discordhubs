const express = require('express')

class Webserver {
    constructor({port}) {
        this.port = port
        this.app = express()
        this.app.set('view engine', 'ejs');
    }

    init() {
        return new Promise((resolve, reject) => {
            this.app.listen(this.port, 'localhost', () => {
                resolve(this)
            })
        })
    }
}

module.exports = Webserver