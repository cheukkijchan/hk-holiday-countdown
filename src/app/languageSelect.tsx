'use client';

import { Options, useLanguage } from '../components/languageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export default function LanguageSelect() {
  const { options, setLanguage } = useLanguage();

  const handleSelect = (value: Options) => {
    setLanguage(value);
    console.log(value);
  };

  return (
    <Select onValueChange={handleSelect}>
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
