import { z as zod } from 'zod';

export const SignUpSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(8),
});

export const AddressSchema = zod.object({
  lineOne: zod.string(),
  lineTwo: zod.string().optional(),
  city: zod.string(),
  country: zod.string(),
  pincode: zod.string().length(6),
  userId: zod.number(),
});

export const updateUserSchema = zod.object({
  name: zod.string().optional(),
  defaultShippingAddressId: zod.number().optional(),
  defaultBillingAddressId: zod.number().optional(),
});
