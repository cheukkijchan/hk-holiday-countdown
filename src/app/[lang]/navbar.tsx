import { Locale } from '../../dictionaries';
import LanguageSelect from '../languageSelect';

type Props = {
  lang: string;
};

export function NavBar({ lang }: Props) {
  return (
    <div className='flex justify-end p-2 bg-muted '>
      <LanguageSelect lang={lang} />
    </div>
  );
}
