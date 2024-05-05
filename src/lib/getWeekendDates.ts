// get weekday's date from today to any range, return a date array

export function getWeekendDates(endDate: Date) {
  const saturdayDates = [];
  const sundayDates = [];

  const today = new Date().setHours(0, 0, 0, 0);
  const currentDate = new Date(today);
  const targetDate = new Date(endDate);

  while (currentDate <= targetDate) {
    if (currentDate.getDay() === 6) {
      saturdayDates.push(new Date(currentDate));
    } else if (currentDate.getDay() === 0) {
      sundayDates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return { saturdayDates, sundayDates };
}
