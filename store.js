"use strict";

class Customer {
    constructor(info) {
        this._info = info;
    }

    get name() {
        return this._info.name;
    }

    get rentals() {
        return this._info.rentals.map(r => new Rental(r));
    }

    getTotalAmount(movies) {
        var totalAmount = 0;
        for (var rental of this.rentals) {
            totalAmount += rental.getAmount(movies);
        }
        return totalAmount;
    }

    getTotalBonusPoints(movies) {
        var totalBonusPoints = 0;
        for (var rental of this.rentals) {
            totalBonusPoints += rental.getMovieBonusPoints(movies);
        }
        return totalBonusPoints;
    }
}

class Rental {
    constructor(info) {
        this._info = info;
    }

    get movieID() {
        return this._info.movieID;
    }

    get days() {
        return this._info.days;
    }

    getMovie(movies) {
        return movies[this.movieID];
    }

    getAmount(movies) {
        var movie = this.getMovie(movies);

        var amount = 0;

        // determine amount for each movie
        switch (movie.code) {
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

    getMovieBonusPoints(movies) {
        let movie = this.getMovie(movies);

        if (movie.code === "new" && this.days > 2)
            return 2;
        else
            return 1;
    }

}

function statement(customerInfo, movies) {

    var customer = new Customer(customerInfo);

    var result = `Rental Record for ${customer.name}\n`;

    for (var rental of customer.rentals) {
        var movie = rental.getMovie(movies);
        var amount = rental.getAmount(movies);

        result += `\t${movie.title}\t${amount}\n`;
    }

    var totalAmount = customer.getTotalAmount(movies);
    result += `Amount owed is ${totalAmount}\n`;

    var totalBonusPoints = customer.getTotalBonusPoints(movies);
    result += `You earned ${totalBonusPoints} frequent renter points\n`;

    return result;
}

let customer = {
    name: "martin",
    rentals: [{
        "movieID": "F001",
        "days": 3
    }, {
        "movieID": "F002",
        "days": 1
    },]
};

let movies = {
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

console.log(statement(customer, movies));