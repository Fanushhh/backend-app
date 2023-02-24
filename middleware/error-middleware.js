// Un middleware este un request aflat in "mijloc" adica tu vii din frontned
// sau din backend si faci un request GET/POST/PUT/DELETE catre server
// ei bine middleware, inainte ca serverul sa primeasca requestul el
// se uita la request, si verifica daca acesta arunca vreo eroare
import { AlreadyExistsException } from "../exceptions/already-exists-exception.js";
import {InactiveUserException} from "../exceptions/inactive-user-exception.js";
import {MissingFieldException} from "../exceptions/missing-field-exception.js";


export const errorMiddleware = (err, _req, res, next) => {
  // console.log(err);
  // console.log(req);
  // console.log(res);

  const statusCode = 500;

  if (err instanceof InactiveUserException) {
    statusCode = 401;
  }

  if (err instanceof AlreadyExistsException) {
    statusCode = 409;
  }

  if (err instanceof MissingFieldException) {
    statusCode = 422;
  }

  res.status(statusCode);

  res.json({
    error: err.message,
    stack: err.stack,
  });

  next();
};
