import { Venue } from './Venue.type';

export enum CourseDifficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  ALL_LEVELS = 'ALL_LEVELS',
}

export enum CourseStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
}

export enum EnrollmentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum EnrollmentSourceType {
  USER_REQUEST = 'USER_REQUEST',
  OWNER_ADD = 'OWNER_ADD',
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
}

export interface CourseSchedule {
  id: string;
  courseId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string | null;
  groupName?: string | null;
  difficulty: CourseDifficulty;
  maxCapacity?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  status: CourseStatus;
  ownerUserId: string;
  venueId?: string | null;
  schedules: CourseSchedule[];
  venue?: Venue | null;
  createdAt: string;
  updatedAt: string;
}

export interface CourseEnrollment {
  id: string;
  courseId: string;
  userId: string;
  status: EnrollmentStatus;
  sourceType: EnrollmentSourceType;
  reviewedByUserId?: string | null;
  reviewNotes?: string | null;
  reviewedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ClassSessionAttendance {
  id: string;
  sessionId: string;
  userId: string;
  status: AttendanceStatus;
  playerNotes?: string | null;
}

export interface ClassSession {
  id: string;
  courseId: string;
  date: string;
  startTime: string;
  endTime: string;
  generalNotes?: string | null;
  attendance: ClassSessionAttendance[];
  createdAt: string;
}

export interface CreateCourseSchedulePayload {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface CreateCoursePayload {
  title: string;
  description?: string;
  groupName?: string;
  difficulty?: CourseDifficulty;
  maxCapacity?: number;
  startDate?: string;
  endDate?: string;
  status?: CourseStatus;
  venueId?: string;
  schedules?: CreateCourseSchedulePayload[];
}

export interface SearchCoursesParams {
  search?: string;
  difficulty?: CourseDifficulty;
  status?: CourseStatus;
  ownerUserId?: string;
  venueId?: string;
  page?: number;
  limit?: number;
}

export interface UpdateCourseStatusPayload {
  status: CourseStatus;
}

export interface AddUserToCoursePayload {
  userId: string;
  reviewNotes?: string;
}

export interface ReviewEnrollmentPayload {
  status: EnrollmentStatus.APPROVED | EnrollmentStatus.REJECTED;
  reviewNotes?: string;
}

export interface FindCourseEnrollmentsParams {
  status?: EnrollmentStatus;
}

export interface CreateClassSessionAttendancePayload {
  userId: string;
  status?: AttendanceStatus;
  playerNotes?: string;
}

export interface CreateClassSessionPayload {
  date: string;
  startTime: string;
  endTime: string;
  generalNotes?: string;
  attendance?: CreateClassSessionAttendancePayload[];
}

export interface FindMyClassSessionsParams {
  fromDate?: string;
  toDate?: string;
  courseId?: string;
  attendanceStatus?: AttendanceStatus;
}

export interface MyCourse extends Course {
  enrollment: {
    id: string;
    status: EnrollmentStatus;
    sourceType: EnrollmentSourceType;
    approvedAt: string | null;
  };
}
