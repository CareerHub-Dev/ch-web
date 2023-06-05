export enum ReviewStatus {
  InProgress = "In Progress",
  Success = "Success",
  Rejected = "Rejected",
}

export function matchReviewStatus(status: string): ReviewStatus {
  switch (status.toUpperCase()) {
    case "IN_PROGRESS":
      return ReviewStatus.InProgress;
    case "SUCCESS":
      return ReviewStatus.Success;
    case "REJECTED":
      return ReviewStatus.Rejected;
    default:
      return ReviewStatus.InProgress;
  }
}

export function reviewStatusToLocalizedString(
  status: ReviewStatus,
  locale: "EN" | "UA" = "UA",
) {
  switch (status) {
    case ReviewStatus.InProgress:
      return locale === "EN" ? "In Progress" : "В процесі";
    case ReviewStatus.Success:
      return locale === "EN" ? "Success" : "Успішно";
    case ReviewStatus.Rejected:
      return locale === "EN" ? "Rejected" : "Відхилено";
    default:
      return locale === "EN" ? "In Progress" : "В процесі";
  }
}
