"use client";
import { ReactNode, useEffect, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa6";
import * as courseClient from "../client";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [course, setCourse] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.enrollmentsReducer
  );

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courses = await courseClient.fetchAllCourses();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const foundCourse = courses.find((c: any) => c._id === cid);
        setCourse(foundCourse);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [cid]);

  useEffect(() => {
    if (!currentUser) {
      router.push("/Account/Signin");
      return;
    }

    // Faculty can access all courses
    if (currentUser.role === "FACULTY") {
      return;
    }

    // Check if student is enrolled
    const isEnrolled = enrollments.some(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === cid
    );

    if (!isEnrolled) {
      router.push("/Dashboard");
    }
  }, [currentUser, enrollments, cid, router]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name} &gt; {course?.number}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}