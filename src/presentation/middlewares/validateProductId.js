import idValidation from "../../domain/validations/shared/idValidation.js";

const validateProductId = async (req, res, next) =>{
    await idValidation.parseAsync(req.params);

    next();
}

export default validateProductId;