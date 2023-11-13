import { SearchField } from '@/components/search/SearchField';
import { SearchContextProvider } from '@/store/SearchContext';
import { getLayoutFn } from '@/utils/getLayoutFn';

export default function SearchPage() {
  return (
    <SearchContextProvider currentPage={0} searchQuery={''} movies={null} totalPages={0}>
      <SearchField />
    </SearchContextProvider>
  );
}

SearchPage.getLayout = getLayoutFn('home');
