import z from 'zod';

const loginValidation = z.object({
    email: z.string().email(),
    password: z
});

export default loginValidation;