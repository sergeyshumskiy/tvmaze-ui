import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router';
import debounce from 'lodash.debounce';

import { retrieveShows } from '../../api';
import { Spinner } from '../../components';
import ShowsAccordion  from './shows-accordion';

import './shows.css'

function Shows() {
  const [shows, setShows] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') || '';
  const [inputValue, setInputValue] = useState(searchFromUrl);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null)
      try {
        const data = await retrieveShows(searchFromUrl);

        setShows(data);
      } catch {
        setError('Cannot load the data');
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [searchFromUrl]);

  const debouncedSetSearch = useCallback(
    debounce((value) => {
       const params = {};
      if (value) params.search = value;
      setSearchParams(params);
    }, 500),
    []
  );

    useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearch(value);
  };

  const renderShows = () => {
    const isShowsEmpty = !isLoading && shows.length === 0

    if(isShowsEmpty && !searchFromUrl) {
      return <span>Use search to find your show</span>
    }

    if (isShowsEmpty) {
      return <span>No shows were found</span>
    }

    const showsGroupedByGenre = shows.reduce((acc, show) => {
      show.genres.forEach(genre => {
          if (!acc[genre]) acc[genre] = []
          acc[genre].push(show)
      })
      return acc
    }, {})

      return <ShowsAccordion showsGroupedByGenre={showsGroupedByGenre} />
  }

  return (
    <>
        <div className='searchControls'>
            <h1>TV Shows Observer</h1>
            <input
                className='showSearch'
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Enter show name or genre'
            />
        </div>
        <div className='showsContainer'>
          {isLoading && <Spinner />}
          {error && <span className='showsError'>{'error'}</span>}
          {renderShows()}
        </div>
    </>
  );
}

export default Shows;
