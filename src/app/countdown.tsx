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
    <>
      <h3>{date.toDateString()}</h3>
      <h1 className='text-red-400'>{daysUntilHoliday}</h1>
    </>
  );
}
