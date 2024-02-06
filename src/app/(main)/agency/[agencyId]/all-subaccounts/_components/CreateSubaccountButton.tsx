"use client"

import React from 'react';
import {User, Agency, SubAccount, AgencySidebarOption} from "@prisma/client";
import {useModal} from "@/providers/ModalProvider";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import CustomModal from "@/components/global/CustomModal";
import SubAccountDetails from "@/components/forms/SubaccountDetails";
import {PlusCircleIcon} from "lucide-react";

interface CreateSubaccountButtonProps {
    user: User & {
        Agency:
            | (
            | Agency
            | (null & {
            SubAccount: SubAccount[]
            SideBarOption: AgencySidebarOption[]
        })
            )
            | null
    }
    id: string
    className: string
}

const CreateSubaccountButton = ({user, id, className}: CreateSubaccountButtonProps) => {
    const {setOpen} = useModal()
    const agencyDetails = user.Agency

    if(!agencyDetails) return

    return (
        <Button
            className={cn("w-full flex gap-4", className)}
            onClick={() => {
                setOpen(
                    <CustomModal
                        title={"Create a Subaccount"}
                        subheading={"You can switch between subaccount"}
                    >
                        <SubAccountDetails
                            agencyDetails={agencyDetails}
                            userId={user.id}
                            userName={user.name}
                        />
                    </CustomModal>
                )
            }}
        >
            <PlusCircleIcon size={15} />
            Create Sub Account
        </Button>
    );
};

export default CreateSubaccountButton;