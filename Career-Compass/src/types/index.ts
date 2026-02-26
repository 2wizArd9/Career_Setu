export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  currentRole: string;
  experience: string;
  skills: string[];
  skillLevels: Record<string, number>;
}

export interface CareerTrajectoryLevel {
  level: string;
  years: string;
  salary: string;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  growthRate: string;
  medianSalary: string;
  requiredSkills: string[];
  trajectory: CareerTrajectoryLevel[];
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  difficulty: string;
  skills: string[];
  url: string;
  rating: number;
  enrolled: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  expertise: string[];
  experience: string;
  rating: number;
  sessionFee: string;
  bio: string;
  availability: string[];
}

export interface AppData {
  user: User;
  careers: Career[];
  courses: Course[];
  mentors: Mentor[];
}