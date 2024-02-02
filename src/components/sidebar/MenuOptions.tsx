"use client"

import {
    AgencySidebarOption,
    SubAccount,
    SubAccountSidebarOption
} from "@prisma/client";
import {useEffect, useMemo, useState} from "react";
import {Sheet, SheetTrigger} from "@/components/ui/sheet";

interface MenuOptionsProps {
    defaultOpen?: boolean
    subAccounts: SubAccount[]
    sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[]
    sidebarLogo: string
    details: any
    user: any
    id: string
}

const MenuOptions = ({defaultOpen, subAccounts, sidebarOpt, sidebarLogo, details, user, id}: MenuOptionsProps) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const openState = useMemo(
        () => (defaultOpen?{open:true} : {}),
        [defaultOpen]
    )

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return

    return (
        <Sheet
            modal={false}
            {...openState}
        >
            <SheetTrigger
                asChild
                className={"absolute left-4 top-4 z-[100] md:!hidden flex"}
            >

            </SheetTrigger>
        </Sheet>
    );
};

export default MenuOptions;