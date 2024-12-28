"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, VerifyOTP } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import CardWrapper from '@/components/auth/card-wrapper';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useSearchParams } from "next/navigation";
// import { otpVerifyFn } from "@/actions/otp";

const OtpForm = () => {
    const searchParams = useSearchParams()

    const email = searchParams.get('email')
    const [error, setError] = useState<string|undefined>("");
    const [success, setSuccess] = useState<string|undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof VerifyOTP>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            verifycode: ""
        },
    });

    const onSubmit = (values: z.infer<typeof VerifyOTP>) => {
        console.log("FDFD", values)
        setError("");
        setSuccess("");
        // startTransition( async () => {
        //     const res = await otpVerifyFn(values)
        //     if(res?.error) setError(res.error)
        //     if(res?.success){
        //         setSuccess(res.success)
        //         console.log(res.data);
        //     }
        // });
    }
        
    return (
        <CardWrapper
            headerLabel='Enter your verification code below!'
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <Form {...form }>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field} 
                                            disabled={isPending}
                                            placeholder="john.doe@example.com"
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="verifycode"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Verify Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field} 
                                            disabled={isPending}
                                            placeholder="Please enter your code here!"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                        // disabled={isPending}
                        type="submit"
                        className="w-full"
                    >
                        Next
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default OtpForm;