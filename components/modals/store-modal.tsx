"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";


import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(1),
    latitude: z.string().min(1),
    longitude: z.string().min(1),
    systemCapacity: z.string().min(1),
    module_type: z.string().min(1),
    losses: z.string().min(1),
    array_type: z.string().min(1),
    tilt: z.string().min(1),
    azimuth: z.string().min(1),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            
            const response = await axios.post('/api/stores', values);

            window.location.assign(`/${response.data.id}`);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
    <Modal
    title="Create store"
    description="Add a new store to manage products and categories"
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}>
    
        <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={loading} 
                                            placeholder="Marketplace" 
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                control={form.control}
                name="latitude"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Latitude
                        </FormLabel>
                        <FormControl>
                            <Input disabled={loading} placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField 
                control={form.control}
                name="longitude"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Longitude
                        </FormLabel>
                        <FormControl>
                            <Input disabled={loading} placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="systemCapacity"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            System Capacity
                        </FormLabel>
                        <FormControl>
                            <Input disabled={loading} placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="module_type"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Module Type
                        </FormLabel>
                        <FormControl>
                            <Input disabled={loading} placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="losses"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Losses
                        </FormLabel>
                        <FormControl>
                            <Input disabled={loading} placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="array_type"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Array Type
                        </FormLabel>
                        <FormControl>
                            <Input disabled={loading} placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="tilt"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Tilt
                        </FormLabel>
                        <FormControl>
                            <Input disabled={loading} placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField 
                control={form.control}
                name="azimuth"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Azimuth
                        </FormLabel>
                        <FormControl>
                            <Input disabled={loading} placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    disabled={loading} 
                                    variant="outline" 
                                    onClick={storeModal.onClose}>
                                        Cancel
                                </Button>
                                <Button disabled={loading} type="submit">Continue</Button>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    </Modal>
    );
};