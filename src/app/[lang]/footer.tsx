import { ModeToggle } from '../../components/ui/modeToggle';
import { LocaleDictionary } from './getDictionary';

type Props = {
  dict: LocaleDictionary;
};

export function Footer({ dict }: Props) {
  return (
    <div className='flex justify-end bg-muted p-2'>
      <ModeToggle dict={dict} />
    </div>
  );
}
