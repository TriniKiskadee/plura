"use client"

import React, {useEffect, useState} from 'react';
import {LaneDetail, PipelineDetailsWithLanesCardsTagsTickets, TicketAndTags} from "@/lib/types";
import {Lane, Ticket} from "@prisma/client";
import {useModal} from "@/providers/ModalProvider";
import {useRouter} from "next/navigation";
import {DragDropContext, DropResult, Droppable} from "react-beautiful-dnd"
import {Button} from "@/components/ui/button";
import CustomModal from "@/components/global/CustomModal";
import LaneForm from "@/components/forms/LaneForm";
import {Plus} from "lucide-react";
import PipelineLane from "@/app/(main)/subaccount/[subaccountId]/pipelines/_components/PipelineLane";

interface PipelineViewProps {
    lanes: LaneDetail[]
    pipelineId: string
    subaccountId: string
    pipelineDetails: PipelineDetailsWithLanesCardsTagsTickets
    updateLaneOrder: (lanes: Lane[]) => Promise<void>
    updateTicketsOrder: (tickets: Ticket[]) => Promise<void>
}

const PipelineView = ({lanes, pipelineId, subaccountId, pipelineDetails, updateLaneOrder, updateTicketsOrder}:PipelineViewProps) => {
    const {setOpen} = useModal()
    const router = useRouter()
    const [allLanes, setAllLanes] = useState<LaneDetail[]>([])

    useEffect(() => {
        setAllLanes(lanes)
    }, [lanes])

    const ticketsFromAllLanes: TicketAndTags[] = []
    lanes.forEach((item) => {
        item.Ticket.forEach((i: any) => {
            ticketsFromAllLanes.push(i)
        })
    })

    const [allTickets, setAllTickets] = useState(ticketsFromAllLanes)


    const handleAddLane = () => {
        setOpen(
            <CustomModal
                title={"Create A Lane"}
                subheading={"Lanes allow you to group tickets"}
            >
                <LaneForm pipelineId={pipelineId}/>
            </CustomModal>
        )
    }

    return (
        <DragDropContext
            onDragEnd={() => {}}
        >
            <div className={"bg-white/60 dark:bg-background/60 rounded-xl p-4 use-automation-zoom-in"}>
                <div className={"flex items-center justify-between"}>
                    <h1 className={"text-2xl"}>
                        {pipelineDetails?.name}
                    </h1>
                    <Button
                        onClick={handleAddLane}
                        className={"flex items-center gap-4"}
                    >
                        <Plus size={15}/>
                        Create Lane
                    </Button>
                </div>
                <Droppable
                    droppableId={"lanes"}
                    type={"lane"}
                    direction={"horizontal"}
                    key={"lanes"}
                >
                    {(provided) => (
                        <div
                            className={"flex items-center gap-x-2 overflow-scroll"}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <div className={"flex mt-4"}>
                                {allLanes.map((lane, index) => (
                                    <PipelineLane
                                        setAllTickets={setAllTickets}
                                        allTickets={allTickets}
                                        tickets={lane.Tickets}
                                        pipelineId={pipelineId}
                                        laneDetails={lane}
                                        subaccountId={subaccountId}
                                        index={index}
                                        key={lane.id}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}

export default PipelineView;

// TODO: 7:57:00