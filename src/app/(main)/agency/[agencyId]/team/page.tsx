import React from 'react';
import {db} from "@/lib/db";
import DataTable from "@/app/(main)/agency/[agencyId]/team/DataTable";
import {Plus} from "lucide-react";
import {currentUser} from "@clerk/nextjs";
import {columns} from "@/app/(main)/agency/[agencyId]/team/Columns";
import SendInvitation from "@/components/forms/SendInvitation";

interface TeamsProps {
    params: {
        agencyId: string
    }
}

const Page = async ({params}: TeamsProps) => {
    const authUser = await currentUser()
    if(!authUser) return null

    const teamMembers = await db.user.findMany({
        where: {
            Agency: {
                id: params.agencyId
            }
        },
        include: {
            Agency: {
                include: {
                    SubAccount: true
                }
            },
            Permissions: {
                include: {
                    SubAccount: true
                }
            }
        }
    })
    if(!teamMembers) return null // TODO: May not need

    const agencyDetails = await db.agency.findUnique({
        where: {
            id: params.agencyId
        },
        include: {
            SubAccount: true
        }
    })
    if(!agencyDetails) return

    return (
        <DataTable
            actionButtonText={
                <>
                    <Plus size={15} />
                    Add
                </>
            }
            modalChildren={<SendInvitation agencyId={agencyDetails.id}/>}
            filterValue={"name"}
            columns={columns}
            data={teamMembers}
        />
    );
};

export default Page;