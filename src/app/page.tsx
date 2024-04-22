import { isSameDay } from 'date-fns';
import { Calendar } from '../components/ui/calendar';
import { getHolidays } from '../lib/getHolidays';
import { DayClickEventHandler } from 'react-day-picker';
import { useState } from 'react';
import { findLongestConsecutiveDay } from '../lib/logic';

export default async function Home() {
  // const holidays = getHolidays();

  // Adding Custom modifiers for fixed holiday
  const [marked, setMarked] = useState(false);
  const publicHolidays = getHolidays();
  const holidays = [
    ...publicHolidays.map((publicHolidays) => publicHolidays.date),
  ];

  const [day, setDay] = useState<Date>();
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    setMarked(day && modifiers.marked);
    setDay(day);

    const newSelectedDays = [...selectedDays];
    if (modifiers.selected) {
      const index = selectedDays.findIndex((selectedDay) =>
        isSameDay(day, selectedDay)
      );
      newSelectedDays.splice(index, 1);
    } else {
      newSelectedDays.push(day);
    }
    setSelectedDays(newSelectedDays);
  };

  const selected = publicHolidays.find(
    (obj) => obj.date.getTime() === day?.getTime()
  );

  // count your whole holiday
  // sudo find longest consecutive day combined marked & selected day
  const allHoliday = [...selectedDays, ...holidays];

  const footer: string = marked ? `${selected?.summary}` : 'fucked';

  const longestHoliday = `And you have ${findLongestConsecutiveDay(
    allHoliday
  )} days in the next ${3} month`;
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {publicHolidays.map((holiday) => (
        <div key={holiday.uid}>{holiday.summary}</div>
      ))}
      <Calendar
        selected={selectedDays}
        modifiersClassNames={{
          marked: 'text-red-400 font-bold hover:text-red-600',
        }}
        modifiers={{ marked: holidays }}
        onDayClick={handleDayClick}
        footer={footer}
      />
    </main>
  );
}
