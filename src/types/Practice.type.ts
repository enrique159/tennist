export enum PracticeSourceType {
  MANUAL = 'MANUAL',
  CLASS = 'CLASS',
}

export interface Practice {
  id: string;
  userId: string;
  venueId?: string | null;
  practiceDate: string;
  durationMinutes: number;
  playedFriendlyMatch: boolean;
  practicedServes: boolean;
  sourceType: PracticeSourceType;
  classId?: string | null;
  classSessionId?: string | null;
  className?: string | null;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePracticePayload {
  practiceDate: string;
  durationMinutes: number;
  playedFriendlyMatch?: boolean;
  practicedServes?: boolean;
  venueId?: string;
  sourceType: PracticeSourceType;
  classAttended?: boolean;
  classId?: string;
  classSessionId?: string;
  className?: string;
  notes?: string;
}

export interface FindPracticesParams {
  fromDate?: string;
  toDate?: string;
  sourceType?: PracticeSourceType;
}

export interface PracticeStats {
  totalPractices: number;
  totalDurationMinutes: number;
  averageDurationMinutes: number;
  friendlyMatchPractices: number;
  servePractices: number;
  manualPractices: number;
  classPractices: number;
  uniqueVenueCount: number;
  uniquePracticeDays: number;
  currentStreakDays: number;
  longestStreakDays: number;
  consistencyPercentage: number | null;
  filtersApplied: {
    fromDate: string | null;
    toDate: string | null;
    sourceType: PracticeSourceType | null;
  };
}
