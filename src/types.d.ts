declare namespace Types {
  interface Mapping {
    id: number;
    nusModuleFaculty: string;
    nusModuleCode: string;
    nusModuleName: string;
    nusModuleCredits: number;
    partnerModuleCode: string;
    partnerModuleName: string;
    partnerModuleCredits: number;
    partnerUniversityId: string;
    updatedAt: string;
  }

  interface Country {
    name: string;
  }

  interface Link {
    link: string;
    name: string;
  }

  interface University {
    id: number;
    name: string;
    slug: string;
    state: string;
    countryId: number;
    additionalInfo: Record<string, string>;
    updatedAt: string;
    Country: Country;
    Links: Link[];
    Mappings: Mapping[];
  }
}
