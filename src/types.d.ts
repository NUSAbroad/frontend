declare namespace Types {
  interface Mapping {
    id: number;
    nusFacultyId: number;
    nusModuleFaculty: string;
    nusModuleCode: string;
    nusModuleName: string;
    nusModuleCredits: number;
    partnerModuleCode: string;
    partnerModuleName: string;
    partnerModuleCredits: number;
    partnerUniversityId: number;
    updatedAt: string;
  }

  interface Country {
    id?: number;
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
    state: string | null;
    countryId: number;
    mappingsCount?: number;
    additionalInfo: Record<string, string> | null;
    updatedAt: string;
    Country: Country;
    Links: Link[];
    Semesters: Semester[];
    Faculties: Faculty[];
    Mappings: Mapping[];
  }

  interface Faculty {
    name: string;
    type: string;
  }

  interface Semester {
    description: string;
  }

  interface Toast {
    id: string;
    message: string;
    canUndo?: boolean;
  }
}
