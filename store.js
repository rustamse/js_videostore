"use strict";

function statement(customer, movies) {

    function getMovie(rental) {
        return movies[rental.movieID];
    }

    function getAmount(rental) {
        let movie = getMovie(rental);

        let amount = 0;

        // determine amount for each movie
        switch (movie.code) {
            case "regular":
                amount = 2;
                if (rental.days > 2) {
                    amount += (rental.days - 2) * 1.5;
                }
                break;
            case "new":
                amount = rental.days * 3;
                break;
            case "childrens":
                amount = 1.5;
                if (rental.days > 3) {
                    amount += (rental.days - 3) * 1.5;
                }
                break;
        }
        return amount;
    }

    function getMovieBonusPoints(rental) {
        let movie = getMovie(rental);

        if (movie.code === "new" && rental.days > 2)
            return 2;
        else
            return 1;
    }

    function getTotalAmount() {
        let totalAmount = 0;
        for (let rental of customer.rentals) {
            totalAmount += getAmount(rental);
        }
        return totalAmount;
    }

    function getTotalBonusPoints() {
        let totalBonusPoints = 0;
        for (let rental of customer.rentals) {
            totalBonusPoints += getMovieBonusPoints(rental);
        }
        return totalBonusPoints;
    }

    let result = `Rental Record for ${customer.name}\n`;

    for (let rental of customer.rentals) {
        let movie = getMovie(rental);
        var amount = getAmount(rental);

        result += `\t${movie.title}\t${amount}\n`;
    }

    var totalAmount = getTotalAmount();
    result += `Amount owed is ${totalAmount}\n`;

    var totalBonusPoints = getTotalBonusPoints();
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