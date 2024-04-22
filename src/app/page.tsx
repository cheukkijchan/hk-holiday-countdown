import { getHolidays } from '../lib/getHolidays';
import HolidayCalendar from './holidayCalendar';

export default async function Home() {
  const publicHolidays = getHolidays();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {publicHolidays.map((holiday) => (
        <div key={holiday.uid}>{holiday.summary}</div>
      ))}
      <HolidayCalendar publicHolidays={publicHolidays} />
    </main>
  );
}
