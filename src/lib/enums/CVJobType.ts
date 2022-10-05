import { cvTemplateLocalization } from '../../models/resources/localization';

enum CVJobType {
  Dev = 'dev',
  QA = 'qa',
  Finances = 'finances',
  Marketing = 'marketing',
  Sales = 'sales',
  CustomerService = 'customerService',
  Design = 'design',
}

export default CVJobType;

export const matchJobTypeToLocalizedString = (jobType: string) => {
  switch (jobType) {
    case CVJobType.Dev:
      return cvTemplateLocalization.jobType.dev;
    case CVJobType.QA:
      return cvTemplateLocalization.jobType.qa;
    case CVJobType.Finances:
      return cvTemplateLocalization.jobType.economics;
    case CVJobType.Marketing:
      return cvTemplateLocalization.jobType.marketing;
    case CVJobType.Sales:
      return cvTemplateLocalization.jobType.sales;
    case CVJobType.CustomerService:
      return cvTemplateLocalization.jobType.customerService;
    case CVJobType.Design:
      return cvTemplateLocalization.jobType.design;
    default:
      return '';
  }
};
