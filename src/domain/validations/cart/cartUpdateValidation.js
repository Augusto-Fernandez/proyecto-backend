import z from 'zod';
import cartZodSchema from './cartZodSchema.js';

const cartUpdateValidation = z.object({
    products: z.array(cartZodSchema)
})

export default cartUpdateValidation;
