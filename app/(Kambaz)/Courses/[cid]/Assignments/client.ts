import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/assignments`
  );
  return response.data;
};

export const findAssignmentById = async (
  courseId: string,
  assignmentId: string
) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/assignments/${assignmentId}`
  );
  return response.data;
};

export const createAssignment = async (
  courseId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignment: any
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const updateAssignment = async (
  courseId: string,
  assignmentId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignment: any
) => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/assignments/${assignmentId}`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (
  courseId: string,
  assignmentId: string
) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/assignments/${assignmentId}`
  );
  return response.data;
};