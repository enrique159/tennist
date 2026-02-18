import { storeToRefs } from 'pinia'
import { useClassStore } from '@/stores/classStore'
import { useApp } from './useApp'
import {
  AddUserToCoursePayload,
  CreateClassSessionPayload,
  CreateCoursePayload,
  FindCourseEnrollmentsParams,
  FindMyClassSessionsParams,
  ReviewEnrollmentPayload,
  SearchCoursesParams,
  UpdateCourseStatusPayload,
} from '@/types'

export const useClass = () => {
  const classStore = useClassStore()
  const { authHeader } = useApp()
  const {
    courses,
    course,
    enrollments,
    courseSessions,
    myCourses,
    myClassSessions,
  } = storeToRefs(classStore)

  const createCourse = (payload: CreateCoursePayload) => {
    return classStore.createCourse(payload, authHeader.value)
  }

  const searchCourses = (params: SearchCoursesParams = {}) => {
    return classStore.searchCourses(params, authHeader.value)
  }

  const getCourseById = (courseId: string) => {
    return classStore.getCourseById(courseId, authHeader.value)
  }

  const updateCourseStatus = (
    courseId: string,
    payload: UpdateCourseStatusPayload,
  ) => {
    return classStore.updateCourseStatus(courseId, payload, authHeader.value)
  }

  const requestEnrollment = (courseId: string) => {
    return classStore.requestEnrollment(courseId, authHeader.value)
  }

  const addUserToCourse = (
    courseId: string,
    payload: AddUserToCoursePayload,
  ) => {
    return classStore.addUserToCourse(courseId, payload, authHeader.value)
  }

  const reviewEnrollment = (
    courseId: string,
    enrollmentId: string,
    payload: ReviewEnrollmentPayload,
  ) => {
    return classStore.reviewEnrollment(
      courseId,
      enrollmentId,
      payload,
      authHeader.value,
    )
  }

  const getCourseEnrollments = (
    courseId: string,
    params: FindCourseEnrollmentsParams = {},
  ) => {
    return classStore.getCourseEnrollments(courseId, params, authHeader.value)
  }

  const createClassSession = (
    courseId: string,
    payload: CreateClassSessionPayload,
  ) => {
    return classStore.createClassSession(courseId, payload, authHeader.value)
  }

  const getCourseSessions = (courseId: string) => {
    return classStore.getCourseSessions(courseId, authHeader.value)
  }

  const getMyCourses = () => {
    return classStore.getMyCourses(authHeader.value)
  }

  const getMyClassSessions = (params: FindMyClassSessionsParams = {}) => {
    return classStore.getMyClassSessions(params, authHeader.value)
  }

  return {
    courses,
    course,
    enrollments,
    courseSessions,
    myCourses,
    myClassSessions,
    createCourse,
    searchCourses,
    getCourseById,
    updateCourseStatus,
    requestEnrollment,
    addUserToCourse,
    reviewEnrollment,
    getCourseEnrollments,
    createClassSession,
    getCourseSessions,
    getMyCourses,
    getMyClassSessions,
  }
}
