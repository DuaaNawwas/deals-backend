import { z } from "zod";

const claimDealSchema = z.object({
        Deal_ID: z.number({
            required_error: "Deal_ID is required",
        }).int().positive(),
        User_ID: z.number({
            required_error: "User_ID is required",
        }).int().positive(),
});

export default claimDealSchema;