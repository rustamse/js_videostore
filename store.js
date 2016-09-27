"use strict";

function statement(customer, movies) {
    let totalAmount = 0;
    let totalBonusPoints = 0;
    let result = `Rental Record for ${customer.name}\n`;

    function getMovie(rental) {
        return movies[rental.movieID];
    }

    function getMovieAmount(rental, movie) {
        let thisAmount = 0;

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

    for (let rental of customer.rentals) {
        let movie = getMovie(rental);
        var amount = getMovieAmount(rental, movie);

        //add frequent renter points
        totalBonusPoints += getMovieBonusPoints(rental, movie);

        //print figures for this rental
        result += `\t${movie.title}\t${amount}\n`;
        totalAmount += amount;
    }
    // add footer lines
    result += `Amount owed is ${totalAmount}\n`;
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