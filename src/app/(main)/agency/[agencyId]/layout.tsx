import React from 'react';
import {getNotificationAndUser, verifyAndAcceptInvitation} from "@/lib/queries";
import {redirect} from "next/navigation";
import {currentUser} from "@clerk/nextjs";
import Unauthorized from "@/components/unauthorized";
import Sidebar from "@/components/sidebar";
import BlurPage from "@/components/global/BlurPage";
import Infobar from "@/components/global/Infobar";

interface Props {
    children: React.ReactNode
    params: {
        agencyId: string
    }
}

const Layout = async ({children, params}: Props) => {
    const agencyId = await verifyAndAcceptInvitation()
    const user = await currentUser()

    if(!user) return redirect("/")
    if(!agencyId) return redirect("/agency")
    if(user.privateMetadata.role !== "AGENCY_OWNER" && user.privateMetadata.role !== "AGENCY_ADMIN"){
        return <Unauthorized />
    }

    let allNoti: any = []
    const notifications = await getNotificationAndUser(agencyId)
    if(notifications) allNoti = notifications

    return (
        <div className={"h-screen overflow-hidden"}>
            <Sidebar
                id={params.agencyId}
                type={"agency"}
            />
            <div className={"md:pl-[300px]"}>
                <Infobar notifications={allNoti}/>
                <div className={"relative"}>
                    <BlurPage>
                        {children}
                    </BlurPage>
                </div>
            </div>
        </div>
    );
};

export default Layout;