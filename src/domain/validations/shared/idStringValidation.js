import z from 'zod';

const idStringValidation = z.string().length(24).regex(/^[A-Za-z0-9]+$/);

export default idStringValidation;