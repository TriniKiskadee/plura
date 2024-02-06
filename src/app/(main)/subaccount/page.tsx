import React from 'react';
import {getAuthUserDetails, verifyAndAcceptInvitation} from "@/lib/queries";
import Unauthorized from "@/components/unauthorized";
import {redirect} from "next/navigation";

interface SubAccountPageProps {
    searchParams: {
        state: string
        code: string
    }
}

const Page = async ({searchParams}: SubAccountPageProps) => {
    const agencyId = await verifyAndAcceptInvitation()
    if(!agencyId) return <Unauthorized />

    const user = await getAuthUserDetails()
    if(!user) return

    const getFirstSubAccountWithAccess = user.Permissions.find((permission: any) => permission.access === "true")

    if(searchParams.state) {
        const statePath = searchParams.state.split("___")[0]
        const stateSubaccountId = searchParams.state.split("___")[1]
        if(!stateSubaccountId) return <Unauthorized />
        return redirect(`/subaccount/${stateSubaccountId}/${statePath}?code=${searchParams.code}`)
    }

    if(getFirstSubAccountWithAccess) {
        return redirect(`/subaccount/${getFirstSubAccountWithAccess.subAccountId}`)
    }


    return <Unauthorized />
};

export default Page;