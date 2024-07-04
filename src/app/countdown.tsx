type CountdownProps = {
  date: Date;
};

export default function Countdown({ date }: CountdownProps) {
  // Next Public Holiday
  const today = new Date();
  const daysUntilHoliday = Math.ceil(
    (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className='flex flex-col mx-auto p-5'>
      <div className='mx-auto text-xl'>
        Next Holiday at {date.toDateString()}
      </div>
      <div className='border-red-200 border-8 shadow-xl mx-auto aspect-square  m-3 p-8 rounded-3xl'>
        <div className='text-red-500 text-8xl text-center align-middle'>
          {daysUntilHoliday}
        </div>
      </div>
      <div className='mx-auto'>Holiday Name</div>
    </div>
  );
}
