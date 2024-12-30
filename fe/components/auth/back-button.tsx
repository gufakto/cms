"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

interface BackButtonProps {
    href: string;
    label: string;
}

export const BackButton: FC<BackButtonProps> = ({ href, label }) => {

    return (
        <Button variant={"link"} className="font-normal" size={"sm"} asChild>
            <Link href={href}>{label}</Link>
        </Button>
    )
}