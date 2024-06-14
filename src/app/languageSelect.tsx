'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { useRouter, usePathname } from 'next/navigation';
import { splitPathname } from '../lib/splitPathname';
import { locales, languageOption } from '../dictionaries';

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
        {locales.map((option) => (
          <SelectItem key={option} value={option}>
            {languageOption[option]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
