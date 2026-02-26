import type { AppData, User, Career, Course, Mentor } from '../types';
import mockUser from '../data/mock-user.json';
import mockCareers from '../data/mock-careers.json';
import mockCourses from '../data/mock-courses.json';
import mockMentors from '../data/mock-mentors.json';

export const loadMockData = async (): Promise<AppData> => {
  try {
    // Simulate network delay for realistic demo experience
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      user: mockUser as User,
      careers: mockCareers.careers as Career[],
      courses: mockCourses.courses as Course[],
      mentors: mockMentors.mentors as Mentor[],
    };
  } catch (error) {
    console.error('Error loading mock data:', error);
    throw new Error('Failed to load application data');
  }
};

export const getSkillGapAnalysis = (userSkills: string[], requiredSkills: string[]) => {
  const matchedSkills = userSkills.filter(skill => 
    requiredSkills.some(required => 
      required.toLowerCase().includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(required.toLowerCase())
    )
  );
  
  const missingSkills = requiredSkills.filter(skill => 
    !userSkills.some(userSkill => 
      userSkill.toLowerCase().includes(skill.toLowerCase()) || 
      skill.toLowerCase().includes(userSkill.toLowerCase())
    )
  );
  
  return {
    matched: matchedSkills,
    missing: missingSkills,
    matchCount: matchedSkills.length,
    totalRequired: requiredSkills.length,
    percentage: Math.round((matchedSkills.length / requiredSkills.length) * 100)
  };
};