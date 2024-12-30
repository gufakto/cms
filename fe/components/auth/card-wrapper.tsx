"use client";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
    isResend?: React.ReactNode;
}

import React, { FC } from 'react'
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader
 } from '@/components/ui/card';
 import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import { BackButton } from '@/components/auth/back-button';

const CardWrapper: FC<CardWrapperProps> = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
    isResend
}) => {
  return (
    <Card className="w-[400px] shadow-md">
        <CardHeader>
            <Header label={headerLabel}/>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
        {showSocial && (
            <CardFooter>
                <Social/>
            </CardFooter>
        )}
        <CardFooter className='flex justify-between'>
            <BackButton
                label={backButtonLabel}
                href={backButtonHref}
            />
            {isResend}
            
        </CardFooter>
    </Card>
  )
}

export default CardWrapper;