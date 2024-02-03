"use client"

import {
    Agency,
    AgencySidebarOption,
    SubAccount,
    SubAccountSidebarOption
} from "@prisma/client";
import {useEffect, useMemo, useState} from "react";
import {Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {ChevronsUpDown, Compass, Menu, PlusCircleIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import Image from "next/image";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import Link from "next/link";
import {useModal} from "@/providers/ModalProvider";
import CustomModal from "@/components/global/CustomModal";
import SubAccountDetails from "@/components/forms/SubaccountDetails";
import {Separator} from "@/components/ui/separator";
import {icons} from "@/lib/constants";

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
    const {setOpen} = useModal()
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const openState = useMemo(
        () => (defaultOpen ? {open:true} : {}),
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
                <Button
                    variant={"outline"}
                    size={"icon"}
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent
                showX={!defaultOpen}
                side={"left"}
                className={cn("bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6", {
                    "hidden md:inline-block z-0 w-[300px]": defaultOpen,
                    "inline-block md:hidden z-[100] w-full": !defaultOpen
                })}
            >
                <div>
                    <AspectRatio ratio={16/5}>
                        <Image
                            src={sidebarLogo}
                            alt={"Sidebar Logo"}
                            fill
                            className={"rounded-md object-contain"}
                        />
                    </AspectRatio>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className={"w-full my-4 flex items-center justify-between py-8"}
                                variant={"ghost"}
                            >
                                <div className={"flex items-center text-left gap-2"}>
                                    <Compass />
                                    <div className={"flex flex-col"}>
                                        {details.name}
                                        <span className={"text-muted-foreground"}>
                                            {details.address}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <ChevronsUpDown
                                        size={16}
                                        className={"text-muted-foreground"}
                                    />
                                </div>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className={"w-80 h-80 mt-4 z-[200]"}>
                            <Command className={"rounded-lg"}>
                                <CommandInput placeholder={"Search Accounts..."} />
                                <CommandList className={"pb-16"}>
                                    <CommandEmpty>No Results Found</CommandEmpty>
                                    {
                                        (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN")
                                        && user?.Agency && (
                                            <CommandGroup
                                                heading={"Agency"}
                                            >
                                                <CommandItem className={"!bg-transparent my-2 text-primary border-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all"}>
                                                    {
                                                        defaultOpen
                                                            ? (
                                                                <Link
                                                                    href={`/agency/${user?.agency?.id}`}
                                                                    className={"flex gap-4 w-full h-full"}
                                                                >
                                                                    <div className={"relative w-16"}>
                                                                        <Image
                                                                            src={user?.Agency?.agencyLogo}
                                                                            alt={"Agency Logo"}
                                                                            fill
                                                                            className={"rounded-md object-contain"}
                                                                        />
                                                                    </div>
                                                                    <div className={"flex flex-col flex-1"}>
                                                                        {user?.Agency?.name}
                                                                        <span>{user?.Agency?.address}</span>
                                                                    </div>
                                                                </Link>
                                                            ) : (
                                                                <SheetClose asChild>
                                                                    <Link
                                                                        href={`/agency/${user?.agency?.id}`}
                                                                        className={"flex gap-4 w-full h-full"}
                                                                    >
                                                                        <div className={"relative w-16"}>
                                                                            <Image
                                                                                src={user?.Agency?.agencyLogo}
                                                                                alt={"Agency Logo"}
                                                                                fill
                                                                                className={"rounded-md object-contain"}
                                                                            />
                                                                        </div>
                                                                        <div className={"flex flex-col flex-1"}>
                                                                            {user?.Agency?.name}
                                                                            <span>{user?.Agency?.address}</span>
                                                                        </div>
                                                                    </Link>
                                                                </SheetClose>
                                                            )
                                                    }
                                                </CommandItem>
                                            </CommandGroup>
                                        )
                                    }
                                    <CommandGroup heading={"Accounts"}>
                                        {!!subAccounts
                                            ? subAccounts.map((subaccount) => (
                                                <CommandItem key={subaccount.id}>
                                                    defaultOpen
                                                    ? (
                                                    <Link
                                                        href={`/subaccount/${subaccount.id}`}
                                                        className={"flex gap-4 w-full h-full"}
                                                    >
                                                        <div className={"relative w-16"}>
                                                            <Image
                                                                src={subaccount.subAccountLogo}
                                                                alt={"Subaccount Logo"}
                                                                fill
                                                                className={"rounded-md object-contain"}
                                                            />
                                                        </div>
                                                        <div className={"flex flex-col flex-1"}>
                                                            {subaccount.name}
                                                            <span>{subaccount.address}</span>
                                                        </div>
                                                    </Link>
                                                    ) : (
                                                    <SheetClose asChild>
                                                        <Link
                                                            href={`/subaccount/${subaccount.id}`}
                                                            className={"flex gap-4 w-full h-full"}
                                                        >
                                                            <div className={"relative w-16"}>
                                                                <Image
                                                                    src={subaccount.subAccountLogo}
                                                                    alt={"Subaccount Logo"}
                                                                    fill
                                                                    className={"rounded-md object-contain"}
                                                                />
                                                            </div>
                                                            <div className={"flex flex-col flex-1"}>
                                                                {subaccount.name}
                                                                <span>{subaccount.address}</span>
                                                            </div>
                                                        </Link>
                                                    </SheetClose>
                                                    )
                                                </CommandItem>
                                            )) : (
                                                "No Accounts"
                                            )
                                        }
                                    </CommandGroup>
                                </CommandList>
                                {(user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") && (
                                    <SheetClose>
                                        <Button
                                            onClick={() => {
                                                setOpen(
                                                    <CustomModal
                                                        title={"Create Sub Account"}
                                                        subheading={"You can switch between your agency account and the subaccount from the sidebar"}
                                                    >
                                                        <SubAccountDetails
                                                            agencyDetails={user?.Agency as Agency}
                                                            userId={user?.id as string}
                                                            userName={user?.name}
                                                        />
                                                    </CustomModal>
                                                )
                                            }}
                                            className={"w-full flex gap-2"}
                                        >
                                            <PlusCircleIcon size={15} />
                                            Create Sub Account
                                        </Button>
                                    </SheetClose>
                                )}
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <p className={"text-muted-foreground text-xs mb-2"}>
                        MENU LINKS
                    </p>
                    <Separator className={"mb-4"} />
                    <nav className={"relative"}>
                        <Command className={"rounded overflow-visible bg-transparent"}>
                            <CommandInput placeholder={"Search..."} />
                            <CommandList className={"pb-1 overflow-visible"}>
                                <CommandEmpty>No Results Found</CommandEmpty>
                                <CommandGroup className={"overflow-visible"}>
                                    {sidebarOpt.map((sidebarOption) => {
                                        let val
                                        const result = icons.find((icon) => icon.value === sidebarOption.icon)
                                        if(result){
                                            val = <result.path />
                                        }
                                        return (
                                            <CommandItem
                                                key={sidebarOption.id}
                                                className={"md:w-[320px] w-full"}
                                            >
                                                <Link
                                                    href={sidebarOption.link}
                                                    className={"flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"}
                                                >
                                                    {val}
                                                    <span>{sidebarOption.name}</span>
                                                </Link>
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MenuOptions;