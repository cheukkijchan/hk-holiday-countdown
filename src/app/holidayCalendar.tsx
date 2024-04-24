'use client';

import { isSameDay } from 'date-fns';
import { useState } from 'react';
import { DayClickEventHandler } from 'react-day-picker';
import { Calendar } from '../components/ui/calendar';
import { Slider } from '../components/ui/slider';
import { findLongestConsecutiveDay } from '../lib/logic';
import { Holiday } from '../lib/types';
import { filterDates } from '../lib/filterDates';
import Countdown from './countdown';

type HolidayCalendarProps = {
  publicHolidays: Holiday[];
};

export default function HolidayCalendar({
  publicHolidays,
}: HolidayCalendarProps) {
  const [slider, setSlider] = useState<number>(3);
  const [day, setDay] = useState<Date>();
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);

  // Adding Custom modifiers for fixed holiday
  const holidays = [
    ...publicHolidays.map((publicHolidays) => publicHolidays.date),
  ];
  const [marked, setMarked] = useState(false);

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
  const allHoliday = [...selectedDays, ...holidays];
  // filter out the next few months date and create footer
  const holidayRange = filterDates(allHoliday, slider);
  const footer: string = marked ? `${selected?.summary}` : 'fucked';
  // sudo find longest consecutive day combined marked & selected day
  const longestHoliday = `And you have ${findLongestConsecutiveDay(
    holidayRange
  )} days in the next ${slider} month`;

  return (
    <>
      <Countdown date={holidayRange[0]} />
      <Calendar
        selected={selectedDays}
        modifiersClassNames={{
          marked: 'text-red-400 hover:text-red-600 font-extrabold',
        }}
        modifiers={{ marked: holidays }}
        onDayClick={handleDayClick}
        footer={footer + longestHoliday}
      />
      <Slider
        max={12}
        min={1}
        step={1}
        value={[slider]}
        onValueChange={(value) => setSlider(value[0])}
      />
      {slider}
      {JSON.stringify(holidayRange.map((date) => date.toDateString()))}
    </>
  );
}
