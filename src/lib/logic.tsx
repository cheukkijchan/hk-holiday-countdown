export function findLongestConsecutiveDay(dates: Date[]): number {
  if (dates.length === 0) {
    return 0;
  }

  // Sort the array of dates
  dates.sort((a, b) => a.getTime() - b.getTime());

  let currentStreak = 1;
  let maxStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const differenceInDays =
      (dates[i].getTime() - dates[i - 1].getTime()) / (24 * 60 * 60 * 1000);

    if (differenceInDays === 1) {
      currentStreak++;
    } else {
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
      currentStreak = 1;
    }
  }

  if (currentStreak > maxStreak) {
    maxStreak = currentStreak;
  }

  return maxStreak;
}
