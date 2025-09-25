// servicesData.js
import { 
  Heart, 
  Activity, 
  Users, 
  Shield, 
  UserCheck, 
  FileText, 
  Home as HomeIcon, 
  Search, 
  Car, 
  Building, 
  User 
} from "lucide-react";

export const services = [
  {
    id: 1,
    title: "Comprehensive Home Care Solutions",
    shortTitle: "Comprehensive Home Care Solutions",
    icon: Heart,
    hoverInfo: "A full range of personalized services, from companion care to dementia support and transitional care after hospital stays.",
    serviceId: "comprehensive-home-care"
  },
  {
      id: 2,
      title: "Technology-Enabled Peace of Mind",
      shortTitle: "Technology-Enabled Peace of Mind",
      icon: Shield,
      hoverInfo: "Advanced care technology keeps families connected and informed at every step.",
      serviceId: "technology-enabled-care"
    },
    {
      id: 3,
      title: "Transitional Assistance",
      shortTitle: "Transitional Assistance",
      icon: HomeIcon,
      hoverInfo: "Smooth transitions from hospital to home with specialized support and coordination.",
      serviceId: "transitional-assistance"
    },
    {
      id: 4,
      title: "Complete Geriatric Support",
      shortTitle: "Complete Geriatric Support",
      icon: Users,
      hoverInfo: "Holistic geriatric care management to guide aging with assessment, coordination, and family support.",
      serviceId: "geriatric-support"
    },
    {
      id: 5,
      title: "Flexible, Custom Care Plans",
      shortTitle: "Flexible, Custom Care Plans",
      icon: FileText,
      hoverInfo: "Tailored care plans that evolve to fit each client's unique needs and preferences.",
      serviceId: "flexible-care-plans"
    },
    {
      id: 6,
      title: "Nursing Visits & Health Monitoring",
      shortTitle: "Nursing Visits & Health Monitoring",
      icon: Activity,
      hoverInfo: "On-demand nursing visits and chronic condition care to ensure health needs are expertly met at home.",
      serviceId: "nursing-visits"
    },
    {
      id: 7,
      title: "Experienced Care Managers Oversight",
      shortTitle: "Experienced Care Managers Oversight",
      icon: UserCheck,
      hoverInfo: "Led by experienced RNs, we deliver professional care management and health monitoring for complete peace of mind.",
      serviceId: "care-manager-oversight"
    },
    {
      id: 8,
      title: "Mobility and Independence",
      shortTitle: "Mobility and Independence",
      icon: User,
      hoverInfo: "Transportation services help clients stay active and independent in their communities.",
      serviceId: "mobility-independence"
    },
    {
      id: 9,
      title: "Home Search Entity",
      shortTitle: "Home Search Entity",
      icon: Search,
      hoverInfo: "Professional assistance in finding the perfect home or living arrangement to meet your specific care needs.",
      serviceId: "home-search-entity"
    },
    {
      id: 10,
      title: "Non Medical Transportation",
      shortTitle: "Non Medical Transportation",
      icon: Car,
      hoverInfo: "Safe, reliable transportation services for errands, shopping, social visits, and community activities.",
      serviceId: "non-medical-transportation"
    },
    {
      id: 11,
      title: "Assisted Living Referrals",
      shortTitle: "Assisted Living Referrals",
      icon: Building,
      hoverInfo: "Expert guidance and referrals to quality assisted living facilities that match your preferences and care requirements.",
      serviceId: "assisted-living-referrals"
    }
];

export const serviceData = {
  "comprehensive-home-care": {
    id: 1,
    title: "Comprehensive Home Care Solutions",
    icon: Heart,
    heroImage: "/carousel/carousel1.jpg",
    shortDescription: "A full range of personalized services, from companion care to dementia support and transitional care after hospital stays.",
    detailedDescription: "Our comprehensive home care solutions are designed to provide seniors with the highest quality care in the comfort of their own homes. We understand that each individual has unique needs, and our services are tailored to meet those specific requirements while promoting independence and dignity. Personalized home care services tailored to every need from companion support to Alzheimer's and dementia care, ensuring comfort, safety, and independence at home.",
    keyFeatures: [
      "24/7 companion care and supervision",
      "Specialized dementia and Alzheimer's support",
      "Post-hospital transitional care",
      "Medication management and reminders",
      "Personal care and hygiene assistance",
      "Light housekeeping and meal preparation",
      "Transportation to medical appointments",
      "Emergency response coordination"
    ],
    benefits: [
      "Maintain independence in familiar surroundings",
      "Reduce risk of hospital readmissions",
      "Provide peace of mind for family members",
      "Ensure continuity of care across all needs",
      "Support cognitive and emotional well-being",
      "Flexible scheduling to match lifestyle preferences"
    ],
    process: [
      {
        step: "Initial Assessment",
        description: "Comprehensive evaluation of care needs, preferences, and home environment"
      },
      {
        step: "Care Plan Development", 
        description: "Creation of personalized care plan with specific goals and interventions"
      },
      {
        step: "Caregiver Matching",
        description: "Selection of qualified caregivers based on personality and care requirements"
      },
      {
        step: "Implementation & Monitoring",
        description: "Begin care services with ongoing monitoring and adjustments as needed"
      }
    ]
  },

"technology-enabled-care": {
      id: 2,
      title: "Technology-Enabled Peace of Mind",
      icon: Shield,
      heroImage: "/carousel/carousel2.png",
      shortDescription: "Advanced care technology keeps families connected and informed at every step.",
      detailedDescription: "Our technology-enabled care solutions provide families with real-time insights into their loved one's well-being. Through innovative monitoring systems and communication platforms, we ensure transparency, safety, and peace of mind for everyone involved in the care journey. Advanced care technology keeps families informed with online portals and real-time updates, improving communication and confidence in home care.",
      keyFeatures: [
        "Real-time health monitoring and alerts",
        "Family communication portal and updates",
        "Emergency response systems",
        "Medication tracking and reminders",
        "Activity and wellness monitoring",
        "Telehealth appointment coordination",
        "Digital care plan access",
        "GPS tracking for safety (when appropriate)"
      ],
      benefits: [
        "Stay connected with loved ones anywhere, anytime",
        "Receive immediate alerts for health concerns",
        "Track progress and improvements over time",
        "Reduce anxiety through transparent communication",
        "Enable proactive health management",
        "Coordinate care across multiple providers"
      ],
      process: [
        {
          step: "Technology Assessment",
          description: "Evaluate home environment and determine optimal technology solutions"
        },
        {
          step: "System Installation",
          description: "Professional setup of monitoring devices and communication platforms"
        },
        {
          step: "Training & Onboarding",
          description: "Comprehensive training for clients and family members on system use"
        },
        {
          step: "Ongoing Support",
          description: "24/7 technical support and regular system updates"
        }
      ],
     
    },
    "transitional-assistance": {
      id: 3,
      title: "Transitional Assistance",
      icon: HomeIcon,
      heroImage: "/carousel/carousel3.png",
      shortDescription: "Smooth transitions from hospital to home with specialized support and coordination.",
      detailedDescription: "Our transitional assistance program ensures a seamless and safe transition from hospital or rehabilitation facility back to home. We coordinate with healthcare providers, manage discharge plans, and provide intensive support during the critical first weeks at home to prevent readmissions. Smooth hospital-to-home transitions with personalized care support, ensuring safety, recovery, and comfort during the adjustment period.",
      keyFeatures: [
        "Hospital discharge planning coordination",
        "Medication reconciliation and management",
        "Medical appointment scheduling and transport",
        "Home safety assessments and modifications",
        "Intensive monitoring during transition period",
        "Communication with healthcare providers",
        "Family education and support",
        "Equipment setup and training"
      ],
      benefits: [
        "Reduce risk of hospital readmission",
        "Ensure proper medication management",
        "Provide intensive support when most needed",
        "Coordinate complex care requirements",
        "Support family caregivers during adjustment",
        "Identify and address potential complications early"
      ],
      process: [
        {
          step: "Pre-Discharge Planning",
          description: "Coordinate with hospital team to understand discharge requirements and home needs"
        },
        {
          step: "Home Preparation",
          description: "Prepare home environment, arrange equipment, and coordinate services"
        },
        {
          step: "Transition Support",
          description: "Provide intensive care and monitoring during first 30 days at home"
        },
        {
          step: "Long-term Care Planning",
          description: "Transition to ongoing care plan based on recovery progress"
        }
      ],
     
    },
    "geriatric-support": {
      id: 4,
      title: "Complete Geriatric Support",
      icon: Users,
      heroImage: "/carousel/carousel4.png",
      shortDescription: "Holistic geriatric care management to guide aging with assessment, coordination, and family support.",
      detailedDescription: "Our complete geriatric support program provides comprehensive care management specifically designed for older adults. Led by geriatric specialists, we address the complex medical, social, and emotional needs that come with aging, ensuring optimal health and quality of life. Holistic geriatric care designed to manage aging challenges with assessments, family support, and ongoing coordination for optimal well-being.",
      keyFeatures: [
        "Geriatric assessment and care planning",
        "Chronic disease management",
        "Cognitive health monitoring and support",
        "Fall risk assessment and prevention",
        "Social isolation prevention programs",
        "Nutrition and wellness planning",
        "Family caregiver education and support",
        "Healthcare provider coordination"
      ],
      benefits: [
        "Address age-related health challenges proactively",
        "Maintain cognitive function and independence",
        "Prevent falls and related injuries",
        "Manage multiple chronic conditions effectively",
        "Reduce social isolation and depression",
        "Support healthy aging in place"
      ],
      process: [
        {
          step: "Comprehensive Geriatric Assessment",
          description: "Thorough evaluation of physical, cognitive, social, and functional status"
        },
        {
          step: "Individualized Care Planning",
          description: "Development of holistic care plan addressing all aspects of healthy aging"
        },
        {
          step: "Service Coordination",
          description: "Coordination of medical care, social services, and support programs"
        },
        {
          step: "Ongoing Monitoring",
          description: "Regular assessments and plan adjustments to optimize health outcomes"
        }
      ],
      
    },
    "flexible-care-plans": {
      id: 5,
      title: "Flexible, Custom Care Plans",
      icon: FileText,
      heroImage: "/carousel/carousel5.jpg",
      shortDescription: "Tailored care plans that evolve to fit each client's unique needs and preferences.",
      detailedDescription: "We believe that effective care must be as unique as the individual receiving it. Our flexible care plans are designed to adapt to changing needs, preferences, and circumstances, ensuring that care remains relevant, effective, and person-centered throughout the care journey. Customized care plans adapt to changing needs, ensuring each client receives compassionate, effective home care tailored to their lifestyle.",
      keyFeatures: [
        "Personalized care plan development",
        "Regular plan reviews and adjustments",
        "Flexible scheduling options",
        "Multiple service combinations available",
        "Family input and collaboration",
        "Cultural and personal preference integration",
        "Emergency plan modifications",
        "Seasonal care adjustments"
      ],
      benefits: [
        "Receive care that truly fits your lifestyle",
        "Adapt services as needs change over time",
        "Maintain control over your care decisions",
        "Optimize resource allocation and costs",
        "Ensure care remains effective and relevant",
        "Support diverse cultural and personal values"
      ],
      process: [
        {
          step: "Needs Assessment",
          description: "Comprehensive evaluation of current and anticipated care needs"
        },
        {
          step: "Plan Customization",
          description: "Development of personalized care plan with flexible components"
        },
        {
          step: "Implementation",
          description: "Begin services with built-in flexibility for adjustments"
        },
        {
          step: "Ongoing Adaptation",
          description: "Regular reviews and modifications to ensure plan remains optimal"
        }
      ],
     
    },
    "nursing-visits": {
      id: 6,
      title: "Nursing Visits & Health Monitoring",
      icon: Activity,
      heroImage: "/carousel/carousel1.jpg",
      shortDescription: "On-demand nursing visits and chronic condition care to ensure health needs are expertly met at home.",
      detailedDescription: "Our professional nursing services bring clinical expertise directly to your home. Our registered nurses provide skilled care, health monitoring, and medical support to manage complex health conditions and ensure optimal health outcomes in the comfort of home. On-demand and routine in-home nursing visits provide chronic condition management, post-operative care, and health monitoring for peace of mind.",
      keyFeatures: [
        "Registered nurse home visits",
        "Chronic condition management",
        "Medication administration and education",
        "Wound care and post-surgical support",
        "Health monitoring and vital sign checks",
        "IV therapy and injections",
        "Disease-specific education programs",
        "Physician communication and coordination"
      ],
      benefits: [
        "Receive professional nursing care at home",
        "Avoid unnecessary hospital visits",
        "Get expert management of chronic conditions",
        "Ensure proper medication compliance",
        "Monitor health status with clinical precision",
        "Receive education to improve self-care"
      ],
      process: [
        {
          step: "Medical Assessment",
          description: "RN evaluation of medical needs and physician order review"
        },
        {
          step: "Care Plan Development",
          description: "Creation of nursing care plan in coordination with physician"
        },
        {
          step: "Skilled Nursing Care",
          description: "Implementation of nursing interventions and treatments"
        },
        {
          step: "Progress Monitoring",
          description: "Regular assessment and communication with healthcare team"
        }
      ],
      
    },
    "care-manager-oversight": {
      id: 7,
      title: "Experienced Care Managers Oversight",
      icon: UserCheck,
      heroImage: "/carousel/carousel2.png",
      shortDescription: "Led by experienced RNs, we deliver professional care management and health monitoring for complete peace of mind.",
      detailedDescription: "Our care management services are led by experienced registered nurses who oversee all aspects of your care plan. These professional care managers coordinate services, monitor health outcomes, and ensure the highest quality care delivery while serving as your primary point of contact. Skilled care managers provide professional supervision, creating and monitoring care plans to ensure safe, high-quality home care.",
      keyFeatures: [
        "RN-led care management team",
        "24/7 care coordination and oversight",
        "Regular quality assessments",
        "Healthcare provider communication",
        "Emergency response coordination",
        "Caregiver supervision and training",
        "Family communication and updates",
        "Insurance and billing coordination"
      ],
      benefits: [
        "Have a professional advocate managing your care",
        "Ensure continuity and quality across all services",
        "Receive expert clinical oversight",
        "Get coordinated communication with all providers",
        "Have peace of mind with professional management",
        "Benefit from clinical expertise in care decisions"
      ],
      process: [
        {
          step: "Care Manager Assignment",
          description: "Assignment of dedicated RN care manager based on specific needs"
        },
        {
          step: "Comprehensive Care Planning",
          description: "Development of integrated care plan with clinical oversight"
        },
        {
          step: "Service Coordination",
          description: "Management of all care services and provider communications"
        },
        {
          step: "Ongoing Oversight",
          description: "Continuous monitoring and adjustment of care with regular family updates"
        }
      ],
      
    },
    "mobility-independence": {
      id: 8,
      title: "Mobility and Independence",
      icon: User,
      heroImage: "/carousel/carousel3.png",
      shortDescription: "Transportation services help clients stay active and independent in their communities.",
      detailedDescription: "Our mobility and independence services are designed to help seniors maintain their active lifestyle and community connections. Through safe transportation, mobility assistance, and independence support programs, we ensure that physical limitations don't limit life's possibilities. Transportation services for medical appointments and social activities help seniors maintain independence and stay connected with their community.",
      keyFeatures: [
        "Medical appointment transportation",
        "Social and recreational trip assistance",
        "Mobility aid assessment and training",
        "Home safety and accessibility evaluations",
        "Fall prevention programs",
        "Physical therapy coordination",
        "Community engagement support",
        "Emergency transportation services"
      ],
      benefits: [
        "Maintain independence and community connections",
        "Attend important medical appointments safely",
        "Continue enjoying social and recreational activities",
        "Improve mobility and reduce fall risk",
        "Stay engaged with community and friends",
        "Receive professional mobility assessments"
      ],
      process: [
        {
          step: "Mobility Assessment",
          description: "Evaluation of current mobility status and transportation needs"
        },
        {
          step: "Independence Plan",
          description: "Development of personalized plan to maintain and improve independence"
        },
        {
          step: "Service Implementation",
          description: "Begin transportation and mobility support services"
        },
        {
          step: "Progress Monitoring",
          description: "Regular assessment of mobility and adjustment of support services"
        }
      ],
      
      
    },
    "home-search-entity": {
  id: 9,
  title: "Home Search Entity",
  icon: Search,
  heroImage: "/carousel/carousel4.png",
  shortDescription: "Professional assistance in finding the perfect home or living arrangement to meet your specific care needs.",
  detailedDescription: "Our Home Search Entity service provides expert guidance in finding the ideal living environment that supports your care requirements and lifestyle preferences. We understand that the right home can significantly impact quality of life, especially when managing health conditions or mobility challenges. Our specialists conduct comprehensive assessments to match you with properties that offer accessibility, safety, and comfort while considering proximity to healthcare facilities, family, and community resources.",
  keyFeatures: [
    "Comprehensive needs assessment for ideal living environment",
    "Accessibility and safety evaluation of potential homes",
    "Neighborhood analysis focusing on healthcare access and amenities",
    "Coordination with real estate professionals specializing in accessible housing",
    "Budget planning and financial guidance for housing transitions",
    "Move-in coordination and setup assistance",
    "Post-move support and adjustment period guidance",
    "Future-proofing recommendations for aging in place"
  ],
  benefits: [
    "Find homes designed for accessibility and safety",
    "Save time and reduce stress in the home search process",
    "Ensure your living environment supports your care needs",
    "Access to specialized real estate networks",
    "Make informed decisions with professional guidance",
    "Smooth transition to new living arrangements"
  ],
  process: [
    {
      step: "Needs Assessment",
      description: "Comprehensive evaluation of care requirements, mobility needs, and lifestyle preferences"
    },
    {
      step: "Property Search",
      description: "Curated selection of homes matching specific accessibility and location criteria"
    },
    {
      step: "Home Evaluation",
      description: "Professional assessment of potential properties for safety and accessibility features"
    },
    {
      step: "Transition Support",
      description: "Coordination of moving logistics and setup for immediate comfort and safety"
    }
  ]
},

"non-medical-transportation": {
  id: 10,
  title: "Non Medical Transportation",
  icon: Car,
  heroImage: "/carousel/carousel5.jpg",
  shortDescription: "Safe, reliable transportation services for errands, shopping, social visits, and community activities.",
  detailedDescription: "Our Non Medical Transportation service ensures you can maintain your independence and stay connected with your community. We provide door-to-door transportation with trained drivers who understand the unique needs of seniors and individuals with mobility challenges. Whether it's medical appointments, grocery shopping, social gatherings, or recreational activities, our reliable service helps you stay active and engaged while ensuring safety and comfort throughout your journey.",
  keyFeatures: [
    "Door-to-door assistance with trained drivers",
    "Vehicles equipped with accessibility features (ramps, lifts)",
    "Flexible scheduling for regular or one-time trips",
    "Companion drivers providing assistance and companionship",
    "Wait-and-return service for appointments and errands",
    "Emergency backup transportation options",
    "Regular route optimization for efficiency",
    "Weather-appropriate vehicle preparation"
  ],
  benefits: [
    "Maintain independence and social connections",
    "Access essential services and appointments reliably",
    "Reduce isolation through community engagement",
    "Travel safely with trained assistance",
    "Flexible scheduling to fit your needs",
    "Peace of mind for family members"
  ],
  process: [
    {
      step: "Transportation Assessment",
      description: "Evaluate mobility needs, frequent destinations, and scheduling requirements"
    },
    {
      step: "Service Planning",
      description: "Create personalized transportation schedule and route optimization"
    },
    {
      step: "Driver Matching",
      description: "Assign trained drivers familiar with specific needs and preferences"
    },
    {
      step: "Ongoing Coordination",
      description: "Regular schedule reviews and adjustments based on changing needs"
    }
  ]
},

"assisted-living-referrals": {
  id: 11,
  title: "Assisted Living Referrals",
  icon: Building,
  heroImage: "/carousel/carousel1.jpg",
  shortDescription: "Expert guidance and referrals to quality assisted living facilities that match your preferences and care requirements.",
  detailedDescription: "Our Assisted Living Referrals service provides personalized guidance in selecting the ideal assisted living community that meets your care needs, lifestyle preferences, and budget. We have extensive knowledge of local facilities and their specialties, allowing us to match you with communities that offer the right level of care, amenities, and social opportunities. Our comprehensive approach includes facility tours, cost analysis, and transition planning to ensure a smooth and successful move to your new home.",
  keyFeatures: [
    "Comprehensive database of licensed assisted living facilities",
    "Personalized matching based on care levels and preferences",
    "Facility tours and on-site assessments",
    "Cost comparison and financial planning assistance",
    "Transition coordination and move-in support",
    "Follow-up visits and adjustment period support",
    "Family consultation and decision-making guidance",
    "Knowledge of specialized care communities (memory care, etc.)"
  ],
  benefits: [
    "Access to vetted, quality assisted living options",
    "Save time and reduce stress in the selection process",
    "Make informed decisions with expert guidance",
    "Ensure proper care level matching",
    "Smooth transition to new living environment",
    "Ongoing support during adjustment period"
  ],
  process: [
    {
      step: "Care Needs Assessment",
      description: "Evaluate current and future care requirements, preferences, and budget"
    },
    {
      step: "Facility Research & Matching",
      description: "Identify suitable assisted living communities based on specific criteria"
    },
    {
      step: "Tours & Evaluations",
      description: "Coordinate visits and provide professional assessments of facilities"
    },
    {
      step: "Transition Planning",
      description: "Support with move coordination, paperwork, and adjustment period"
    }
  ]
}
};