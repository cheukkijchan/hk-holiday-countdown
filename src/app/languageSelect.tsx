'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useRouter } from 'next/navigation';
import { locales as options } from '../middleware';

interface Props {
  lang: string;
}
export default function LanguageSelect({ lang }: Props) {
  const router = useRouter();
  const handleSelect = (value: string) => {
    router.push(`${value}`);
  };

  return (
    <Select onValueChange={handleSelect} defaultValue={lang}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Language' />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
