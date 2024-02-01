"use client"

import {Agency} from "@prisma/client";
import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {AlertDialog} from "@/components/ui/alert-dialog";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormLabel} from "@/components/ui/form";
import {useToast} from "@/components/ui/use-toast";
import * as z from "zod";
import FileUpload from "@/components/global/FileUpload";

interface AgencyDetailsProps {
    data?: Partial<Agency>
}

const FormSchema = z.object({
    name: z.string().min(2, {message: "Agency name must be at least 2 characters."}),
    companyEmail: z.string().email().min(1),
    companyPhone: z.string().min(1),
    whiteLabel: z.boolean(),
    address: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    agencyLogo: z.string().min(1)
})

const AgencyDetails = ({data}: AgencyDetailsProps) => {
    const {toast} = useToast()
    const router = useRouter()
    const [deletingAgency, setDeletingAgency] = useState()
    const form = useForm<z.infer<typeof FormSchema>>({
        mode: "onChange",
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: data?.name,
            companyEmail: data?.companyEmail,
            companyPhone: data?.companyPhone,
            whiteLabel: data?.whiteLabel || false,
            address: data?.address,
            city: data?.city,
            zipCode: data?.zipCode,
            state: data?.state,
            country: data?.country,
            agencyLogo: data?.agencyLogo,
        }
    })

    const isLoading = form.formState.isSubmitting

    useEffect(() => {
        if(data) {
            form.reset(data)
        }
    }, [data])

    const handleSubmit = async () => {

    }

    return (
        <AlertDialog>
            <Card className={"w-full"}>
                <CardHeader>
                    <CardTitle>Agency Information</CardTitle>
                    <CardDescription>
                        Lets create an agency for your business.
                        You can edit agency settings later from the agency setting tab.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className={"space-y-4"}
                        >
                            <FormField
                                disabled={isLoading}
                                control={form.controle}
                                name={"agencyLogo"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Agency Logo</FormLabel>
                                        <FormControl>
                                            <FileUpload></FileUpload>
                                        </FormControl>
                                    </FormItem>
                                    )}
                            >

                            </FormField>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </AlertDialog>
    );
};

export default AgencyDetails;