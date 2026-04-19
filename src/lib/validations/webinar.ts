import { z } from "zod";

export const webinarRegistrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  state: z.string().optional(),
  city: z.string().optional(),
  industry: z.string().min(1, "Industry is required"),
  timezone: z.string().min(1, "Timezone is required"),
  howDidYouHear: z.string().optional(),
  topicsOfInterest: z.array(z.string()).min(1, "Select at least one topic of interest"),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
  subscribeUpdates: z.boolean().default(false).optional(),
});

export type WebinarRegistrationInput = z.infer<typeof webinarRegistrationSchema>;

export const webinarSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  scheduledAt: z.string().or(z.date()).transform((val) => new Date(val)),
  meetingLink: z.string().url("Invalid meeting link").optional().or(z.literal("")),
  isActive: z.boolean().default(true),
});

export type WebinarInput = z.infer<typeof webinarSchema>;

export const industries = [
  "Tech", "Finance", "Healthcare", "Education", "Manufacturing", 
  "Retail", "Telecom", "Energy", "Govt", "Non-profit", 
  "Consulting", "Media", "Real Estate", "Transport", 
  "Agriculture", "Other"
];

export const hearAboutUsOptions = [
  "Social Media",
  "Email Newsletter",
  "Friend/Colleague",
  "Search Engine",
  "Advertisement",
  "Other"
];

export const interestTopics = [
  "AI & Machine Learning",
  "Digital Transformation",
  "Cybersecurity",
  "Cloud Computing",
  "Blockchain",
  "Data Analytics",
  "Entrepreneurship",
  "Marketing Strategy"
];
