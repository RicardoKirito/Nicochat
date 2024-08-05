import { z } from "zod";

export const registerSchema= z.object({
    username: z.string({
        required_error: "Username is required"
    }), 
    email: z.string({
        required_error: "The Email is required"
    }).email({
        message: "Invalid Email"
    }), 
    password: z.string({
        required_error: "Password is required"
    }).min(6, {
        message: "Password must be at least 6 characters"
    })
})
export const loginSchema = z.object({
    username: z.string({
        required_error: "Username is requiered"
    }), 
    password: z.string({
        required_error: "Password is required"
    })

})

export const passwordchange = z.object({
    id: z.string({
        required_error: "The id was not provided"
    }),
    current: z.string({
        required_error: "The current password is required"
    }), 
    newP: z.string({
        required_error: "Please enter the new password"
    }).min(6,({
        message: "Password must be at least 6 characters"
    }))
})