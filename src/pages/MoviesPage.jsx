import { SearchBar } from 'components/SearchBar/SearchBar';
import { useState } from 'react';

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = value => {
    setSearchQuery(value);
  };
  console.log(searchQuery)


  // const [searchParams, setSearchParams] = useSearchParams();

  // setSearchParams(searchQuery);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
    </>
  );
};

export default MoviesPage;
