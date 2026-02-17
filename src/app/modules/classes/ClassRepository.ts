import Http from '@/app/network/Http';
import Routes from '@/app/shared/routes';
import config from '@/app/config';
import { AuthHeader, Response } from '@/app/network/domain/interfaces';
import {
  AddUserToCoursePayload,
  ClassSession,
  Course,
  CourseEnrollment,
  CreateClassSessionPayload,
  CreateCoursePayload,
  FindCourseEnrollmentsParams,
  FindMyClassSessionsParams,
  MyCourse,
  ReviewEnrollmentPayload,
  SearchCoursesParams,
  UpdateCourseStatusPayload,
  ClassSessionAttendance,
} from '@/types';

const http = new Http();

export const createCourse = async (
  payload: CreateCoursePayload,
  authHeader: AuthHeader,
): Promise<Response<Course>> => {
  const url = Routes.createCourse(config.api);
  const response = await http.post<CreateCoursePayload, Course>(url, {
    data: payload,
    headers: authHeader,
  });
  return response;
};

export const searchCourses = async (
  params: SearchCoursesParams,
  authHeader: AuthHeader,
): Promise<Response<Course[]>> => {
  const url = Routes.searchCourses(config.api);
  const response = await http.get<SearchCoursesParams, Course[]>(url, {
    params,
    headers: authHeader,
  });
  return response;
};

export const getCourseById = async (
  courseId: string,
  authHeader: AuthHeader,
): Promise<Response<Course>> => {
  const url = Routes.getCourseById(config.api, courseId);
  const response = await http.get<never, Course>(url, {
    headers: authHeader,
  });
  return response;
};

export const updateCourseStatus = async (
  courseId: string,
  payload: UpdateCourseStatusPayload,
  authHeader: AuthHeader,
): Promise<Response<Course>> => {
  const url = Routes.updateCourseStatus(config.api, courseId);
  const response = await http.patch<UpdateCourseStatusPayload, Course>(url, {
    data: payload,
    headers: authHeader,
  });
  return response;
};

export const requestEnrollment = async (
  courseId: string,
  authHeader: AuthHeader,
): Promise<Response<CourseEnrollment>> => {
  const url = Routes.requestEnrollment(config.api, courseId);
  const response = await http.post<never, CourseEnrollment>(url, {
    headers: authHeader,
  });
  return response;
};

export const addUserToCourse = async (
  courseId: string,
  payload: AddUserToCoursePayload,
  authHeader: AuthHeader,
): Promise<Response<CourseEnrollment>> => {
  const url = Routes.addUserToCourse(config.api, courseId);
  const response = await http.post<AddUserToCoursePayload, CourseEnrollment>(url, {
    data: payload,
    headers: authHeader,
  });
  return response;
};

export const reviewEnrollment = async (
  courseId: string,
  enrollmentId: string,
  payload: ReviewEnrollmentPayload,
  authHeader: AuthHeader,
): Promise<Response<CourseEnrollment>> => {
  const url = Routes.reviewEnrollment(config.api, courseId, enrollmentId);
  const response = await http.patch<ReviewEnrollmentPayload, CourseEnrollment>(url, {
    data: payload,
    headers: authHeader,
  });
  return response;
};

export const getCourseEnrollments = async (
  courseId: string,
  params: FindCourseEnrollmentsParams,
  authHeader: AuthHeader,
): Promise<Response<CourseEnrollment[]>> => {
  const url = Routes.getCourseEnrollments(config.api, courseId);
  const response = await http.get<FindCourseEnrollmentsParams, CourseEnrollment[]>(url, {
    params,
    headers: authHeader,
  });
  return response;
};

export const createClassSession = async (
  courseId: string,
  payload: CreateClassSessionPayload,
  authHeader: AuthHeader,
): Promise<Response<ClassSession>> => {
  const url = Routes.createClassSession(config.api, courseId);
  const response = await http.post<CreateClassSessionPayload, ClassSession>(url, {
    data: payload,
    headers: authHeader,
  });
  return response;
};

export const getCourseSessions = async (
  courseId: string,
  authHeader: AuthHeader,
): Promise<Response<ClassSession[]>> => {
  const url = Routes.getCourseSessions(config.api, courseId);
  const response = await http.get<never, ClassSession[]>(url, {
    headers: authHeader,
  });
  return response;
};

export const getMyCourses = async (
  authHeader: AuthHeader,
): Promise<Response<MyCourse[]>> => {
  const url = Routes.getMyCourses(config.api);
  const response = await http.get<never, MyCourse[]>(url, {
    headers: authHeader,
  });
  return response;
};

export const getMyClassSessions = async (
  params: FindMyClassSessionsParams,
  authHeader: AuthHeader,
): Promise<Response<ClassSessionAttendance[]>> => {
  const url = Routes.getMyClassSessions(config.api);
  const response = await http.get<FindMyClassSessionsParams, ClassSessionAttendance[]>(url, {
    params,
    headers: authHeader,
  });
  return response;
};
