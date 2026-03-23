from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URL)

db = client["startup_profiles"]

# ─── Collections ──────────────────────────────────────────────
profile_collection          = db["profile"]
team_collection             = db["team_members"]
clients_collection          = db["clients"]
milestones_collection       = db["milestones"]
roadmap_collection          = db["roadmap_features"]
legal_collection            = db["legal_compliance"]
campaigns_collection        = db["fundraising_campaigns"]
investors_collection        = db["fundraising_investors"]
communications_collection   = db["fundraising_communications"]
schemes_collection          = db["schemes"]
opportunities_collection    = db["opportunities"]
opp_applications_collection = db["opportunity_applications"]
courses_collection          = db["courses"]


# ══════════════════════════════════════════════════════════════
#  AUTO-SEED SCHEMES
# ══════════════════════════════════════════════════════════════
SCHEMES_DATA = [
    # TECH & INNOVATION
    {"category": "Tech & Innovation", "title": "Startup India Seed Fund Scheme",   "amount": "20,00,000",       "deadline": "Apr 15, 2026", "location": "India",     "tags": ["Startup", "Seed", "Govt"]},
    {"category": "Tech & Innovation", "title": "AI Innovation Mission Grant",       "amount": "5,00,000",        "deadline": "May 20, 2026", "location": "Bangalore", "tags": ["AI", "Innovation"]},
    {"category": "Tech & Innovation", "title": "IoT Smart Infrastructure Grant",    "amount": "8,00,000",        "deadline": "Jun 10, 2026", "location": "Hyderabad", "tags": ["IoT", "SmartCity"]},
    {"category": "Tech & Innovation", "title": "SaaS Product Accelerator Program",  "amount": "3,00,000",        "deadline": "Jul 01, 2026", "location": "Remote",    "tags": ["SaaS", "B2B"]},
    {"category": "Tech & Innovation", "title": "Blockchain Startup Support Fund",   "amount": "4,00,000",        "deadline": "Jul 20, 2026", "location": "Pune",      "tags": ["Blockchain", "Web3"]},
    {"category": "Tech & Innovation", "title": "AR/VR Product Development Grant",   "amount": "6,00,000",        "deadline": "Aug 05, 2026", "location": "Mumbai",    "tags": ["AR", "VR"]},
    {"category": "Tech & Innovation", "title": "5G Solutions Innovation Challenge", "amount": "2,50,000",        "deadline": "Aug 25, 2026", "location": "Chennai",   "tags": ["5G", "Telecom"]},
    {"category": "Tech & Innovation", "title": "GreenTech Startup Grant",           "amount": "7,50,000",        "deadline": "Sep 15, 2026", "location": "Bangalore", "tags": ["GreenTech", "Sustainability"]},
    {"category": "Tech & Innovation", "title": "EdTech Innovation Fund",            "amount": "4,00,000",        "deadline": "Oct 01, 2026", "location": "Delhi",     "tags": ["EdTech", "Education"]},
    {"category": "Tech & Innovation", "title": "FinTech Startup Growth Scheme",     "amount": "10,00,000",       "deadline": "Oct 20, 2026", "location": "Mumbai",    "tags": ["FinTech", "Startup"]},
    # RESEARCH & SCIENCE
    {"category": "Research & Science", "title": "Junior Research Fellowship (JRF)",  "amount": "31,000 / month", "deadline": "Feb 20, 2026", "location": "New Delhi",  "tags": ["Research", "Govt"]},
    {"category": "Research & Science", "title": "Biotech Innovation Research Grant", "amount": "10,00,000",      "deadline": "Apr 10, 2026", "location": "Chennai",    "tags": ["BioTech", "Science"]},
    {"category": "Research & Science", "title": "Space Technology Startup Program",  "amount": "25,00,000",      "deadline": "Jun 01, 2026", "location": "Bangalore",  "tags": ["SpaceTech", "ISRO"]},
    {"category": "Research & Science", "title": "Clean Energy Research Initiative",  "amount": "15,00,000",      "deadline": "Jun 20, 2026", "location": "Hyderabad",  "tags": ["Energy", "Green"]},
    {"category": "Research & Science", "title": "Robotics & Automation Fellowship",  "amount": "6,00,000",       "deadline": "Sep 15, 2026", "location": "Bangalore",  "tags": ["Robotics", "Automation"]},
    {"category": "Research & Science", "title": "AI in Healthcare Research Grant",   "amount": "8,00,000",       "deadline": "Jul 25, 2026", "location": "Pune",       "tags": ["AI", "Healthcare"]},
    {"category": "Research & Science", "title": "Climate Change Resilience Program", "amount": "20,00,000",      "deadline": "Aug 30, 2026", "location": "Remote",     "tags": ["Climate", "Environment"]},
    {"category": "Research & Science", "title": "Quantum Computing Mission",         "amount": "18,00,000",      "deadline": "Oct 01, 2026", "location": "Delhi",      "tags": ["Quantum", "DeepTech"]},
    {"category": "Research & Science", "title": "AgriTech Research Grant",           "amount": "7,50,000",       "deadline": "Oct 20, 2026", "location": "Punjab",     "tags": ["AgriTech", "Research"]},
    {"category": "Research & Science", "title": "Data Science Research Award",       "amount": "4,00,000",       "deadline": "Nov 05, 2026", "location": "Hyderabad",  "tags": ["DataScience", "AI"]},
    # WOMEN EMPOWERMENT
    {"category": "Women Empowerment", "title": "Women Founder Startup Grant",          "amount": "10,00,000", "deadline": "Apr 15, 2026", "location": "Bangalore",   "tags": ["Startup", "Women"]},
    {"category": "Women Empowerment", "title": "Women in Coding Fellowship",           "amount": "3,50,000",  "deadline": "Mar 01, 2026", "location": "Remote",      "tags": ["Coding", "Women"]},
    {"category": "Women Empowerment", "title": "SheTech Innovation Program",           "amount": "5,00,000",  "deadline": "May 30, 2026", "location": "Kolkata",     "tags": ["Tech", "Women"]},
    {"category": "Women Empowerment", "title": "Mompreneur Business Support Scheme",   "amount": "4,00,000",  "deadline": "Jun 05, 2026", "location": "Remote",      "tags": ["Business", "Women"]},
    {"category": "Women Empowerment", "title": "Women Leadership Development Grant",   "amount": "2,50,000",  "deadline": "Jul 10, 2026", "location": "Pune",        "tags": ["Leadership", "Women"]},
    {"category": "Women Empowerment", "title": "Women in STEM Research Support",       "amount": "5,00,000",  "deadline": "Aug 01, 2026", "location": "Delhi",       "tags": ["STEM", "Research"]},
    {"category": "Women Empowerment", "title": "Digital Inclusion for Women Startups", "amount": "1,50,000",  "deadline": "Jul 30, 2026", "location": "Remote",      "tags": ["Digital", "Social"]},
    {"category": "Women Empowerment", "title": "Women Entrepreneur Growth Fund",       "amount": "6,00,000",  "deadline": "Sep 01, 2026", "location": "Mumbai",      "tags": ["Entrepreneurship", "Women"]},
    {"category": "Women Empowerment", "title": "Rural Women Startup Support",          "amount": "3,00,000",  "deadline": "Oct 10, 2026", "location": "Rural India", "tags": ["Rural", "Women"]},
    {"category": "Women Empowerment", "title": "Women Innovation Challenge",           "amount": "2,00,000",  "deadline": "Nov 01, 2026", "location": "Hyderabad",   "tags": ["Innovation", "Women"]},
    # GOVT. SCHEMES
    {"category": "Govt. Schemes", "title": "MUDRA Yojana",             "amount": "Up to 10L",            "deadline": "Rolling",      "location": "India",       "tags": ["Loans", "MSME"]},
    {"category": "Govt. Schemes", "title": "Stand Up India Scheme",    "amount": "10L to 1Cr",           "deadline": "Rolling",      "location": "India",       "tags": ["SC/ST", "Women"]},
    {"category": "Govt. Schemes", "title": "Atal Innovation Mission",  "amount": "10,00,000",            "deadline": "May 01, 2026", "location": "India",       "tags": ["Innovation", "Startup"]},
    {"category": "Govt. Schemes", "title": "PM YUVA Yojana",           "amount": "50,000",               "deadline": "Jun 15, 2026", "location": "India",       "tags": ["Youth", "Mentorship"]},
    {"category": "Govt. Schemes", "title": "ASPIRE Scheme",            "amount": "Variable",             "deadline": "Aug 01, 2026", "location": "Rural India", "tags": ["Rural", "Startup"]},
    {"category": "Govt. Schemes", "title": "NIDHI-EIR Program",        "amount": "30,000 / month",       "deadline": "Jun 30, 2026", "location": "Incubators",  "tags": ["Incubation", "Startup"]},
    {"category": "Govt. Schemes", "title": "Digital India Internship", "amount": "10,000 / month",       "deadline": "May 20, 2026", "location": "India",       "tags": ["Digital", "Internship"]},
    {"category": "Govt. Schemes", "title": "FAME India EV Scheme",     "amount": "Subsidy",              "deadline": "Jul 15, 2026", "location": "India",       "tags": ["EV", "Green"]},
    {"category": "Govt. Schemes", "title": "PM Kaushal Vikas Yojana",  "amount": "Training",             "deadline": "Rolling",      "location": "India",       "tags": ["Skill", "Training"]},
    {"category": "Govt. Schemes", "title": "National Startup Awards",  "amount": "Recognition + Grants", "deadline": "Sep 30, 2026", "location": "India",       "tags": ["Awards", "Startup"]},
]

def auto_seed_schemes():
    if schemes_collection.count_documents({}) == 0:
        schemes_collection.insert_many(SCHEMES_DATA)
        print(f"✅ Auto-seeded {len(SCHEMES_DATA)} schemes into MongoDB.")
    else:
        print("✅ Schemes already exist. Skipping seed.")


# ══════════════════════════════════════════════════════════════
#  AUTO-SEED OPPORTUNITIES
# ══════════════════════════════════════════════════════════════






# ══════════════════════════════════════════════════════════════
#  AUTO-SEED COURSES
# ══════════════════════════════════════════════════════════════
COURSES_SEED = [
    {
        "name": "FullStack Development", "category": "IT & Software",
        "duration": "6 months", "fees": "2500", "trainer": "John Smith",
        "status": "Active", "enrolled": 45,
        "description": "Learn frontend and backend development using modern frameworks and tools.",
        "syllabus": ["HTML, CSS, JavaScript", "React.js", "Node.js & Express", "MongoDB", "Project & Deployment"],
        "outcomes": ["Build full stack applications", "Deploy real-world projects", "Industry-ready skills"],
    },
    {
        "name": "Data Science & Analytics", "category": "IT & Software",
        "duration": "8 months", "fees": "3200", "trainer": "Sarah Johnson",
        "status": "Active", "enrolled": 38,
        "description": "Master data analysis, visualization, and machine learning techniques.",
        "syllabus": ["Python & NumPy", "Pandas & Visualization", "Statistics", "Machine Learning", "Capstone Project"],
        "outcomes": ["Analyze real datasets", "Build ML models", "Data Scientist career"],
    },
    {
        "name": "Mobile App Development", "category": "IT & Software",
        "duration": "5 months", "fees": "2800", "trainer": "Mike Brown",
        "status": "Active", "enrolled": 32,
        "description": "Build Android & cross-platform mobile applications from scratch.",
        "syllabus": ["UI/UX Basics", "Android Studio", "Kotlin", "API Integration", "Play Store Deployment"],
        "outcomes": ["Create Android apps", "Publish apps", "Mobile developer skills"],
    },
    {
        "name": "Cloud Computing (AWS)", "category": "IT & Software",
        "duration": "4 months", "fees": "2000", "trainer": "Emily Davis",
        "status": "Active", "enrolled": 28,
        "description": "Learn cloud infrastructure, deployment, and AWS services.",
        "syllabus": ["Cloud Basics", "EC2 & S3", "IAM", "Cloud Security", "Deployment Projects"],
        "outcomes": ["AWS certification ready", "Deploy cloud apps", "Cloud engineer role"],
    },
    {
        "name": "Cyber Security", "category": "IT & Software",
        "duration": "6 months", "fees": "3000", "trainer": "Alex Turner",
        "status": "Active", "enrolled": 40,
        "description": "Protect systems and networks from cyber threats.",
        "syllabus": ["Network Security", "Ethical Hacking", "Penetration Testing", "Firewalls", "Security Tools"],
        "outcomes": ["Cyber security analyst", "Ethical hacker skills", "Security certifications"],
    },
    {
        "name": "UI / UX Design", "category": "Design",
        "duration": "3 months", "fees": "1800", "trainer": "Jessica Lee",
        "status": "Active", "enrolled": 25,
        "description": "Design user-friendly and visually appealing digital products.",
        "syllabus": ["Design Principles", "Figma", "Wireframing", "Prototyping", "Portfolio Project"],
        "outcomes": ["UI/UX designer role", "Design portfolio", "User-centered thinking"],
    },
    {
        "name": "Artificial Intelligence", "category": "IT & Software",
        "duration": "7 months", "fees": "3500", "trainer": "Dr. Robert White",
        "status": "Active", "enrolled": 30,
        "description": "Learn AI concepts, algorithms, and real-world applications.",
        "syllabus": ["AI Fundamentals", "Search Algorithms", "Neural Networks", "Deep Learning", "AI Projects"],
        "outcomes": ["AI engineer skills", "Build intelligent systems", "Advanced ML knowledge"],
    },
    {
        "name": "Digital Marketing", "category": "Marketing",
        "duration": "3 months", "fees": "1500", "trainer": "Rachel Green",
        "status": "Active", "enrolled": 50,
        "description": "Promote brands and products using digital platforms.",
        "syllabus": ["SEO", "Social Media Marketing", "Google Ads", "Email Marketing", "Campaign Analytics"],
        "outcomes": ["Digital marketer role", "Run ad campaigns", "Marketing analytics"],
    },
]

def auto_seed_courses():
    if courses_collection.count_documents({}) == 0:
        courses_collection.insert_many(COURSES_SEED)
        print(f"✅ Auto-seeded {len(COURSES_SEED)} courses into MongoDB.")
    else:
        print("✅ Courses already exist. Skipping seed.")

auto_seed_courses()


# ══════════════════════════════════════════════════════════════
#  INTERNSHIPS, JOBS, PROJECTS  (from friend's student dashboard)
# ══════════════════════════════════════════════════════════════
internships_collection = db["internships"]
jobs_collection        = db["part_time_jobs"]
projects_collection    = db["startup_projects"]

INTERNSHIPS_SEED = [
    {
        "title": "Frontend Developer Intern", "company": "TechNexus", "domain": "IT",
        "location": "Remote", "stipend": "₹15,000/month", "duration": "3 Months",
        "role": "Frontend Developer",
        "description": "Work on cutting-edge React applications for a fast-growing startup. You'll collaborate with the design team to build pixel-perfect UIs.",
        "responsibilities": ["Build reusable React components", "Integrate REST APIs", "Write unit tests", "Collaborate with UI/UX designers"],
        "requirements": ["Knowledge of React.js", "HTML/CSS proficiency", "Git basics", "Good communication skills"],
    },
    {
        "title": "Data Analyst Intern", "company": "FinTech Labs", "domain": "Data Science",
        "location": "Bangalore", "stipend": "₹20,000/month", "duration": "6 Months",
        "role": "Data Analyst",
        "description": "Analyze financial datasets and build dashboards to support product decisions. Work with senior data scientists on real business problems.",
        "responsibilities": ["Clean and analyze datasets", "Build Power BI dashboards", "Generate weekly reports", "Present insights to stakeholders"],
        "requirements": ["Python & Pandas", "SQL knowledge", "Data visualization skills", "Analytical mindset"],
    },
    {
        "title": "Machine Learning Intern", "company": "AI Ventures", "domain": "Robotics/AI",
        "location": "Remote", "stipend": "₹25,000/month", "duration": "4 Months",
        "role": "ML Engineer",
        "description": "Build and train ML models alongside senior AI researchers. Work on real-world NLP and computer vision problems.",
        "responsibilities": ["Train and evaluate ML models", "Preprocess datasets", "Write research documentation", "Deploy models to staging"],
        "requirements": ["Python & TensorFlow", "Linear algebra basics", "Jupyter Notebook", "Eager to learn"],
    },
    {
        "title": "Cybersecurity Intern", "company": "CipherGuard", "domain": "Cybersecurity",
        "location": "Chennai", "stipend": "₹18,000/month", "duration": "3 Months",
        "role": "Security Analyst",
        "description": "Assist the security team in vulnerability assessments and penetration testing on client systems.",
        "responsibilities": ["Run vulnerability scans", "Write security reports", "Assist in pen testing", "Monitor SIEM alerts"],
        "requirements": ["Basic networking knowledge", "Linux familiarity", "Curiosity for security", "Attention to detail"],
    },
    {
        "title": "Backend Developer Intern", "company": "CloudSoft", "domain": "IT",
        "location": "Pune", "stipend": "₹18,000/month", "duration": "6 Months",
        "role": "Backend Developer",
        "description": "Design REST APIs and work with cloud infrastructure. Own complete backend features from design to deployment.",
        "responsibilities": ["Build FastAPI/Node.js APIs", "Design MongoDB schemas", "Write API documentation", "Deploy to AWS"],
        "requirements": ["Node.js or Python", "MongoDB basics", "REST API design", "Problem-solving skills"],
    },
    {
        "title": "Business Development Intern", "company": "GrowthBase", "domain": "Business",
        "location": "Delhi", "stipend": "₹12,000/month", "duration": "2 Months",
        "role": "BD Executive",
        "description": "Identify new business opportunities and assist the BD team in lead generation, outreach and partnership development.",
        "responsibilities": ["Research potential clients", "Draft outreach emails", "Maintain CRM records", "Join client calls"],
        "requirements": ["Good communication", "MS Excel", "Research skills", "Sales mindset"],
    },
]

JOBS_SEED = [
    {
        "title": "Part-Time React Developer", "company": "StartupX", "domain": "IT",
        "location": "Remote", "pay": "₹500/hr", "shift": "Flexible",
        "description": "Work on client-facing React projects on a flexible schedule. Great for students or freelancers looking for steady part-time work.",
        "requirements": ["React.js", "REST API integration", "Git", "2+ hours/day availability"],
        "responsibilities": ["Develop and maintain React components", "Fix UI bugs", "Participate in weekly standups", "Code reviews"],
    },
    {
        "title": "Content Writer", "company": "BrandCo", "domain": "Marketing",
        "location": "Remote", "pay": "₹300/hr", "shift": "Morning",
        "description": "Write SEO-optimized blog posts, social media content, and marketing copy for tech and startup clients.",
        "requirements": ["Strong English writing", "SEO basics", "Research skills", "WordPress familiarity"],
        "responsibilities": ["Write 3-4 articles per week", "Keyword research", "Edit and proofread content", "Meet deadlines"],
    },
    {
        "title": "Social Media Manager", "company": "DigitalPulse", "domain": "Marketing",
        "location": "Remote", "pay": "₹250/hr", "shift": "Evening",
        "description": "Manage Instagram, LinkedIn, and Twitter accounts for multiple startup clients. Schedule posts and track engagement.",
        "requirements": ["Social media knowledge", "Canva basics", "Analytics tools", "Creative mindset"],
        "responsibilities": ["Plan monthly content calendars", "Design posts in Canva", "Respond to comments", "Report monthly metrics"],
    },
    {
        "title": "Data Entry Executive", "company": "Analytics Co", "domain": "Data",
        "location": "Chennai", "pay": "₹150/hr", "shift": "Morning",
        "description": "Perform data entry, cleaning and basic analysis tasks for a data analytics firm. Ideal for freshers.",
        "requirements": ["MS Excel", "Typing speed 40+ WPM", "Attention to detail", "Basic computer skills"],
        "responsibilities": ["Enter and verify data", "Clean spreadsheets", "Generate basic reports", "Flag inconsistencies"],
    },
    {
        "title": "Customer Support Executive", "company": "SaaSify", "domain": "Business",
        "location": "Bangalore", "pay": "₹200/hr", "shift": "Night",
        "description": "Handle customer queries via chat and email for a SaaS product. Ensure customer satisfaction and resolve issues promptly.",
        "requirements": ["Good communication", "Patience and empathy", "Basic tech knowledge", "Fast typing"],
        "responsibilities": ["Respond to support tickets", "Escalate critical issues", "Update FAQ documentation", "Achieve CSAT targets"],
    },
    {
        "title": "Graphic Designer", "company": "DesignHub", "domain": "Design",
        "location": "Remote", "pay": "₹400/hr", "shift": "Flexible",
        "description": "Create visual assets including banners, social posts, pitch decks and brand kits for startup clients.",
        "requirements": ["Figma or Adobe Suite", "Typography knowledge", "Portfolio required", "Eye for detail"],
        "responsibilities": ["Design marketing assets", "Create brand guidelines", "Iterate based on feedback", "Deliver production-ready files"],
    },
]

PROJECTS_SEED = [
    {
        "title": "E-Commerce AI Chatbot", "startup": "TechNexus", "domain": "IT",
        "duration": "3 Months", "type": "Paid",
        "tech": ["React", "Node.js", "OpenAI API"],
        "description": "Build an AI-powered chatbot for retail to automate customer support and product recommendations.",
        "tasks": ["Design conversational UI using React", "Integrate NLP APIs for intent recognition", "Build Node.js webhooks for real-time order status", "Deploy and monitor the chatbot"],
    },
    {
        "title": "Autonomous Drone Navigator", "startup": "SkyBots", "domain": "Robotics/AI",
        "duration": "6 Months", "type": "Non-Paid",
        "tech": ["Python", "ROS", "LIDAR"],
        "description": "Develop navigation logic for drones to operate autonomously in complex environments using sensor fusion.",
        "tasks": ["Implement A* and Dijkstra for path planning", "Process LIDAR and camera sensor data", "Develop flight control scripts in ROS", "Simulate in Gazebo environment"],
    },
    {
        "title": "Blockchain Auth System", "startup": "CipherGuard", "domain": "Cybersecurity",
        "duration": "4 Months", "type": "Paid",
        "tech": ["Solidity", "Web3.js", "Ethereum"],
        "description": "Create a decentralized authentication system replacing passwords with blockchain-based digital signatures.",
        "tasks": ["Develop Smart Contracts in Solidity", "Integrate Web3 wallet-based login", "Optimize gas consumption", "Write security audit documentation"],
    },
    {
        "title": "Predictive Health Monitor", "startup": "BioPulse", "domain": "Robotics/AI",
        "duration": "2 Months", "type": "Non-Paid",
        "tech": ["TensorFlow", "IoT", "Python"],
        "description": "Develop a system using wearable IoT sensors to predict potential health issues before they escalate.",
        "tasks": ["Build data pipelines from IoT hardware", "Train predictive ML models", "Design real-time alert system", "Create mobile-friendly dashboard"],
    },
    {
        "title": "Inventory Management SaaS", "startup": "FlowState", "domain": "IT",
        "duration": "5 Months", "type": "Paid",
        "tech": ["Next.js", "PostgreSQL", "Redis"],
        "description": "Build a scalable SaaS platform for real-time inventory tracking and automated restocking alerts.",
        "tasks": ["Design relational DB schema", "Build Next.js SSR dashboards", "Implement RBAC for warehouse managers", "Integrate barcode scanning"],
    },
    {
        "title": "Network Intrusion Detector", "startup": "WallSecure", "domain": "Cybersecurity",
        "duration": "3 Months", "type": "Paid",
        "tech": ["C++", "Linux", "libpcap"],
        "description": "Develop a low-level network monitoring tool that flags unauthorized access attempts in real-time.",
        "tasks": ["Capture raw packets using libpcap in C++", "Create pattern-matching engine for attack signatures", "Build automated logging system", "Develop alert notification pipeline"],
    },
]

def auto_seed_internships():
    if internships_collection.count_documents({}) == 0:
        internships_collection.insert_many(INTERNSHIPS_SEED)
        print(f"✅ Seeded {len(INTERNSHIPS_SEED)} internships")

def auto_seed_jobs():
    if jobs_collection.count_documents({}) == 0:
        jobs_collection.insert_many(JOBS_SEED)
        print(f"✅ Seeded {len(JOBS_SEED)} part-time jobs")

def auto_seed_projects():
    if projects_collection.count_documents({}) == 0:
        projects_collection.insert_many(PROJECTS_SEED)
        print(f"✅ Seeded {len(PROJECTS_SEED)} projects")

auto_seed_internships()
auto_seed_jobs()
auto_seed_projects()


# ══════════════════════════════════════════════════════════════
#  OPPORTUNITIES SEED  (Internships + Projects + Part-Time Jobs)
#  All stored in one collection with "type" field
# ══════════════════════════════════════════════════════════════
OPPORTUNITIES_SEED = [

    # ── INTERNSHIPS ────────────────────────────────────────────
    {
        "type": "Internship",
        "title": "Frontend Developer",
        "organization": "CropSmile Tech",
        "location": "Remote",
        "stipend": "₹10,000/month",
        "domain": "IT",
        "role": "Engineer",
        "duration": "3 Months",
        "deadline": "Open",
        "description": "Work on cutting-edge React applications for our agricultural technology platform.",
        "responsibilities": [
            "Develop UI components",
            "Integrate APIs",
            "Optimize performance"
        ],
        "requirements": [
            "React expertise",
            "CSS/Material UI",
            "Available for 3 months"
        ],
        "tags": ["React", "IT", "Remote"],
    },
    {
        "type": "Internship",
        "title": "AI Research Intern",
        "organization": "InnoBotics Corp",
        "location": "Chennai",
        "stipend": "₹15,000/month",
        "domain": "Robotics/AI",
        "role": "Research",
        "duration": "4 Months",
        "deadline": "Open",
        "description": "Assist in developing computer vision models for autonomous warehouse robots.",
        "responsibilities": [
            "Data annotation",
            "Model testing",
            "Research documentation"
        ],
        "requirements": [
            "Python knowledge",
            "Basic Machine Learning",
            "Analytical mindset"
        ],
        "tags": ["Python", "AI", "Computer Vision"],
    },
    {
        "type": "Internship",
        "title": "Security Analyst",
        "organization": "SecureNet Solutions",
        "location": "Bangalore",
        "stipend": "₹12,000/month",
        "domain": "Cybersecurity",
        "role": "Analyst",
        "duration": "3 Months",
        "deadline": "Open",
        "description": "Join our security operations center to monitor network traffic and protect enterprise-level data from emerging digital threats.",
        "responsibilities": [
            "Monitor system logs for unusual activity",
            "Perform regular vulnerability scans",
            "Document and report security incidents"
        ],
        "requirements": [
            "Knowledge of TCP/IP and firewalls",
            "Familiarity with Linux systems",
            "Analytical mindset for threat detection"
        ],
        "tags": ["Cybersecurity", "Linux", "Networking"],
    },
    {
        "type": "Internship",
        "title": "React Native Developer",
        "organization": "Thulir Labs",
        "location": "Remote",
        "stipend": "₹8,000/month",
        "domain": "IT",
        "role": "Developer",
        "duration": "3 Months",
        "deadline": "Open",
        "description": "Build high-performance, cross-platform mobile applications using React Native for our growing user base.",
        "responsibilities": [
            "Develop reusable mobile UI components",
            "Integrate REST APIs and third-party SDKs",
            "Debug and fix performance bottlenecks"
        ],
        "requirements": [
            "Strong JavaScript (ES6+) skills",
            "Experience with React Hooks",
            "Understanding of iOS/Android design patterns"
        ],
        "tags": ["React Native", "Mobile", "JavaScript"],
    },
    {
        "type": "Internship",
        "title": "Robotics Software Intern",
        "organization": "Automation Labs",
        "location": "Hyderabad",
        "stipend": "₹14,000/month",
        "domain": "Robotics/AI",
        "role": "Engineer",
        "duration": "4 Months",
        "deadline": "Open",
        "description": "Work on the software layer of autonomous robots, focusing on perception, path planning, and sensor integration.",
        "responsibilities": [
            "Write Python/C++ code for robot modules",
            "Test sensor data fusion in simulations",
            "Collaborate on hardware-software interfaces"
        ],
        "requirements": [
            "Proficiency in Python or C++",
            "Basic knowledge of ROS",
            "Strong grasp of Linear Algebra"
        ],
        "tags": ["Python", "ROS", "Robotics"],
    },
    {
        "type": "Internship",
        "title": "Cloud Security Intern",
        "organization": "CyberShield",
        "location": "Remote",
        "stipend": "₹18,000/month",
        "domain": "Cybersecurity",
        "role": "Specialist",
        "duration": "3 Months",
        "deadline": "Open",
        "description": "Assist in securing cloud-based infrastructures and implementing automated security controls for distributed systems.",
        "responsibilities": [
            "Configure IAM policies and access controls",
            "Monitor cloud security alerts and logs",
            "Audit cloud resources for misconfigurations"
        ],
        "requirements": [
            "Understanding of AWS, Azure, or GCP",
            "Knowledge of cloud encryption basics",
            "Interest in DevSecOps practices"
        ],
        "tags": ["AWS", "Cloud", "Security"],
    },

    # ── PROJECTS ───────────────────────────────────────────────
    {
        "type": "Project",
        "title": "E-Commerce AI Chatbot",
        "organization": "TechNexus",
        "location": "Remote",
        "stipend": "Paid",
        "domain": "IT",
        "duration": "3 Months",
        "deadline": "Open",
        "pay_type": "Paid",
        "tech": ["React", "Node.js"],
        "description": "Build an AI-powered bot for retail to automate customer support and product recommendations.",
        "responsibilities": [
            "Design and implement the conversational UI using React components",
            "Integrate Natural Language Processing (NLP) APIs for intent recognition",
            "Develop backend webhooks in Node.js to fetch real-time order status"
        ],
        "tags": ["React", "Node.js", "AI", "IT"],
    },
    {
        "type": "Project",
        "title": "Autonomous Drone Navigator",
        "organization": "SkyBots",
        "location": "Remote",
        "stipend": "Certificate",
        "domain": "Robotics/AI",
        "duration": "6 Months",
        "deadline": "Open",
        "pay_type": "Non-Paid",
        "tech": ["Python", "ROS"],
        "description": "Develop navigation logic for drones to operate autonomously in complex environments.",
        "responsibilities": [
            "Implement A* and Dijkstra algorithms for efficient path planning",
            "Process real-time LIDAR and camera sensor data for obstacle avoidance",
            "Develop and test flight control scripts using the ROS framework"
        ],
        "tags": ["Python", "ROS", "Robotics/AI"],
    },
    {
        "type": "Project",
        "title": "Blockchain Auth System",
        "organization": "CipherGuard",
        "location": "Remote",
        "stipend": "Paid",
        "domain": "Cybersecurity",
        "duration": "4 Months",
        "deadline": "Open",
        "pay_type": "Paid",
        "tech": ["Solidity", "Web3"],
        "description": "Create a decentralized authentication system that replaces traditional passwords with digital signatures.",
        "responsibilities": [
            "Develop secure Smart Contracts using Solidity for user identity storage",
            "Integrate Web3 providers to allow wallet-based login for web apps",
            "Optimize gas consumption for on-chain credential verification"
        ],
        "tags": ["Solidity", "Web3", "Cybersecurity"],
    },
    {
        "type": "Project",
        "title": "Predictive Health Monitor",
        "organization": "BioPulse",
        "location": "Remote",
        "stipend": "Certificate",
        "domain": "Robotics/AI",
        "duration": "2 Months",
        "deadline": "Open",
        "pay_type": "Non-Paid",
        "tech": ["TensorFlow", "IoT"],
        "description": "Develop a system that uses wearable IoT sensors to predict potential health issues.",
        "responsibilities": [
            "Build data pipelines to stream vital sign data from IoT hardware",
            "Train predictive machine learning models using TensorFlow",
            "Design an alert system for anomalous health patterns"
        ],
        "tags": ["TensorFlow", "IoT", "AI"],
    },
    {
        "type": "Project",
        "title": "Inventory Management SaaS",
        "organization": "FlowState",
        "location": "Remote",
        "stipend": "Paid",
        "domain": "IT",
        "duration": "5 Months",
        "deadline": "Open",
        "pay_type": "Paid",
        "tech": ["Next.js", "PostgreSQL"],
        "description": "Build a scalable SaaS platform for real-time inventory tracking and automated restocking.",
        "responsibilities": [
            "Architect a relational database schema for high-volume inventory logs",
            "Develop high-performance dashboard views using Next.js SSR",
            "Implement role-based access control (RBAC) for warehouse managers"
        ],
        "tags": ["Next.js", "PostgreSQL", "SaaS"],
    },
    {
        "type": "Project",
        "title": "Network Intrusion Detector",
        "organization": "WallSecure",
        "location": "Remote",
        "stipend": "Paid",
        "domain": "Cybersecurity",
        "duration": "3 Months",
        "deadline": "Open",
        "pay_type": "Paid",
        "tech": ["C++", "Linux"],
        "description": "Develop a low-level network monitoring tool that flags unauthorized access attempts in real-time.",
        "responsibilities": [
            "Capture and analyze raw network packets using libpcap in C++",
            "Create a pattern-matching engine to detect known attack signatures",
            "Develop an automated logging and notification system for security alerts"
        ],
        "tags": ["C++", "Linux", "Cybersecurity"],
    },

    # ── PART-TIME JOBS ─────────────────────────────────────────
    {
        "type": "Job",
        "title": "Technical Support",
        "organization": "Global IT Solutions",
        "location": "Chennai",
        "stipend": "₹500/hr",
        "domain": "IT",
        "shift": "Evening",
        "duration": "Part-Time",
        "deadline": "Open",
        "description": "Provide first-level technical assistance for software and hardware issues.",
        "responsibilities": [
            "Respond to user support tickets",
            "Troubleshoot software and hardware issues",
            "Escalate complex problems to senior engineers"
        ],
        "requirements": ["Basic IT knowledge", "Good communication", "Patient and detail-oriented"],
        "tags": ["IT", "Support", "Chennai"],
    },
    {
        "type": "Job",
        "title": "AI Data Labeler",
        "organization": "InnoBotics Corp",
        "location": "Remote",
        "stipend": "₹300/hr",
        "domain": "Robotics/AI",
        "shift": "Flexible",
        "duration": "Part-Time",
        "deadline": "Open",
        "description": "Work with our AI team to annotate and label image datasets for training computer vision models.",
        "responsibilities": [
            "Annotate images using labeling tools",
            "Ensure data quality and consistency",
            "Meet daily labeling targets"
        ],
        "requirements": ["Attention to detail", "Basic computer skills", "Interest in AI"],
        "tags": ["AI", "Remote", "Flexible"],
    },
    {
        "type": "Job",
        "title": "Network Monitor",
        "organization": "SecureNet",
        "location": "Bangalore",
        "stipend": "₹600/hr",
        "domain": "Cybersecurity",
        "shift": "Night",
        "duration": "Part-Time",
        "deadline": "Open",
        "description": "Monitor server logs and network traffic for a 24/7 security operations center.",
        "responsibilities": [
            "Monitor SIEM dashboards for alerts",
            "Investigate and escalate suspicious activity",
            "Maintain shift logs and incident reports"
        ],
        "requirements": ["Basic networking knowledge", "Linux command line", "Alertness during night shifts"],
        "tags": ["Cybersecurity", "Networking", "Bangalore"],
    },
    {
        "type": "Job",
        "title": "Junior Web Dev",
        "organization": "Thulir Labs",
        "location": "Remote",
        "stipend": "₹450/hr",
        "domain": "IT",
        "shift": "Flexible",
        "duration": "Part-Time",
        "deadline": "Open",
        "description": "Assist in maintaining and updating small-scale web applications for clients.",
        "responsibilities": [
            "Fix UI bugs and update content",
            "Test features across browsers",
            "Commit clean code to Git"
        ],
        "requirements": ["HTML/CSS/JavaScript", "Basic React knowledge", "Git basics"],
        "tags": ["Web Dev", "Remote", "Flexible"],
    },
    {
        "type": "Job",
        "title": "Lab Assistant",
        "organization": "RoboTech Univ",
        "location": "Hyderabad",
        "stipend": "₹400/hr",
        "domain": "Robotics/AI",
        "shift": "Morning",
        "duration": "Part-Time",
        "deadline": "Open",
        "description": "Help organize the robotics lab and maintain hardware components for student and research projects.",
        "responsibilities": [
            "Maintain and calibrate lab equipment",
            "Assist students during lab sessions",
            "Record inventory and component usage"
        ],
        "requirements": ["Basic electronics knowledge", "Organized and punctual", "Interest in robotics"],
        "tags": ["Robotics", "Hyderabad", "On-site"],
    },
    {
        "type": "Job",
        "title": "Security Auditor",
        "organization": "WallSecure",
        "location": "Chennai",
        "stipend": "₹700/hr",
        "domain": "Cybersecurity",
        "shift": "Weekend",
        "duration": "Part-Time",
        "deadline": "Open",
        "description": "Perform scheduled security audits for office networks and prepare compliance reports.",
        "responsibilities": [
            "Run network vulnerability scans",
            "Review firewall rules and access logs",
            "Prepare audit reports for management"
        ],
        "requirements": ["Security audit experience", "Networking knowledge", "Report writing skills"],
        "tags": ["Security", "Audit", "Chennai"],
    },
]


def auto_seed_opportunities():
    if opportunities_collection.count_documents({}) == 0:
        opportunities_collection.insert_many(OPPORTUNITIES_SEED)
        print(f"✅ Auto-seeded {len(OPPORTUNITIES_SEED)} opportunities (Internships + Projects + Jobs)")
    else:
        print("✅ Opportunities already exist. Skipping seed.")


auto_seed_opportunities()