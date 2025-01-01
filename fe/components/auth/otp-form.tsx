"use client";
import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifyOTP } from "@/schemas";
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
import { resendVerificationFn } from "@/actions/resend-verification";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const OtpForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams()

    const email = searchParams.get('email')
    const [error, setError] = useState<string|undefined>("");
    const [success, setSuccess] = useState<string|undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof VerifyOTP>>({
        resolver: zodResolver(VerifyOTP),
        defaultValues: {
            email: email || "",
            verifycode: ""
        },
    });
    
    const onSubmit = (values: z.infer<typeof VerifyOTP>) => {
        setError("");
        setSuccess("");
        startTransition( async () => {
            // const res = await otpVerifyFn(values)
            // if(res?.error) setError(res.error)
            // if(res?.success){
            //     setSuccess(res.success)
            //     console.log(res.data);
            // }
            const result = await signIn("credentials", {
                email: values.email,
                otp: values.verifycode,
                redirect: false,
            });
        
            if (result?.ok) {
                console.log("asd",result);
                router.push("/auth/otp"); // Redirect to dashboard after successful login
            } else {
                setError(result?.error || "An error occurred");
            }
        });
    }

    const reSendClicked = () => {
        setError("");
        setSuccess("");
        startTransition( async () => {
            const data = await resendVerificationFn(form.getValues('email'))
            if(data?.error) setError(data.error)
            if(data?.success){
                setSuccess(data.success)
                console.log(data.data);
            }
        });
        
    }
        
    return (
        <CardWrapper
            headerLabel='Enter your verification code below!'
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
            isResend={<Button
                variant="link"
                className="font-normal" 
                type="button"
                size={"sm"}
                onClick={reSendClicked}
            >
                Re-send
            </Button>}
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
                        {/* <FormField
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
                        /> */}
                        <FormField
                            control={form.control}
                            name="verifycode"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Verify Code</FormLabel>
                                    <FormControl>
                                    <InputOTP {...field} maxLength={6}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                    </InputOTP>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormError message={error}/>
                    <FormSuccess message={success}/>
                    <Button
                        disabled={isPending}
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