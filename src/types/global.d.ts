type PaginatedRequestParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
  order?: string;
};

type PaginatedQueryParams = Omit<PaginatedQueryParams, "pageNumber">;

type JobOfferFilter = {
  search?: string;
  jobType?: string;
  workFormat?: string;
  experienceLevel?: string;
  jobPositionId?: string;
  tagIds: Array<string>;
};

type Tag = {
  id: string;
  name: string;
};

namespace JobOffersFeed {
  type JobOffer = {
    id: string;
    companyId: string;
    companyName: string;
    title: string;
    endDate: string;
    amountSubscribers: number;
    amountAppliedCVs: number;
    tags: Array<Tag>;
  };
}

namespace JobOfferDetails {
  type JobOffer = {
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
  };
}

namespace JobOfferForm {
  type JobOffer = {
    title: string;
    overview: string;
    requirements: string;
    responsibilities: string;
    preferences: string;
    image?: string;
    jobType: string;
    workFormat: string;
    experienceLevel: string;
    startDate: string;
    endDate: string;
    jobPositionId: string;
    tagIds: Array<string>;
  };
}

type ValueOf<T> = T[keyof T];

type AnyFn = (...args: any[]) => any;

type Nullable<T> = T | null;

type AuthDataConsistency = "ok" | "error";

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

namespace Inputs {
  type Validator<T> = (val: T) =>
    | {
        message: string;
        type: "error" | "warning";
      }
    | {
        type: "success";
      };

  type BaseInput = {
    wasChanged: boolean;
    warnings: string[];
    errors: string[];
  };

  type StringInput = {
    value: string;
    wasBlurred: boolean;
  } & BaseInput;

  type ArrayInput<T> = {
    items: Array<T>;
  } & BaseInput;
}
