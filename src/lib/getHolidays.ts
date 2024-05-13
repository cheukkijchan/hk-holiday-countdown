import { Holiday } from './types';

export function getHolidays() {
  // // fetching from 1823
  // const res = await fetch('https://www.1823.gov.hk/common/ical/en.json');
  // const data = await res.json();

  // Local Data for dev testing
  const data = require('../../public/data/tc.json');

  const holidays = (data.vcalendar[0].vevent as Holiday[]).map((holiday) => {
    const year = holiday.dtstart[0].substring(0, 4);
    const month = holiday.dtstart[0].substring(4, 6);
    const day = holiday.dtstart[0].substring(6, 8);
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    return {
      uid: holiday.uid,
      dtstart: holiday.dtstart[0],
      dtend: holiday.dtend[0],
      date,
      summary: holiday.summary,
    };
  });

  return holidays;
}
