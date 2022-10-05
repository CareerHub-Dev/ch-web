type RawSessionData = {
  accountId: string;
  role: string;
  jwtToken: string;
  jwtTokenExpires: string;
  refreshToken: string;
};

interface AppNavigationLink {
  href: string;
  text: string;
  exact?: boolean;
}

interface JobOfferFilter {
  searchTerm?: string;
  jobType?: string;
  workFormat?: string;
  experienceLevel?: string;
  jobPositionId?: string;
  tagIds: Array<string>;
}

interface Tag {
  id: string;
  name: string;
}

namespace JobOffersFeed {
  interface JobOffer {
    id: string;
    companyId: string;
    companyName: string;
    title: string;
    endDate: string;
    amountSubscribers: number;
    amountAppliedCVs: number;
    tags: Array<Tag>;
  }
}

namespace JobOfferDetails {
  interface JobOffer {
    id: string;
    companyId: string;
    companyName: string;
    title: string;
    overview: string;
    requirements: string;
    responsibilities: string;
    startDate: string;
    endDate: string;
    jobPositionId: string;
    jobType: string;
    workFormat: string;
    experienceLevel: string;
    tags: Array<Tag>;
  }
}

namespace JobOfferForm {
  type JobOffer = {
    title: string;
    overview: string;
    requirements: string;
    responsibilities: string;
    preferences: string;
    imageFile: string;
    startDate: string;
    endDate: string;
    jobType: string;
    workFormat: string;
    experienceLevel: string;
    jobPositionId: string;
    tagIds: Array<string>;
  };
}

type ValueOf<T> = T[keyof T];
type AnyFn = (...args: any[]) => any;
type Nullable<T> = T | null;
type AuthDataConsistency = 'ok' | 'error';
type IndexedObject<T extends Object> = T & { id: string };
type ArrayInput<T> = {
  value: Array<T>;
  isValid: boolean;
  isTouched: boolean;
};
type StringInput = {
  value: string;
  isValid: boolean;
  isTouched: boolean;
};
interface WithVerificationComponentProps<Props> {
  authDataConsistency: AuthDataConsistency;
  props: Props;
}
