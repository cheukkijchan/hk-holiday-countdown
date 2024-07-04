import { notFound } from 'next/navigation';
import { ModeToggle } from '../../components/ui/modeToggle';
import { getHolidays } from '../../lib/getHolidays';
import HolidayCalendar from '../../components/holidayCalendar';
import LanguageSelect from '../languageSelect';
import { getDictionary } from './getDictionary';
import { type Locale, locales } from '../../dictionaries';
import { NavBar } from './navbar';
import { Footer } from './footer';

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function Page({ params: { lang } }: Props) {
  if (!locales.includes(lang)) notFound();
  const publicHolidays = getHolidays(lang);
  const dict = getDictionary(lang);

  return (
    <main className='flex flex-col h-screen justify-between box-content'>
      <NavBar lang={lang} />
      <HolidayCalendar publicHolidays={publicHolidays} dict={dict} />
      <Footer dict={dict} />
    </main>
  );
}
