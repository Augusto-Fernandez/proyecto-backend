import z from 'zod';

const roleIdValidation = z.object({
    id: z.string().length(24).regex(/^[A-Za-z0-9]+$/),
    rid: z.string().length(24).regex(/^[A-Za-z0-9]+$/)
});

export default roleIdValidation;