import React from 'react';
import {db} from "@/lib/db";
import {pipe} from "next/dist/build/webpack/config/utils";
import {redirect} from "next/navigation";

interface PipelineProps {
    params: {
        subaccountId: string
    }
}

const Pipelines = async({params}: PipelineProps) => {
    const pipelineExist = await db.pipeline.findFirst({
        where: {
            subAccountId: params.subaccountId
        }
    })
    if(pipelineExist) {
        return redirect(`/subaccount/${params.subaccountId}/pipelines/${pipelineExist.id}`)
    }

    try {
        const response = await db.pipeline.create({
            data: {
                name: "First Pipeline",
                subAccountId: params.subaccountId
            }
        })
        return redirect(`/subaccount/${params.subaccountId}/pipelines/${pipelineExist.id}`)
    } catch (error) {
        console.log(error)
    }

    return (
        <div>
            Pipelines
        </div>
    );
};

export default Pipelines;