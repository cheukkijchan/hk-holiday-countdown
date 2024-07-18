import { Holiday } from '../lib/types';

type CountdownProps = {
  publicHolidays: Holiday[];
  countdownDescription: string;
  // date: Date;
  // holidayName: string;
};

export default function Countdown({
  publicHolidays,
  countdownDescription,
}: CountdownProps) {
  const today = new Date();

  const nextPublicHoliday = [
    ...publicHolidays.map((publicHolidays) => publicHolidays.date),
  ].find((i) => {
    return i > today;
  });
  const nextHolidayName = publicHolidays.find(
    (holiday) => holiday.date === nextPublicHoliday
  )?.summary;

  // Next Public Holiday
  const daysUntilHoliday = Math.ceil(
    (nextPublicHoliday!.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className='flex flex-col mx-auto p-5'>
      <div className='mx-auto text-xl'>
        {countdownDescription + ' ' + nextPublicHoliday!.toDateString()}
      </div>
      <div className='flex justify-center items-center border-red-200 border-8 shadow-xl mx-auto aspect-square  m-3 p-8 rounded-3xl'>
        <div className='text-red-500 text-8xl'>{daysUntilHoliday}</div>
      </div>
      <div className='mx-auto'>{nextHolidayName}</div>
    </div>
  );
}
