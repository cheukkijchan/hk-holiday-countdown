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
import { getWeekendDates } from '../lib/getWeekendDates';
import { Switch } from '../components/ui/switch';

type HolidayCalendarProps = {
  publicHolidays: Holiday[];
};

export default function HolidayCalendar({
  publicHolidays,
}: HolidayCalendarProps) {
  const [slider, setSlider] = useState<number>(3);
  const [day, setDay] = useState<Date>();
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);

  const [saturday, setSaturday] = useState(true);
  const [sunday, setSunday] = useState(true);

  const [marked, setMarked] = useState(false);

  // Adding Custom modifiers for fixed holiday
  let holidays = [
    ...publicHolidays.map((publicHolidays) => publicHolidays.date),
  ];
  const { saturdayDates, sundayDates } = getWeekendDates(
    holidays[holidays.length - 1]
  );
  // check saturday and sunday toggle
  if (sunday) {
    holidays = [...holidays, ...sundayDates];
  }
  if (saturday) {
    holidays = [...holidays, ...saturdayDates];
  }

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    setMarked(day && modifiers.marked);
    setDay(day);
    // block selecting holiday
    if (holidays.some((date) => date.getTime() === day.getTime())) {
      return;
    }

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

  // count your whole holiday BUGGED FOR DISPLAYING HOLIDAY NAME SINCE ONCLICK SELECT IS BLOCKED
  const selected = publicHolidays.find(
    (obj) => obj.date.getTime() === day?.getTime()
  );

  const allHoliday = [...selectedDays, ...holidays];
  // filter out the next few months date and create footer
  const holidayRange = filterDates(allHoliday, slider);
  const footer: string = marked
    ? `${selected?.summary || 'Weekend'}`
    : 'fucked ';
  // sudo find longest consecutive day combined marked & selected day
  const longestHoliday = `And you have ${findLongestConsecutiveDay(
    holidayRange
  )} days in the next ${slider} month`;

  const nextPublicHoliday = [
    ...publicHolidays.map((publicHolidays) => publicHolidays.date),
  ].find((i) => {
    const today = new Date();
    return i > today;
  });

  return (
    <>
      <Countdown date={nextPublicHoliday!} />
      <div className='flex flex-row space-x-2'>
        <div>
          Sat
          <Switch
            checked={saturday}
            onCheckedChange={() => {
              setSelectedDays([]);
              setSaturday(!saturday);
            }}
          />
        </div>
        <div>
          Sun
          <Switch
            checked={sunday}
            onCheckedChange={() => {
              setSelectedDays([]);
              setSunday(!sunday);
            }}
          />
        </div>
      </div>
      <Calendar
        disabled={{ before: new Date(), after: holidays[holidays.length - 1] }}
        selected={selectedDays}
        modifiersClassNames={{
          marked: 'text-red-400 hover:text-red-600 font-extrabold',
        }}
        modifiers={{ marked: holidays }}
        onDayClick={handleDayClick}
        footer={footer + longestHoliday}
      />
      <div className='w-1/4'>
        <Slider
          max={12}
          min={1}
          step={1}
          value={[slider]}
          onValueChange={(value) => setSlider(value[0])}
        />
      </div>
      {slider}
      {JSON.stringify(holidayRange.map((date) => date.toDateString()))}
    </>
  );
}
