// Realistic sample data for Multi-School ID Studio
// Supports multi-tenant school identity management

export const SAMPLE_SCHOOLS = [
  {
    id: "SCH-001",
    name: "Delhi Public Global Academy",
    code: "DPGA-HYD",
    affiliation: "CBSE Affiliated #3630129",
    address: "Plot 42, Silicon Corridor, Gachibowli, Hyderabad - 500032",
    contactPhone: "+91 98480 12345",
    contactEmail: "admin@delhipublicglobal.edu.in",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=160&auto=format&fit=crop&q=80",
    totalStudents: 3420,
    generatedCards: 3180,
    pendingCards: 240,
    printedCards: 2950,
    badgeColor: "#1e3a8a",
    tagline: "Inspiring Excellence & Integrity"
  },
  {
    id: "SCH-002",
    name: "St. Xavier's International School",
    code: "SXIS-BLR",
    affiliation: "ICSE Board #KA-084",
    address: "Bishop Cotton Road, Richmond Town, Bengaluru - 560025",
    contactPhone: "+91 94490 88765",
    contactEmail: "principal@stxaviersintl.edu.in",
    logo: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=160&auto=format&fit=crop&q=80",
    totalStudents: 2150,
    generatedCards: 1890,
    pendingCards: 260,
    printedCards: 1650,
    badgeColor: "#065f46",
    tagline: "Faith, Fortitude and Fellowship"
  },
  {
    id: "SCH-003",
    name: "Kendriya Vidyalaya Mega Campus",
    code: "KVMC-VIZ",
    affiliation: "KVS Regional Office #AP-012",
    address: "Waltair Uplands, Siripuram, Visakhapatnam - 530003",
    contactPhone: "+91 89125 67432",
    contactEmail: "office@kvmegacampus.ac.in",
    logo: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=160&auto=format&fit=crop&q=80",
    totalStudents: 4890,
    generatedCards: 4200,
    pendingCards: 690,
    printedCards: 3800,
    badgeColor: "#831843",
    tagline: "Knowledge Unlocks Tomorrow"
  },
  {
    id: "SCH-004",
    name: "Oakridge Heritage Residential High",
    code: "OHRS-PUN",
    affiliation: "IB World School #003418",
    address: "Baner Hills Expressway, Sector 4, Pune - 411045",
    contactPhone: "+91 98230 45678",
    contactEmail: "idstudio@oakridgeheritage.org",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=160&auto=format&fit=crop&q=80",
    totalStudents: 1620,
    generatedCards: 1620,
    pendingCards: 0,
    printedCards: 1620,
    badgeColor: "#78350f",
    tagline: "Tradition Meets Innovation"
  }
];

export const DEMO_CREDENTIALS = {
  admin: {
    role: "ADMIN",
    passcode: "AGENCY-2026",
    mobile: "9876543210",
    userFullName: "Rajesh Kumar Sharma",
    agencyName: "Apex Identity & Print Solutions Ltd.",
    designation: "Chief Print Operator & Admin"
  },
  parent: {
    role: "PARENT",
    passcode: "PAR-5501",
    mobile: "9123456789",
    userFullName: "Venkat Rao S.",
    childName: "Aditya Sharma",
    childRoll: "DPGA-2026-0842",
    schoolName: "Delhi Public Global Academy"
  }
};

