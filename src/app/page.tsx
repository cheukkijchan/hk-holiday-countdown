import { ModeToggle } from '../components/ui/modeToggle';
import { getHolidays } from '../lib/getHolidays';
import HolidayCalendar from './holidayCalendar';
import LanguageSelect from './languageSelect';

export default async function Home() {
  const publicHolidays = getHolidays('tc');

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <ModeToggle />
      <LanguageSelect />
      <HolidayCalendar publicHolidays={publicHolidays} />
    </main>
  );
}
