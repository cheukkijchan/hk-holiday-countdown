import { notFound } from 'next/navigation';
import { ModeToggle } from '../../components/ui/modeToggle';
import { getHolidays } from '../../lib/getHolidays';
import HolidayCalendar from '../../components/holidayCalendar';
import LanguageSelect from '../languageSelect';
import { getDictionary } from './getDictionary';
import { type Locale, locales } from '../../dictionaries';
import { NavBar } from './navbar';
import { Footer } from './footer';
import Countdown from '../../components/countdown';

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function Page({ params: { lang } }: Props) {
  if (!locales.includes(lang)) notFound();
  const publicHolidays = await getHolidays(lang);
  const dict = getDictionary(lang);

  return (
    <main className='flex flex-col h-screen justify-between box-content'>
      <NavBar lang={lang} />
      <Countdown
        publicHolidays={publicHolidays}
        countdownDescription={dict.countdown.desc}
        locale={lang}
      />
      <HolidayCalendar
        publicHolidays={publicHolidays}
        dict={dict}
        locale={lang}
      ></HolidayCalendar>
      <Footer dict={dict} />
    </main>
  );
}
