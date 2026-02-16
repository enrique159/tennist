import { Court } from "./Court.type";

export interface FindNearbyVenuesParams {
  lat: number;
  lng: number;
  radiusKm?: number;
  type?: 'PUBLIC' | 'PRIVATE';
  status?: 'ACTIVE' | 'INACTIVE';
  page?: number;
  limit?: number;
  all?: boolean;
}

export interface Venue {
  id: string;
  alias: string;
  name: string;
  description: string;
  address: string;
  lat: string;
  lng: string;
  type: 'PUBLIC' | 'PRIVATE';
  ownerUserId: string | null;
  createdByAdmin: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  courts: Court[];
  images: VenueImage[];
  distance: number;
  facebook?: string | null;
  instagram?: string | null;
  url?: string | null;
}

export interface VenueImage {
  id: string;
  imageUrl: string;
  displayOrder: number;
  venueId: string;
  createdAt: string;
}