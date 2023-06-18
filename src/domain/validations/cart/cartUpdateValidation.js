import z from 'zod';

const cartUpdateValidation = z.object({
    products: z.array(),
});

export default cartUpdateValidation;
