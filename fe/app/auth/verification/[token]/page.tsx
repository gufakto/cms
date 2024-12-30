import { verificationFn } from '@/actions/verification';
import { Verification } from '@/components/auth/verification'
import React from 'react'

const VerificationToken = async ({ params }: { params: Promise<{ token: string }> }) => {
    const token = (await params).token;
    const data = await verificationFn(token);
    return (
        <Verification success={data.success} error={data.error} />
    )
}

export default VerificationToken