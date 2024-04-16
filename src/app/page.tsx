import { Calendar } from '../components/ui/calendar';
import { getHolidays } from '../lib/getHolidays';

export default async function Home() {
  const holidays = getHolidays();
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {holidays.map((holiday) => (
        <div key={holiday.uid}>{holiday.summary}</div>
      ))}
      <Calendar />
    </main>
  );
}
