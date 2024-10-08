import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "../../../../../lib/db";
import styles from "../../../../../styles/courseId.module.css";
import { TitleForm } from "./_components/title-form";
// import { ChaptersForm } from "./_components/chapters-form";

const CourseIdPage = async ({
  params,
}: {
  params: { courseId: string };
}) => {
  const { userId } = auth(); 

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId, 
    },
    // include: {
    //   chapters: {
    //     orderBy: {
    //       position: "asc",
    //     },
    //   },
    // },
  });

  // Redirect if the course doesn't exist
  if (!course) {
    return redirect("/");
  }

  // Check the required fields and calculate completion status
  const requiredFields = [
    course.title,
    course.description,
    course.categoryId, 
    // course.chapters.some(chapter => chapter.isPublished)
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields} / ${totalFields})`;

  return (
    <div className={styles.container}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
            <div className="flex items-center gap-x-2">
                <h2 className="text-xl">
                    Customize your course
                </h2>
            </div>
            <TitleForm  
                initialData = {course}
                courseId = {course.id}
            />
            {/* <ChaptersForm
                initialData = {course}
                courseId = {course.id}
            /> */}
        </div>
      </div>
    </div>
  );
};

export default CourseIdPage;
