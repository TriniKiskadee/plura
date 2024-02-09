import React from 'react';
import {getLanesWithTicketAndTags, getPipelineDetails, updateLanesOrder, updateTicketsOrder} from "@/lib/queries";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";
import {LaneDetail} from "@/lib/types";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import PipelineInfobar from "@/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineInfobar";
import PipelineSettings from "@/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineSettings";
import PipelineView from "@/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineView";

interface PipelinePageProps {
    params: {
        subaccountId: string
        pipelineId: string
    }
}

const Page = async ({params}: PipelinePageProps) => {
    const pipelineDetails = await getPipelineDetails(params.pipelineId)
    if(!pipelineDetails){
        return redirect(`/subaccount/${params.subaccountId}/pipelines`)
    }

    const pipelines = await db.pipeline.findMany({
        where: {
            subAccountId: params.subaccountId
        }
    })

    const lanes = (await getLanesWithTicketAndTags(params.pipelineId)) as LaneDetail[]

    return (
        <Tabs
            defaultValue={"view"}
            className={"w-full"}
        >
            <TabsList className={"bg-transparent border-b-2 h-16 w-full justify-between mb-4"}>
                <PipelineInfobar
                    pipelineId={params.pipelineId}
                    subaccountId={params.subaccountId}
                    pipelines={pipelines}
                />
                <div>
                    <TabsTrigger
                        value={"view"}
                    >
                        Pipeline View
                    </TabsTrigger>
                    <TabsTrigger
                        value={"settings"}
                    >
                        Settings
                    </TabsTrigger>
                </div>
            </TabsList>
            <TabsContent value={"view"}>
                <PipelineView
                    lanes={lanes}
                    pipelineId={params.pipelineId}
                    subaccountId={params.subaccountId}
                    pipelineDetails={pipelineDetails}
                    updateLaneOrder={updateLanesOrder}
                    updateTicketsOrder={updateTicketsOrder}
                />
            </TabsContent>
            <TabsContent value={"settings"}>
                <PipelineSettings
                    pipelines={pipelines}
                    pipelineId={params.pipelineId}
                    subaccountId={params.subaccountId}
                />
            </TabsContent>
        </Tabs>
    );
};

export default Page;