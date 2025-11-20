export interface CountyResource {
  name: string;
  populationRank: number;
  populationEstimate: string;
  tipWebsite: {
    label: string;
    url: string;
  };
  nonEmergency: {
    agency: string;
    phone: string;
  };
  additionalNotes?: string;
}

export const countyResources: CountyResource[] = [
  {
    name: "Wake County",
    populationRank: 1,
    populationEstimate: "1,175,021",
    tipWebsite: {
      label: "Raleigh / Wake City-County Bureau of Identification",
      url: "https://raleighcrimestoppers.org/",
    },
    nonEmergency: {
      agency: "Wake County Sheriff's Office",
      phone: "919-856-6900",
    },
    additionalNotes: "Use the online form or call to connect directly with Wake County deputies.",
  },
  {
    name: "Mecklenburg County",
    populationRank: 2,
    populationEstimate: "1,143,338",
    tipWebsite: {
      label: "CMPD Online Reporting",
      url: "https://www.charlottenc.gov/cmpd/Report-a-Crime",
    },
    nonEmergency: {
      agency: "Charlotte-Mecklenburg Police Department",
      phone: "704-336-7600",
    },
    additionalNotes: "CMPD handles countywide municipal policing including the City of Charlotte.",
  },
  {
    name: "Guilford County",
    populationRank: 3,
    populationEstimate: "546,615",
    tipWebsite: {
      label: "Greensboro / Guilford Crime Stoppers",
      url: "https://www.ggcrimestoppers.com/",
    },
    nonEmergency: {
      agency: "Greensboro Police Department",
      phone: "336-373-2222",
    },
    additionalNotes: "Anonymous tips go straight to Greensboro detectives for review.",
  },
  {
    name: "Forsyth County",
    populationRank: 4,
    populationEstimate: "389,157",
    tipWebsite: {
      label: "Winston-Salem Crime Stoppers",
      url: "https://www.cityofws.org/FormCenter/Police-Department-Tips-10/Crime-Stoppers-Tip-Form-56",
    },
    nonEmergency: {
      agency: "Winston-Salem Police Department",
      phone: "336-773-7700",
    },
    additionalNotes: "Submit online or call the department's non-emergency communications center.",
  },
  {
    name: "Cumberland County",
    populationRank: 5,
    populationEstimate: "334,728",
    tipWebsite: {
      label: "Fayetteville / Cumberland Crimestoppers",
      url: "https://fay-nccrimestoppers.org/",
    },
    nonEmergency: {
      agency: "Fayetteville Police Department",
      phone: "910-433-1529",
    },
    additionalNotes: "The Fayetteville Police Department manages the county's largest call volume.",
  },
  {
    name: "Durham County",
    populationRank: 6,
    populationEstimate: "332,155",
    tipWebsite: {
      label: "Durham Police Submit a Crime Tip",
      url: "https://durhamnc.gov/197/Submit-a-Crime-Tip",
    },
    nonEmergency: {
      agency: "Durham Police Department",
      phone: "919-560-4600",
    },
    additionalNotes: "Durham's police department routes every online tip to investigators.",
  },
  {
    name: "Buncombe County",
    populationRank: 7,
    populationEstimate: "276,824",
    tipWebsite: {
      label: "Asheville Police Submit a Tip",
      url: "https://www.ashevillenc.gov/department/police/submit-a-tip/",
    },
    nonEmergency: {
      agency: "Asheville Police Department",
      phone: "828-252-1110",
    },
    additionalNotes: "Reach Asheville PD dispatchers for Buncombe County's largest city.",
  },
  {
    name: "Union County",
    populationRank: 8,
    populationEstimate: "259,532",
    tipWebsite: {
      label: "Union County Crime Stoppers",
      url: "https://unioncountycrimestoppers.com/",
    },
    nonEmergency: {
      agency: "Union County Sheriff's Office",
      phone: "704-283-3789",
    },
    additionalNotes: "Submit tips directly to the sheriff's investigators in Union County.",
  },
  {
    name: "New Hanover County",
    populationRank: 9,
    populationEstimate: "235,413",
    tipWebsite: {
      label: "Wilmington Police Submit a Crime Tip",
      url: "https://www.wilmingtonnc.gov/departments/police-department/services-programs/submit-a-crime-tip",
    },
    nonEmergency: {
      agency: "Wilmington Police Department",
      phone: "910-452-6120",
    },
    additionalNotes: "Wilmington PD answers non-emergency calls for the New Hanover metro area.",
  },
  {
    name: "Gaston County",
    populationRank: 10,
    populationEstimate: "232,714",
    tipWebsite: {
      label: "Gaston County Crime Stoppers",
      url: "https://crimestoppersgaston.org/",
    },
    nonEmergency: {
      agency: "Gaston County Police Department",
      phone: "704-866-3320",
    },
    additionalNotes: "Complete the secure form to reach Gaston County Police investigators.",
  },
];

export const countyResourcesSorted = countyResources
  .slice()
  .sort((a, b) => a.populationRank - b.populationRank);
