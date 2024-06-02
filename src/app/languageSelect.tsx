'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useRouter, usePathname } from 'next/navigation';
import { locales as options } from '../middleware';
import { splitPathname } from '../lib/splitPathname';

interface Props {
  lang: string;
}
export default function LanguageSelect({ lang }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const pathParts = splitPathname(pathname);
  const newPath = pathParts.join('/');
  const handleSelect = (value: string) => {
    router.push(`${value}/${newPath}`);
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
