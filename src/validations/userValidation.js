import z from 'zod';

const userValidation = z.object({
  firstName: z.string().min(4).max(35),
  lastName: z.string().min(4).max(35),
  email: z.string().email(),
  age: z.number(),
});

export default userValidation;