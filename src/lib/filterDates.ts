export function filterDates(dates: Date[], month: number) {
  const today = new Date();
  const nextFewMonths = new Date();
  nextFewMonths.setMonth(nextFewMonths.getMonth() + month); // Adjust the number of months as needed

  return dates.filter((date) => date >= today && date <= nextFewMonths);
}
