import z from 'zod';

const cartZodSchema = z.object({
    id: z.string().length(24).regex(/^[A-Za-z0-9]+$/),
    quantity: z.number().int().max(999),
});

export default cartZodSchema;