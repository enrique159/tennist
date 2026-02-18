import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  addUserToCourse as addUserToCourseUseCase,
  createClassSession as createClassSessionUseCase,
  createCourse as createCourseUseCase,
  getCourseById as getCourseByIdUseCase,
  getCourseEnrollments as getCourseEnrollmentsUseCase,
  getCourseSessions as getCourseSessionsUseCase,
  getMyClassSessions as getMyClassSessionsUseCase,
  getMyCourses as getMyCoursesUseCase,
  requestEnrollment as requestEnrollmentUseCase,
  reviewEnrollment as reviewEnrollmentUseCase,
  searchCourses as searchCoursesUseCase,
  updateCourseStatus as updateCourseStatusUseCase,
} from '@/app/modules/classes/ClassRepository'
import { AuthHeader } from '@/app/network/domain/interfaces'
import {
  AddUserToCoursePayload,
  ClassSession,
  ClassSessionAttendance,
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
} from '@/types'

export const useClassStore = defineStore('class', () => {
  // STATE ☁️
  const courses = ref<Course[]>([])
  const course = ref<Course | null>(null)
  const enrollments = ref<CourseEnrollment[]>([])
  const courseSessions = ref<ClassSession[]>([])
  const myCourses = ref<MyCourse[]>([])
  const myClassSessions = ref<ClassSessionAttendance[]>([])

  // ACTIONS 🚀
  const setCourses = (newCourses: Course[]) => {
    courses.value = newCourses
  }

  const setCourse = (newCourse: Course) => {
    course.value = newCourse
  }

  const addCourse = (newCourse: Course) => {
    courses.value.unshift(newCourse)
  }

  const setEnrollments = (newEnrollments: CourseEnrollment[]) => {
    enrollments.value = newEnrollments
  }

  const setCourseSessions = (newSessions: ClassSession[]) => {
    courseSessions.value = newSessions
  }

  const addCourseSession = (session: ClassSession) => {
    courseSessions.value.unshift(session)
  }

  const setMyCourses = (newMyCourses: MyCourse[]) => {
    myCourses.value = newMyCourses
  }

  const setMyClassSessions = (newMyClassSessions: ClassSessionAttendance[]) => {
    myClassSessions.value = newMyClassSessions
  }

  // FETCH API ⚡️
  const createCourse = async (
    payload: CreateCoursePayload,
    authHeader: AuthHeader,
  ) => {
    const action = createCourseUseCase(payload, authHeader)
    action
      .then((response) => {
        addCourse(response.data)
        return response
      })
      .catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

    return action
  }

  const searchCourses = async (
    params: SearchCoursesParams,
    authHeader: AuthHeader,
  ) => {
    const action = searchCoursesUseCase(params, authHeader)
    action
      .then((response) => {
        setCourses(response.data)
        return response
      })
      .catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

    return action
  }

  const getCourseById = async (courseId: string, authHeader: AuthHeader) => {
    const action = getCourseByIdUseCase(courseId, authHeader)
    action
      .then((response) => {
        setCourse(response.data)
        return response
      })
      .catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

    return action
  }

  const updateCourseStatus = async (
    courseId: string,
    payload: UpdateCourseStatusPayload,
    authHeader: AuthHeader,
  ) => {
    const action = updateCourseStatusUseCase(courseId, payload, authHeader)
    action
      .then((response) => {
        setCourse(response.data)
        return response
      })
      .catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

    return action
  }

  const requestEnrollment = async (courseId: string, authHeader: AuthHeader) => {
    const action = requestEnrollmentUseCase(courseId, authHeader)
    action.catch((error) => {
      console.error('Error ❗️:', error.errors)
      return error
    })

    return action
  }

  const addUserToCourse = async (
    courseId: string,
    payload: AddUserToCoursePayload,
    authHeader: AuthHeader,
  ) => {
    const action = addUserToCourseUseCase(courseId, payload, authHeader)
    action.catch((error) => {
      console.error('Error ❗️:', error.errors)
      return error
    })

    return action
  }

  const reviewEnrollment = async (
    courseId: string,
    enrollmentId: string,
    payload: ReviewEnrollmentPayload,
    authHeader: AuthHeader,
  ) => {
    const action = reviewEnrollmentUseCase(
      courseId,
      enrollmentId,
      payload,
      authHeader,
    )
    action.catch((error) => {
      console.error('Error ❗️:', error.errors)
      return error
    })

    return action
  }

  const getCourseEnrollments = async (
    courseId: string,
    params: FindCourseEnrollmentsParams,
    authHeader: AuthHeader,
  ) => {
    const action = getCourseEnrollmentsUseCase(courseId, params, authHeader)
    action
      .then((response) => {
        setEnrollments(response.data)
        return response
      })
      .catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

    return action
  }

  const createClassSession = async (
    courseId: string,
    payload: CreateClassSessionPayload,
    authHeader: AuthHeader,
  ) => {
    const action = createClassSessionUseCase(courseId, payload, authHeader)
    action
      .then((response) => {
        addCourseSession(response.data)
        return response
      })
      .catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

    return action
  }

  const getCourseSessions = async (courseId: string, authHeader: AuthHeader) => {
    const action = getCourseSessionsUseCase(courseId, authHeader)
    action
      .then((response) => {
        setCourseSessions(response.data)
        return response
      })
      .catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

    return action
  }

  const getMyCourses = async (authHeader: AuthHeader) => {
    const action = getMyCoursesUseCase(authHeader)
    action
      .then((response) => {
        setMyCourses(response.data)
        return response
      })
      .catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

    return action
  }

  const getMyClassSessions = async (
    params: FindMyClassSessionsParams,
    authHeader: AuthHeader,
  ) => {
    const action = getMyClassSessionsUseCase(params, authHeader)
    action
      .then((response) => {
        setMyClassSessions(response.data)
        return response
      })
      .catch((error) => {
        console.error('Error ❗️:', error.errors)
        return error
      })

    return action
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
})
