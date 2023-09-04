import idValidation from "../../domain/validations/shared/idValidation.js";

const validateIdParam = async (req, res, next) =>{
    await idValidation.parseAsync(req.params);

    next();
}

export default validateIdParam;
