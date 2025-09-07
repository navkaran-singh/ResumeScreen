import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export async function parseResume(text) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const response = await model.generateContent(
    `Extract structured details from the following resume text:  
"${text}"  

Return the response as a valid JSON object with the following keys:  

{
  "name": "Full Name",
  "email": "example@example.com",
  "phone": "123-456-7890",
  "skills": ["Skill1", "Skill2", "Skill3", "..."], 
  "top_skills": ["TopSkill1", "TopSkill2", "TopSkill3", "TopSkill4", "TopSkill5"],  
  "experience": [
    "Summary of most relevant experience in third person.",
    "Highlight major achievements, roles, or contributions.",
    "Include any impactful projects if mentioned.",
    "Limit to at most 5 entries."
  ],
  "education": ["Degree 1 - Institution", "Degree 2 - Institution"],
  "aiScore": What you rate the profile out of 100 on the basis of skills, education and projects,
  "expYears": Integer value storing work experience
    "location": String,
    "position": String,
    "degree": String,
    "technical": Number,
    "leadership": Number,
    "teamwork": Number,
    communication: Number,
  "details": String value summarizing field experience, key strengths and achievements  in no more than 3 lines. 
  "feedback": String value 
  "optimal": Integer value
  "certifications" : Array of Strings
}

Instructions:  
- Extract data only if explicitly mentioned in the resume; do not hallucinate information.  
- "skills": Return up to 10 most relevant skills.  
- "top_skills": Extract exactly 5 most marketable skills based on industry demand.  
- "experience": Summarize in third person, keeping it concise and impactful.  
  - Highlight projects explicitly if mentioned.  
  - Prioritize the most relevant and high-quality experiences (max 5).  
- "education": Ensure this is a properly formatted array with meaningful academic qualifications along with passing year and start year.  
- "aiScore": Score resumes based on:
      Skill Match % (How well do the candidate's skills match common industry skills?)
      Experience Level (Years of experience, job roles, and seniority)
      Certifications & Education (Extra weight for high-value certifications)
      Resume Formatting & Readability (check if the resume is well-structured)
- "expYears": If the user hasn't stated how many years they've worked, mark expYears as 0
- "feedback": Analyze this resume and suggest improvements for formatting, missing skills, certifications to add and industry relevance.
- "optimal": Provide an integer value that tells how optimized the resume is. Plus points for work experience in top companies and having top certifications
- "certifications" : Array of strings that stores the certifications user has.
- "location" denotes the current working location of the user, if the user has no location specified mark the default value as "Chandigarh"
- "position" signifies the current position of the user in the company, if user doesn't specify a company mark as "unemployed". if user is a student mark as "Student"
- "communication", "technical", "leadership", "teamwork" - each of these will store integer values from 0-100 range signifying the user's expertise in each skill
- "degree" : highest level of qualification user possesses, if not stated mark as "Student"

The JSON must be valid and properly formatted for seamless parsing.`
  );

  return response.response.text();
  console.log(response.response.text());
}

export async function generateCover(resume, jobDescription) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const response = await model.generateContent(`
    You are an expert career coach specializing in writing professional, job-specific cover letters. Your task is to extract relevant details from the resume and job description provided and generate a **fully personalized** cover letter.  

    ### **Candidate Details (Extracted from Resume):**  
    ${resume}  

    ### **Job Description :**  
    ${jobDescription}  

    ### **Instructions:**  
    1. **Extract the following from the resume:**  
      - Candidate's full name  
      - Contact details (if available)  
      - Key skills and experiences  
      - Notable achievements/projects  
      - Most recent job title and company (if available)  

    2. **Extract the following from the job description:**  
      - Job title  
      - Company name  
      - Key responsibilities  
      - Required skills and qualifications  

    3. **Generate a cover letter following this structure:**  
      - **Greeting:** Address the hiring manager by name (if found), otherwise use "Dear Hiring Manager."  
      - **Introduction:** Express enthusiasm for the role and company. Mention the job title and company name.  
      - **Body:** Highlight how the candidate’s skills and experience align with the job requirements. Include a key achievement or project that demonstrates their value.  
      - **Closing:** Express eagerness to interview and contribute to the company’s success.  
      - **Signature:** Use the extracted candidate name at the end.  

    ### **Output Format:**  
    Return **only** the final cover letter as a **single plain text string** with no placeholders or extra formatting. Ensure all extracted details (job title, company name, candidate's name, etc.) are inserted properly.


  `);

  return response.response.text();
}
