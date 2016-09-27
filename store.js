"use strict";

function statement(customer, movies) {

    function getMovie(rental) {
        return movies[rental.movieID];
    }

    function getAmount(rental) {
        let thisAmount = 0;

        let movie = getMovie(rental);

        // determine amount for each movie
        switch (movie.code) {
            case "regular":
                thisAmount = 2;
                if (rental.days > 2) {
                    thisAmount += (rental.days - 2) * 1.5;
                }
                break;
            case "new":
                thisAmount = rental.days * 3;
                break;
            case "childrens":
                thisAmount = 1.5;
                if (rental.days > 3) {
                    thisAmount += (rental.days - 3) * 1.5;
                }
                break;
        }
        return thisAmount;
    }

    function getMovieBonusPoints(rental, movie) {
        // add bonus for a two day new release rental
        if (movie.code === "new" && rental.days > 2)
            return 2;
        else
            return 1;
    }

    function getTotalAmount() {
        let totalAmount = 0;
        for (let rental of customer.rentals) {
            var amount = getAmount(rental);

            totalAmount += amount;
        }
        return totalAmount;
    }

    function getTotalBonusPoints() {
        let totalBonusPoints = 0;
        for (let rental of customer.rentals) {
            let movie = getMovie(rental);

            //add frequent renter points
            totalBonusPoints += getMovieBonusPoints(rental, movie);
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
    // add footer lines
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