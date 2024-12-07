import { z as zod } from 'zod'

export const SignUpSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8),
})