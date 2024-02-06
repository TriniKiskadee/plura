import React from 'react';
import {getAuthUserDetails} from "@/lib/queries";
import MenuOptions from "@/components/sidebar/MenuOptions";
import {SubAccount} from "@prisma/client";

interface SidebarProps {
    id: string,
    type: "agency" | "subaccount"
}

const Sidebar = async ({id, type}: SidebarProps) => {
    const user = await getAuthUserDetails()
    if(!user) return null
    if(!user.Agency) return

    const details = type === "agency"
        ? user?.Agency
        : user?.Agency.SubAccount.find((subaccount: SubAccount) => subaccount.id === id)

    const isWhiteLabeledAgency = user.Agency.whiteLabel

    if(!details) return

    let sideBarLogo = user.Agency.agencyLogo || "/assets/plural-logo.svg"

    if(!isWhiteLabeledAgency){
        if(type === "subaccount"){
            sideBarLogo = user?.Agency.SubAccount.find((subaccount: SubAccount) => subaccount.id === id)
                ?.subAccountLogo || user.Agency.agencyLogo
        }
    }

    const sidebarOpt = type === "agency"
        ? user.Agency.SidebarOption || []
        : user.Agency.subAccount.find((subaccount: SubAccount) => subaccount.id === id)
            ?.SidebarOption || []

    const subaccounts = user.Agency.SubAccount.filter(
        (subaccount: SubAccount) => user.Permissions.find(
            (permission: any) => permission.subAccountId === subaccount.id && permission.access
        )
    )

    return (
        <>
            <MenuOptions
                defaultOpen={true}
                subAccounts={subaccounts}
                sidebarOpt={sidebarOpt}
                sidebarLogo={sideBarLogo}
                details={details}
                user={user}
                id={id}
            />
            <MenuOptions
                subAccounts={subaccounts}
                sidebarOpt={sidebarOpt}
                sidebarLogo={sideBarLogo}
                details={details}
                user={user}
                id={id}
            />
        </>
    );
};

export default Sidebar;