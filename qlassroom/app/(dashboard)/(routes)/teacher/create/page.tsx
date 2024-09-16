"use client";

import * as z from 'zod';
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { useRouter } from 'next/navigation';
import styles from '../../../../styles/create.module.css';
import Link from 'next/link';
import {
    Form, 
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form";
import { Button } from '@nextui-org/button';
import { Input } from '@/components/ui/input';
import { title } from 'process';
import toast from 'react-hot-toast';

const formSchema = z.object ({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});

const CreatePage = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Course created");
        } catch {
            toast.error("Something went wrong");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formcontainer}>
                <h1 className='title'>Name your course</h1>
                <Form{...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='form'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Course title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                        disabled = {isSubmitting}
                                        placeholder="e.g. 'Advanced Deep Learning'"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        What is your teaching plan for this course?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )} 
                        />
                        <div className={styles.cancel}>
                            <Link href='/teacher/course'>
                                <Button type='button' variant = 'ghost'>Cancel</Button>
                            </Link>
                                <Button type='submit' disabled={!isValid || isSubmitting}>
                                    Submit
                                </Button>

                        </div>
                    </form>
                </Form>
            </div>
            
        </div>
    )
}

export default CreatePage;