"use client";
import React, { FC } from 'react'
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import CardWrapper from './card-wrapper';

interface VerificationProps {
    success: string;
    error?: undefined;
}

export const Verification: FC<VerificationProps> = ({success, error}) => {
    
    return (
        <CardWrapper
            headerLabel='Verify your account'
            backButtonLabel="back to login page"
            backButtonHref="/auth/login"
        >
            <FormError message={error} />
            <FormSuccess message={success}/>
        </CardWrapper>
    )
}
