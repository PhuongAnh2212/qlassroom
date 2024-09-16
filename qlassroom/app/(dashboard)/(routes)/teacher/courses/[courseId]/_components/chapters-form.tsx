"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@nextui-org/button";
import { Pencil, Text, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Chapter, Course } from "@prisma/client";
import { ChapterList } from "./chapterlist";

interface ChaptersFormProps {
    initialData: Course & {chapters: Chapter[]};
    courseId: string;
};

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Chapter is required",
    }),
});

export const ChaptersForm = ( {
    initialData,
    courseId
} :ChaptersFormProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const toggleCreate = () => setIsCreating((current) => !current);
    
    const handleChapterSelect = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`);
      };
      
    const router = useRouter();    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          await axios.post(`/api/courses/${courseId}/chapters`, values);
          toast.success("Chapter updated");
          toggleCreate();
          router.refresh();
        } catch (error) {
          console.error("Error updating course:", error); // Log error
          toast.error("Something went wrong");
        }
      }

      const onReorder = async (updateData: { id: string; position: number }[]) => {
        try {
          setIsUpdating(true);
          await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
            list: updateData,  // Ensure `updateData` is an array
          });
          toast.success("Chapter reordered");
        } catch {
          toast.error("Something went wrong");
        } finally {
          setIsUpdating(false);
        }
      };
      
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
            Course Title
            <Button onClick={toggleCreate} variant="ghost">
                {isCreating ? (
                    <><PlusCircle className="h-4 w-4 mr-2" /> 
                    Add a chapter</>
                ) : (
                    <>
                    Cancel
                    </>
                )}
            </Button>
            </div>
            {!isCreating && (
                <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 mt-4">
                            <FormField
                            control = {form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled = {isSubmitting}
                                            placeholder = "e.g. 'Lesson 1: Introduction to the course'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                <div className="flex items-center gap-x-2">
                    <Button 
                        disabled={!isValid  || isSubmitting}
                        type = "submit"
                    >
                        Create
                    </Button>
                </div>
                    </form>
                </Form>
            )}
        {!isCreating && (
            <div className={cn("text-sm mt-2", !initialData.chapters.length && "text-slate-500 italic")}>
            {!initialData.chapters.length && "No chapters"}
            <ChapterList
                onSelect={handleChapterSelect}
                onReorder={onReorder}
                items={initialData.chapters || []}
            />
            </div>
        )}
        {!isCreating && (
            <p> Drag and drop to reorder the chapters
            </p>
    )}
    </div>
    )//
}