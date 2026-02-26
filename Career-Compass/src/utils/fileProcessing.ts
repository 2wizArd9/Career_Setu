import mammoth from 'mammoth';

// Mock PDF extraction for now - in production, use proper PDF parsing
export async function extractTextFromPDF(arrayBuffer: ArrayBuffer): Promise<string> {
  // For demo purposes, return mock resume text
  // In production, implement proper PDF parsing
  return `John Doe
Software Engineer
New York, NY | john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe | github.com/johndoe

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years of expertise in full-stack development, cloud technologies, and agile methodologies. Proven track record of delivering scalable solutions and leading cross-functional teams.

TECHNICAL SKILLS
• Programming Languages: Python, JavaScript, TypeScript, Java
• Frameworks & Libraries: React, Node.js, Django, Express.js
• Cloud Platforms: AWS, Azure, GCP
• Databases: PostgreSQL, MongoDB, Redis
• Tools: Docker, Kubernetes, Git, Jenkins

PROFESSIONAL EXPERIENCE
Senior Software Engineer
TechCorp Solutions, New York, NY
January 2022 - Present
• Led development of microservices architecture serving 1M+ users
• Implemented CI/CD pipelines reducing deployment time by 60%
• Mentored junior developers and conducted code reviews

Software Engineer
StartupXYZ, San Francisco, CA
June 2019 - December 2021
• Built responsive web applications using React and Node.js
• Optimized database queries improving performance by 40%
• Collaborated with design team to implement user-friendly interfaces

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley
2015 - 2019
GPA: 3.8/4.0

CERTIFICATIONS
• AWS Certified Solutions Architect
• Google Cloud Professional Developer
• Scrum Master Certification`;
}

export async function extractTextFromDOCX(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error('Error extracting text from DOCX:', error);
    throw new Error('Failed to extract text from DOCX. Please ensure the file is not corrupted.');
  }
}

export function extractSkillsFromText(text: string): {
  technical: string[];
  soft: string[];
  certifications: string[];
} {
  const lowerText = text.toLowerCase();

  // Common technical skills to look for
  const technicalSkills = [
    'python', 'javascript', 'java', 'c++', 'c#', 'typescript', 'react', 'angular', 'vue',
    'node.js', 'express', 'django', 'flask', 'spring', 'hibernate', 'sql', 'mysql', 'postgresql',
    'mongodb', 'redis', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'git', 'github',
    'linux', 'html', 'css', 'sass', 'tailwind', 'bootstrap', 'jquery', 'php', 'ruby',
    'rails', 'scala', 'kotlin', 'swift', 'objective-c', 'tensorflow', 'pytorch', 'pandas',
    'numpy', 'scikit-learn', 'matplotlib', 'seaborn', 'tableau', 'power bi', 'excel',
    'apache spark', 'hadoop', 'kafka', 'jenkins', 'travis ci', 'circleci'
  ];

  // Common soft skills to look for
  const softSkills = [
    'communication', 'leadership', 'teamwork', 'problem solving', 'analytical',
    'critical thinking', 'creativity', 'adaptability', 'time management', 'organization',
    'collaboration', 'mentoring', 'presentation', 'negotiation', 'conflict resolution',
    'emotional intelligence', 'project management', 'agile', 'scrum', 'kanban'
  ];

  // Common certifications to look for
  const certifications = [
    'aws certified', 'azure certified', 'google cloud', 'cisco', 'comp tia', 'pmp',
    'csm', 'csdp', 'itil', 'cissp', 'ceh', 'oscp', 'ccna', 'ccnp', 'ccie',
    'microsoft certified', 'oracle certified', 'ibm certified', 'red hat', 'docker certified'
  ];

  const extractedTechnical: string[] = [];
  const extractedSoft: string[] = [];
  const extractedCertifications: string[] = [];

  // Extract technical skills
  technicalSkills.forEach(skill => {
    if (lowerText.includes(skill)) {
      extractedTechnical.push(skill.charAt(0).toUpperCase() + skill.slice(1));
    }
  });

  // Extract soft skills
  softSkills.forEach(skill => {
    if (lowerText.includes(skill.replace(' ', ''))) {
      extractedSoft.push(skill.charAt(0).toUpperCase() + skill.slice(1));
    }
  });

  // Extract certifications
  certifications.forEach(cert => {
    if (lowerText.includes(cert)) {
      extractedCertifications.push(cert.charAt(0).toUpperCase() + cert.slice(1));
    }
  });

  // Remove duplicates and limit results
  const uniqueTechnical = [...new Set(extractedTechnical)].slice(0, 15);
  const uniqueSoft = [...new Set(extractedSoft)].slice(0, 10);
  const uniqueCertifications = [...new Set(extractedCertifications)].slice(0, 8);

  return {
    technical: uniqueTechnical,
    soft: uniqueSoft,
    certifications: uniqueCertifications
  };
}

export function extractBasicInfo(text: string): {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
} {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  let name = 'Candidate';
  let title = 'Professional';
  let email = '';
  let phone = '';
  let location = '';

  // Try to extract name (usually first line)
  if (lines.length > 0) {
    name = lines[0];
  }

  // Try to extract title (usually second line)
  if (lines.length > 1) {
    title = lines[1];
  }

  // Extract contact information
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/;

  for (const line of lines.slice(0, 10)) { // Check first 10 lines for contact info
    const emailMatch = line.match(emailRegex);
    if (emailMatch && !email) {
      email = emailMatch[0];
    }

    const phoneMatch = line.match(phoneRegex);
    if (phoneMatch && !phone) {
      phone = phoneMatch[0];
    }

    // Try to extract location (look for city, state patterns)
    if (!location && (line.includes(',') || /\b(NY|CA|TX|FL|IL|PA|OH|GA|NC|MI|NJ|VA|WA|AZ|MA|TN|IN|MO|MD|WI|MN|CO|AL|SC|LA|KY|OR|OK|CT|UT|IA|NV|AR|MS|KS|NM|NE|WV|ID|HI|NH|ME|RI|MT|DE|SD|AK|ND|VT|WY)\b/.test(line))) {
      location = line;
    }
  }

  return { name, title, email, phone, location };
}