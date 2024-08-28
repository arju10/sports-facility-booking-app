export interface TSchedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Facility {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  schedule: TSchedule[];
  imageUrl?: string;
  isDeleted: boolean;
}
