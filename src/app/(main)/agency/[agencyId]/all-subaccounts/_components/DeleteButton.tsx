"use client"

import React from 'react';
import {useRouter} from "next/navigation";
import {deleteSubAccount, getSubAccountDetails, saveActivityLogsNotification} from "@/lib/queries";

interface DeleteButtonProps {
    subaccountId: string
}

const DeleteButton = ({subaccountId}: DeleteButtonProps) => {
    const router = useRouter()

    return (
        <div onClick={async () => {
            const response = await getSubAccountDetails(subaccountId)
            await saveActivityLogsNotification({
                agencyId:undefined,
                description: `Deleted a subaccount | ${response.name}`,
                subaccountId
            })
            await deleteSubAccount(subaccountId)
            router.refresh()
        }}>
            Delete Sub Account
        </div>
    );
};

export default DeleteButton;