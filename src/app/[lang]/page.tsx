import { notFound } from 'next/navigation';
import { ModeToggle } from '../../components/ui/modeToggle';
import { getHolidays } from '../../lib/getHolidays';
import HolidayCalendar from '../holidayCalendar';
import LanguageSelect from '../languageSelect';
import { locales } from '../../middleware';
import { getDictionary } from './dictionaries';

type Props = {
  params: {
    lang: string;
  };
};
export interface Dict {
  [key: string]: string;
}
export default async function Page({ params: { lang } }: Props) {
  if (!locales.includes(lang)) notFound();
  const publicHolidays = getHolidays(lang);
  const dict = (await getDictionary(lang)) satisfies Dict;
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <ModeToggle />
      <LanguageSelect lang={lang} />
      <HolidayCalendar publicHolidays={publicHolidays} dict={dict} />
    </main>
  );
}
