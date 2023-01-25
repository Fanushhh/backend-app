// Un middleware este un request aflat in "mijloc" adica tu vii din frontned
// sau din backend si faci un request GET/POST/PUT/DELETE catre server
// ei bine middleware, inainte ca serverul sa primeasca requestul el
// se uita la request, si verifica daca acesta arunca vreo eroare

const AlreadyExistsException = require("../exceptions/already-exists-exception");
const InactiveUserException = require("../exceptions/inactive-user-exception");
const MissingFieldException = require("../exceptions/missing-field-exception");

const errorMiddleware = (err, req, res, next) => {
    // console.log(err);
    // console.log(req);
    // console.log(res);

    statusCode = 500;

    if(err instanceof InactiveUserException){
        statusCode = 401;
    }

    if(err instanceof AlreadyExistsException){
        statusCode = 409;
    }

    if(err instanceof MissingFieldException){
        statusCode = 422;
    }

    res.status(statusCode);

    res.json({
        error: err.message,
        stack: err.stack
    })

    next();
}

module.exports = errorMiddleware;