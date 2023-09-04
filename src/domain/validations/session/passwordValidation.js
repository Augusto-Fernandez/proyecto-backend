import z from 'zod';

const passwordValidation = z.object({
    password: z.string().min(4)
})

export default passwordValidation;

