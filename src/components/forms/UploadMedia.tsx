"use client"

import React from 'react';
import {z} from "zod";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {createMedia, saveActivityLogsNotification} from "@/lib/queries";
import {Input} from "@/components/ui/input";
import FileUpload from "@/components/global/FileUpload";
import {Button} from "@/components/ui/button";

interface UploadMediaFormProps {
    subaccountId: string
}

const formSchema = z.object({
    link: z.string().min(1, {message: "Media File is required"}),
    name: z.string().min(1, {message: "Name is required"})
})

const UploadMediaForm = ({subaccountId}: UploadMediaFormProps) => {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onSubmit",
        defaultValues: {
            link: "",
            name: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>){
        try {
            const response = await createMedia(subaccountId, values)
            await saveActivityLogsNotification({
                agencyId: undefined,
                description: `Uploaded a media file | ${response.name}`,
                subaccountId
            })

            toast({
                title: "Failed",
                description: "Uploaded media file",
            })

            router.refresh()
        } catch (error) {
            toast({
                title: "Error",
                description: `Error uploading media file: ${error}`,
                variant: "destructive"
            })
        }
    }

    return (
        <Card className={"w-full"}>
            <CardHeader>
                <CardTitle>Media Information</CardTitle>
                <CardDescription>Please enter the details for your file</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name={"name"}
                            render={({field}) => (
                                <FormItem className={"flex-1"}>
                                    <FormLabel>File Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder={"My Awesome File"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"link"}
                            render={({field}) => (
                                <FormItem className={"flex-1"}>
                                    <FormLabel>Media File</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            apiEndpoint={"subaccountLogo"}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type={"submit"}
                            className={"mt-4"}
                        >
                            Upload Media
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default UploadMediaForm;