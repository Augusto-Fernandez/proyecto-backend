import idValidation from "../validations/idValidation.js";

const validateUserId = async (req, res, next) =>
{
    await idValidation.parseAsync(req.params);

    next();
}

export default validateUserId;