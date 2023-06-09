import { z } from "zod";

export const createDealSchema = z.object({
  body: z.object({
    Name: z.string({
        required_error: "Name is required",
    }).min(3).max(50),
    Description: z.string({
        required_error: "Description is required",
    }).min(3).max(255),
    Status: z.string({
        required_error: "Status is required",
    }).min(3).max(50),
    Amount: z.number({
        required_error: "Amount is required",
    }).min(0),
    Currency: z.string({
        required_error: "Currency is required",
    }).min(3).max(50),
  }),
});

export const updateDealSchema = createDealSchema.partial().extend({
  id: z.number({
    required_error: "ID is required",
  }).int().positive(),
});
