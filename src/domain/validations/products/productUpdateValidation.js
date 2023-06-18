import z from "zod";
import idValidation from "../shared/idValidation.js";
import productCreateValidation from "./productCreateValidation.js";

const productUpdateValidation = z.union([
    idValidation,
    productCreateValidation
])

export default productUpdateValidation;