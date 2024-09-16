"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
import FileUpload from '../../../../../../../../../components/ui/uploadthings'
import { MuxData } from "@prisma/client";

interface ChapterVideoProps {
  initialData: Chapter & { muxData: MuxData | null },
  courseId: string,
  chapterId: string,
  videoUrl: string | null,
}
const formSchema = z.object({
    videoUrl: z.string().min(1),
});

export const ChapterVideo = ({
    initialData,
    courseId,
    chapterId,
  }: ChapterVideoProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toggleEdit = () => setIsEditing((prev) => !prev);
  
    const {
      register,
      handleSubmit,
      setValue,
      control,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        videoUrl: initialData?.videoUrl || "",
      },
    });
  
    const onSubmit = async (values: { videoUrl: string }) => {
      setIsLoading(true);
  
      try {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
        toast.success("Video updated successfully");
        router.refresh(); // Refresh the page after successful update
        toggleEdit(); // Exit edit mode
      } catch (error) {
        toast.error("Failed to update video");
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2>Chapter Video</h2>
          <Button
            startContent={<Pencil />}
            onClick={toggleEdit}
            disabled={isLoading}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
  
        {!isEditing ? (
          <div>
            {initialData.videoUrl ? (
              <video
                className="w-full h-auto"
                controls
                src={initialData.videoUrl}
              />
            ) : (
              <p>No video uploaded for this chapter.</p>
            )}
          </div>
        ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
                name="videoUrl"
                control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onChange={(fileUrl: string) => setValue("videoUrl", fileUrl)}
                      accept="video/*"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage>{errors.videoUrl?.message}</FormMessage>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className={cn("mt-4", { "opacity-50": isLoading })}
              startContent={isLoading ? "Uploading..." : <PlusCircle />}
            >
              Save Video
            </Button>
          </form>
        )}
      </div>
    );
  };
