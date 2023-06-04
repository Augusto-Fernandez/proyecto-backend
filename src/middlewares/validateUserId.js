import idValidation from "../validations/shared/idValidation.js";

/* hacer una validacion de zod nueva acá que reciba solamente letras y numeros */

const validateUserId = async (req, res, next) =>{
    await idValidation.parseAsync(req.params);

    next();
}

export default validateUserId;