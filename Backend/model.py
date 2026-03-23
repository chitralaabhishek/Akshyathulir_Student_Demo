from pydantic import BaseModel, EmailStr
from typing import Optional, List

# ─────────────────────────────────────────
#  PROFILE
# ─────────────────────────────────────────
class BranchAddress(BaseModel):
    fullAddress: Optional[str] = ""
    country:     Optional[str] = ""
    state:       Optional[str] = ""
    district:    Optional[str] = ""
    city:        Optional[str] = ""
    area:        Optional[str] = ""
    pinCode:     Optional[str] = ""
    isPrimary:   Optional[bool] = False

class StartupApplication(BaseModel):
    firstName:            Optional[str] = ""
    lastName:             Optional[str] = ""
    logo:                 Optional[str] = ""
    email:                EmailStr
    dateOfBirth:          Optional[str] = ""
    gender:               Optional[str] = ""
    phoneCountry:         Optional[str] = "India"
    phoneCode:            Optional[str] = "+91"
    phone:                Optional[str] = ""
    linkedin:             Optional[str] = ""
    website:              Optional[str] = ""
    designation:          Optional[str] = ""
    cin:                  Optional[str] = ""
    startupName:          Optional[str] = ""
    legalStatus:          Optional[str] = ""
    dateOfEstablishment:  Optional[str] = ""
    primarySector:        Optional[str] = ""
    secondarySector:      Optional[str] = ""
    companyPAN:           Optional[str] = ""
    gstin:                Optional[str] = ""
    companyWebsite:       Optional[str] = ""
    numberOfBranches:     Optional[int] = 1
    branchAddresses:      List[BranchAddress] = []
    currentTeamSize:      Optional[int] = 0
    maleCount:            Optional[int] = 0
    femaleCount:          Optional[int] = 0
    founderFirstName:     Optional[str] = ""
    founderLastName:      Optional[str] = ""
    founderEmail:         Optional[EmailStr] = None
    founderPhoneCountry:  Optional[str] = "India"
    founderPhoneCode:     Optional[str] = "+91"
    founderPhone:         Optional[str] = ""
    founderDOB:           Optional[str] = ""
    founderGender:        Optional[str] = ""
    founderLinkedIn:      Optional[str] = ""
    founderFacebook:      Optional[str] = ""
    fundingNeeded:        Optional[str] = ""
    mentorshipNeeded:     Optional[str] = ""
    technologySupport:    Optional[str] = ""
    incubationSpace:      Optional[str] = ""
    registrationNeeded:   Optional[str] = ""
    supportInterest:      Optional[str] = ""
    governmentSchemes:    Optional[str] = ""
    placementOffered:     Optional[str] = ""
    placementType:        Optional[str] = ""
    internshipOffered:    Optional[str] = ""
    internshipType:       Optional[str] = ""
    trainingOffered:      Optional[str] = ""
    trainingType:         List[str] = []
    fypOffered:           Optional[str] = ""


# ─────────────────────────────────────────
#  TEAM MANAGEMENT
# ─────────────────────────────────────────
class TeamMember(BaseModel):
    userEmail:  str           # owner's profile email
    firstName:  str
    lastName:   str
    email:      EmailStr      # team member's own email
    gender:     Optional[str] = ""
    date:       Optional[str] = ""
    dept:       Optional[str] = ""
    role:       Optional[str] = ""
    status:     Optional[str] = "Active"


# ─────────────────────────────────────────
#  MY CLIENTS
# ─────────────────────────────────────────
class Client(BaseModel):
    userEmail:  str
    company:    str
    contact:    str
    email:      EmailStr
    industry:   Optional[str] = ""
    project:    Optional[str] = ""
    startDate:  Optional[str] = ""
    status:     Optional[str] = "Active"


# ─────────────────────────────────────────
#  MILESTONE TRACKING
# ─────────────────────────────────────────
class Milestone(BaseModel):
    userEmail:  str
    title:      str
    category:   Optional[str] = "Product"
    dueDate:    Optional[str] = ""
    priority:   Optional[str] = "Medium"
    status:     Optional[str] = "Planning"
    progress:   Optional[int] = 0


# ─────────────────────────────────────────
#  PRODUCT ROADMAP
# ─────────────────────────────────────────
class RoadmapFeature(BaseModel):
    userEmail:  str
    feature:    str
    priority:   Optional[str] = "Medium"
    start:      Optional[str] = ""
    target:     Optional[str] = ""
    status:     Optional[str] = "Planned"
    progress:   Optional[int] = 0


# ─────────────────────────────────────────
#  LEGAL COMPLIANCE
# ─────────────────────────────────────────
class LegalItem(BaseModel):
    userEmail:  str
    title:      str
    category:   Optional[str] = "Regulatory"
    due:        Optional[str] = ""
    priority:   Optional[str] = "Medium"
    status:     Optional[str] = "Pending"


# ─────────────────────────────────────────
#  FUNDRAISING — CAMPAIGNS
# ─────────────────────────────────────────
class InvestmentRange(BaseModel):
    min: Optional[float] = 0
    max: Optional[float] = 0

class FundraisingCampaign(BaseModel):
    userEmail:             str
    productName:           str
    scope:                 Optional[str] = ""
    targetAmount:          Optional[float] = 0
    raisedAmount:          Optional[float] = 0
    investorType:          Optional[str] = "multiple"
    investmentRange:       Optional[InvestmentRange] = InvestmentRange()
    singleInvestorAmount:  Optional[float] = None
    investmentFocus:       Optional[str] = "Ideation"
    netWorthDeclaration:   Optional[float] = 0
    pastInvestments:       Optional[str] = ""
    investorRelation:      Optional[str] = ""
    status:                Optional[str] = "Active"
    deadline:              Optional[str] = ""
    createdDate:           Optional[str] = ""


# ─────────────────────────────────────────
#  FUNDRAISING — INVESTORS
# ─────────────────────────────────────────
class Investor(BaseModel):
    userEmail:      str
    name:           str
    type:           Optional[str] = "VC Firm"
    investmentSize: Optional[float] = 0
    status:         Optional[str] = "Interested"
    lastContact:    Optional[str] = ""
    stage:          Optional[str] = "Initial Contact"
    focusAreas:     Optional[str] = ""
    relation:       Optional[str] = "New"


# ─────────────────────────────────────────
#  FUNDRAISING — COMMUNICATIONS
# ─────────────────────────────────────────
class Communication(BaseModel):
    userEmail:    str
    investorName: str
    type:         Optional[str] = "Email"
    subject:      str
    date:         Optional[str] = ""
    status:       Optional[str] = "Scheduled"
    notes:        Optional[str] = ""


# ─────────────────────────────────────────
#  SCHEMES  (global — no userEmail needed)
# ─────────────────────────────────────────
class Scheme(BaseModel):
    category: str
    title:    str
    amount:   Optional[str] = ""
    deadline: Optional[str] = ""
    location: Optional[str] = ""
    tags:     List[str]     = []


# ─────────────────────────────────────────
#  OPPORTUNITIES  (global listing — admin CRUD)
# ─────────────────────────────────────────
class Opportunity(BaseModel):
    type:         str                    # Internship | Job | Project | Training
    title:        str
    organization: str
    location:     Optional[str] = ""
    stipend:      Optional[str] = ""
    duration:     Optional[str] = ""
    deadline:     Optional[str] = ""
    description:  Optional[str] = ""
    applyLink:    Optional[str] = ""
    tags:         List[str]     = []


# ─────────────────────────────────────────
#  OPPORTUNITY APPLICATIONS (per-user tracker)
# ─────────────────────────────────────────
class OpportunityApplication(BaseModel):
    userEmail:        str       # profile email of the applicant
    opportunityId:    str       # _id of the Opportunity document
    opportunityTitle: str       # denormalized for quick display
    type:             str       # Internship | Job | Project | Training
    organization:     Optional[str] = ""
    appliedOn:        Optional[str] = ""
    status:           Optional[str] = "Applied"   # Applied | Shortlisted | Rejected | Offered
    notes:            Optional[str] = ""


# ─────────────────────────────────────────
#  COURSES
# ─────────────────────────────────────────
class Course(BaseModel):
    email:       str
    name:        str
    category:    Optional[str] = ""
    duration:    Optional[str] = ""
    fees:        Optional[str] = ""
    status:      Optional[str] = "Active"
    trainer:     Optional[str] = ""
    description: Optional[str] = ""
    syllabus:    List[str]     = []
    outcomes:    List[str]     = []
    enrolled:    Optional[int] = 0