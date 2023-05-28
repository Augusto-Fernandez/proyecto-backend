import z from 'zod';

const idValidation = z.object({
  id: z.string().min(24).max(24)
});

export default idValidation;