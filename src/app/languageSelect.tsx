import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export default function LanguageSelect() {
  const option = ['TC', 'EN'];
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Language' />
      </SelectTrigger>
      <SelectContent>
        {option.map((lang) => (
          <SelectItem key={lang} value={lang}>
            {lang}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
