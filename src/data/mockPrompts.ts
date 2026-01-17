import type { Prompt } from "@/types/prompt";

export const mockPrompts: Prompt[] = [
  {
    id: "1",
    title: "UI/UX Design Expert",
    description: "Act as a UI/UX designer and generate a comprehensive design for any application.",
    prompt_text: "Act as a senior UI/UX designer with 10 years of experience. I need you to create a comprehensive UI/UX design for [PROJECT]. Include: 1) User persona analysis 2) User journey mapping 3) Wireframe descriptions 4) Color palette suggestions 5) Typography recommendations 6) Accessibility considerations. Make it modern, clean, and user-centric.",
    category: "UI/UX",
    tags: ["design", "user-experience", "wireframe"]
  },
  {
    id: "2",
    title: "Code Generation Specialist",
    description: "Generate clean, production-ready code for any programming task.",
    prompt_text: "Act as a senior software engineer. Generate production-ready code for [TASK]. Requirements: 1) Use best practices and design patterns 2) Include error handling 3) Add comprehensive comments 4) Make it modular and reusable 5) Include unit test examples 6) Follow SOLID principles. Language: [LANGUAGE]",
    category: "Coding",
    tags: ["code", "development", "programming"]
  },
  {
    id: "3",
    title: "Bug Fixing Assistant",
    description: "Analyze code and fix bugs with detailed explanations.",
    prompt_text: "Act as a debugging expert. Analyze the following code and: 1) Identify all bugs and issues 2) Explain why each bug occurs 3) Provide fixed code 4) Suggest preventive measures 5) Recommend testing strategies. Code:\n[PASTE CODE HERE]",
    category: "Bug Fixing",
    tags: ["debug", "fix", "troubleshoot"]
  },
  {
    id: "4",
    title: "PRD Creator",
    description: "Create comprehensive Product Requirement Documents.",
    prompt_text: "Act as a senior product manager. Create a detailed PRD for [PRODUCT]. Include: 1) Executive summary 2) Problem statement 3) Goals and success metrics 4) User stories 5) Feature specifications 6) Technical requirements 7) Timeline and milestones 8) Risks and mitigations 9) Dependencies",
    category: "PRD",
    tags: ["product", "requirements", "documentation"]
  },
  {
    id: "5",
    title: "Content Writer Pro",
    description: "Write engaging, SEO-optimized content for any platform.",
    prompt_text: "Act as a professional content writer with SEO expertise. Write [TYPE OF CONTENT] about [TOPIC]. Requirements: 1) Engaging headline 2) Hook in the first paragraph 3) SEO-optimized with keywords naturally integrated 4) Clear structure with subheadings 5) Call-to-action 6) Target audience: [AUDIENCE] 7) Tone: [TONE]",
    category: "Writing",
    tags: ["content", "seo", "copywriting"]
  },
  {
    id: "6",
    title: "Productivity System Designer",
    description: "Design personalized productivity systems and workflows.",
    prompt_text: "Act as a productivity coach and systems designer. Create a personalized productivity system for someone who [SITUATION]. Include: 1) Daily routine template 2) Task prioritization framework 3) Time blocking schedule 4) Tool recommendations 5) Weekly review process 6) Habit tracking system 7) Energy management tips",
    category: "Productivity",
    tags: ["productivity", "workflow", "habits"]
  },
  {
    id: "7",
    title: "API Documentation Writer",
    description: "Generate comprehensive API documentation with examples.",
    prompt_text: "Act as a technical writer specializing in API documentation. Document the following API endpoint: [ENDPOINT]. Include: 1) Endpoint description 2) Request method and URL 3) Headers 4) Request body schema 5) Response examples (success and error) 6) Code examples in multiple languages 7) Rate limiting info 8) Authentication details",
    category: "Coding",
    tags: ["api", "documentation", "technical"]
  },
  {
    id: "8",
    title: "Email Marketing Expert",
    description: "Craft high-converting email sequences and campaigns.",
    prompt_text: "Act as an email marketing specialist. Create a [NUMBER]-email sequence for [PURPOSE]. For each email include: 1) Subject line (A/B variants) 2) Preview text 3) Email body 4) CTA 5) Optimal send time 6) Target segment. Overall strategy should focus on [GOAL] with a [TONE] tone.",
    category: "Writing",
    tags: ["email", "marketing", "conversion"]
  },
  {
    id: "9",
    title: "Mobile App UX Auditor",
    description: "Perform comprehensive UX audits for mobile applications.",
    prompt_text: "Act as a mobile UX expert. Perform a comprehensive UX audit for [APP NAME/DESCRIPTION]. Analyze: 1) Onboarding flow 2) Navigation patterns 3) Touch target sizes 4) Loading states 5) Error handling 6) Accessibility 7) Gesture support 8) Performance perception. Provide specific recommendations with priority levels.",
    category: "UI/UX",
    tags: ["mobile", "audit", "ux-review"]
  },
  export {};
    id: "10",
