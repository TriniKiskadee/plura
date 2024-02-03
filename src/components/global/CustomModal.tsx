"use client"

import React from 'react';
import {useModal} from "@/providers/ModalProvider";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";

interface CustomModalProps {
    title: string
    subheading: string
    children: React.ReactNode
    defaultOpen?: boolean
}

const CustomModal = ({title, subheading, children, defaultOpen}: CustomModalProps) => {
    const {isOpen, setClose} = useModal()

    return (
        <Dialog
            open={isOpen || defaultOpen}
            onOpenChange={setClose}
        >
            <DialogContent className={"overflow-scroll md:max-h-[700px] md:h-fit h-screen bg-card"}>
                <DialogHeader className={"pt-8 text-left"}>
                    <DialogTitle className={"text-2xl font-bold"}>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {subheading}
                    </DialogDescription>
                    {children}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CustomModal;