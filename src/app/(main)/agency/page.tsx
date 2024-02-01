import React from 'react';
import {currentUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {getAuthUserDetails, verifyAndAcceptInvitation} from "@/lib/queries";
import {Plan} from "@prisma/client";
import AgencyDetails from "@/components/forms/AgencyDetails";

interface PageProps {
    searchParams: {
        plan: Plan
        state: string
        code: string
    }
}
const Page = async ({searchParams}: PageProps) => {
    const authUser = await currentUser()

    const agencyId = await verifyAndAcceptInvitation()

    // get user details
    const user = await getAuthUserDetails()
    if(agencyId) {
        if(user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
            return redirect("/subaccount")
        } else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
            if(searchParams.plan) {
                return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`)
            }
            if(searchParams.state) {
                const statePath = searchParams.state.split("__")[0]
                const stateAgencyId = searchParams.state.split("___")[1]
                if(!stateAgencyId) {
                    return <div>Not Authorized</div>
                }
                return redirect(`/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`)
            } else {
                return redirect(`/agency/${agencyId}`)
            }
        } else {
            <div>Not Authorized</div>
        }
    }

    return (
        <div className={"flex justify-center items-center mt-4"}>
            <div className={"max-w-[850px] border-[1px] p-4 rounded-xl"}>
                <h1 className={"text-4xl"}>
                    Create An Agency
                </h1>
                <AgencyDetails data={{companyEmail: authUser?.emailAddresses[0].emailAddress}}/>
            </div>
        </div>
    );
};



export default Page;