export interface Court {
  id: string;
  name: string;
  surface: string;
  isIndoor: boolean;
  isLighted: boolean;
  isActive: boolean;
  venueId: string;
  createdAt: string;
  updatedAt: string;
}