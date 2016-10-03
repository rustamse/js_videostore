"use strict";

class Customer {
    constructor(info, movies) {
        this._info = info;
        this._movies = movies;
    }

    get name() {
        return this._info.name;
    }

    get rentals() {
        return this._info.rentals.map(r => new Rental(r, this._movies));
    }

    get totalAmount() {
        return this.rentals.reduce((totalAmount, rental) => totalAmount + rental.amount, 0);
    }

    get totalBonusPoints() {
        return this.rentals.reduce((totalBonusPoints, rental) => totalBonusPoints + rental.bonusPoints, 0);
    }
}

class Rental {
    constructor(info, movies) {
        this._info = info;
        this._movies = movies;
    }

    get movieID() {
        return this._info.movieID;
    }

    get days() {
        return this._info.days;
    }

    get movie() {
        return this._movies[this.movieID];
    }

    get amount() {
        var amount = 0;

        // determine amount for each movie
        switch (this.movie.code) {
            case "regular":
                amount = 2;
                if (this.days > 2) {
                    amount += (this.days - 2) * 1.5;
                }
                break;
            case "new":
                amount = this.days * 3;
                break;
            case "childrens":
                amount = 1.5;
                if (this.days > 3) {
                    amount += (this.days - 3) * 1.5;
                }
                break;
        }
        return amount;
    }

    get bonusPoints() {
        if (this.movie.code === "new" && this.days > 2)
            return 2;
        else
            return 1;
    }
}

function statement(customer) {
    var result = `Rental Record for ${customer.name}\n`;

    for (var rental of customer.rentals) {
        result += `\t${rental.movie.title}\t${rental.amount}\n`;
    }

    result += `Amount owed is ${customer.totalAmount}\n`;
    result += `You earned ${customer.totalBonusPoints} frequent renter points\n`;

    return result;
}

var customerInfo = {
    name: "martin",
    rentals: [{
        "movieID": "F001",
        "days": 3
    }, {
        "movieID": "F002",
        "days": 1
    },]
};

var movies = {
    "F001": {
        "title": "Ran",
        "code": "regular"
    },
    "F002": {
        "title": "Trois Couleurs: Bleu",
        "code": "regular"
    },
    // etc
};

var customer = new Customer(customerInfo, movies);

console.log(statement(customer));