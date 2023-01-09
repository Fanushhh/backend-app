// Un middleware este un request aflat in "mijloc" adica tu vii din frontned
// sau din backend si faci un request GET/POST/PUT/DELETE catre server
// ei bine middleware, inainte ca serverul sa primeasca requestul el
// se uita la request, si verifica daca acesta arunca vreo eroare

const errorHandler = (err, req, res, next) => {
    console.log(err);
    console.log(req);
    console.log(res);

    res.status(500);

    res.json({
        error: err.message,
        stack: err.stack
    })

    next()
}

module.exports = errorHandler