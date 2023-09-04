import z from 'zod';

const cartIdValidation = z.object({
    id: z.string().length(24).regex(/^[A-Za-z0-9]+$/),
    cid: z.string().length(24).regex(/^[A-Za-z0-9]+$/)
})

export default cartIdValidation;
