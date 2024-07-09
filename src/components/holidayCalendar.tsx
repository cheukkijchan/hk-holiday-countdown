'use client';

import { isSameDay } from 'date-fns';
import { useState } from 'react';
import { DayClickEventHandler } from 'react-day-picker';
import { findLongestConsecutiveDay } from '../lib/logic';
import { Holiday } from '../lib/types';
import { filterDates } from '../lib/filterDates';
import { getWeekendDates } from '../lib/getWeekendDates';
import { LocaleDictionary } from '../app/[lang]/getDictionary';
import Countdown from '../app/countdown';
import { Calendar } from './ui/calendar';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';

import { ShareButton } from './shareButton';
import { useSearchParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

type HolidayCalendarProps = {
  publicHolidays: Holiday[];
  dict: LocaleDictionary;
};

export default function HolidayCalendar({
  publicHolidays,
  dict,
}: HolidayCalendarProps) {
  const [slider, setSlider] = useState<number>(3);
  const [day, setDay] = useState<Date>(); // current selected day

  const searchParams = useSearchParams();

  const [selectedDays, setSelectedDays] = useState<Date[]>(
    searchParams
      .getAll('selected')
      .map((str) => Date.parse(str))
      .map((date) => new Date(date))
  );
  const [saturday, setSaturday] = useState(true);
  const [sunday, setSunday] = useState(true);
  const [marked, setMarked] = useState(false); // calendar marks

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

  // count your whole holiday
  const selected = publicHolidays.find(
    (obj) => obj.date.getTime() === day?.getTime()
  );

  const allHoliday = [...selectedDays, ...holidays];
  // filter out the next few months date and create footer
  const holidayRange = filterDates(allHoliday, slider);

  const footer: string = marked
    ? `${selected?.summary || dict.calendar.weekend}, `
    : '';
  // sudo find longest consecutive day combined marked & selected day
  const longestHoliday = `you have ${findLongestConsecutiveDay(
    holidayRange
  )} days in the next ${slider} month`;

  const nextPublicHoliday = [
    ...publicHolidays.map((publicHolidays) => publicHolidays.date),
  ].find((i) => {
    const today = new Date();
    return i > today;
  });

  return (
    <div className='flex flex-col'>
      <Countdown date={nextPublicHoliday!} />
      <div className='m-2 min-w-1/4 gap-4 mx-auto grid sm:grid-cols-2'>
        <Calendar
          className='min-w-1/4 w-72 ml-auto'
          disabled={{
            before: new Date(),
            after: holidays[holidays.length - 1],
          }}
          selected={selectedDays}
          modifiersClassNames={{
            marked: 'text-red-400 hover:text-red-600 font-extrabold',
          }}
          modifiers={{ marked: holidays }}
          onDayClick={handleDayClick}
          footer={footer}
        />
        <div className='w-72 mr-auto mx-10 my-5'>
          <Card>
            <CardHeader>
              <CardTitle>Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-row my-5 justify-center gap-10'>
                <div>
                  <CardDescription>{dict.calendar.Sat}</CardDescription>
                  <Switch
                    checked={saturday}
                    onCheckedChange={() => {
                      setSelectedDays([]);
                      setSaturday(!saturday);
                    }}
                  />
                </div>
                <div>
                  <CardDescription>{dict.calendar.Sun}</CardDescription>
                  <Switch
                    checked={sunday}
                    onCheckedChange={() => {
                      setSelectedDays([]);
                      setSunday(!sunday);
                    }}
                  />
                </div>
              </div>
              <CardDescription>
                Next Long Holiday in {slider} months
              </CardDescription>
              <Slider
                className='mx-auto w-4/5'
                max={12}
                min={1}
                step={1}
                value={[slider]}
                onValueChange={(value) => setSlider(value[0])}
              />
              <CardDescription>{longestHoliday}</CardDescription>
            </CardContent>
            <CardFooter>
              <ShareButton selectedDays={selectedDays}></ShareButton>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
