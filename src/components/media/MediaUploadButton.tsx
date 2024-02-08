"use client"

import React from 'react';
import {useModal} from "@/providers/ModalProvider";
import {Button} from "@/components/ui/button";
import CustomModal from "@/components/global/CustomModal";
import UploadMediaForm from "@/components/forms/UploadMedia";

interface MediaUploadButtonProps {
    subaccountId: string
}

const MediaUploadButton = ({ subaccountId }: MediaUploadButtonProps) => {
    const { isOpen, setOpen, setClose } = useModal()

    return (
        <Button
            onClick={() => {
                setOpen(
                    <CustomModal
                        title="Upload Media"
                        subheading="Upload a file to your media bucket"
                    >
                        <UploadMediaForm subaccountId={subaccountId}></UploadMediaForm>
                    </CustomModal>
                )
            }}
        >
            Upload
        </Button>
    )
}

export default MediaUploadButton;