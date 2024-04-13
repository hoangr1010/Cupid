// getBatchPeriod() returns the 3-month period that our current date is in.
export const getBatchPeriod = () => {
  // In JS, month is 0-indexed
  let startMonth;
  let endMonth;

  // Get current month and year
  const thisMonth = (new Date()).getMonth();
  const thisYear = (new Date()).getFullYear();

  // Get the start month and end month of the 3-month period that our current date is in (i.e. Jan 1st - 31st Mar, Apr 1st - Jun 30th, Jul 1st - Sep 30th, Oct 1st - Dec 31st)
  // For example, today is Apr 7th, so it is in the period [Apr 1st, Jun 30th]
  for (startMonth = 0; startMonth <= 9; startMonth += 3) {
    endMonth = startMonth + 2;
    if (startMonth <= thisMonth && thisMonth <= endMonth) {
      break;
    }
  }

  // Get the specific start date and end date from the months gotten in the 3-month period
  // For example, start month is April and end month is June, so the start date is April 1st and the end date is June 30th
  const startDate = new Date(thisYear, startMonth, 1);
  const endDate = new Date(new Date(thisYear, endMonth + 1, 1) - 1);

  return [startDate, endDate];
};