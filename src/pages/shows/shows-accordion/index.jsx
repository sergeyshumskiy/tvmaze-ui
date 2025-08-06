import { useState } from 'react';
import {Collapse} from 'react-collapse';
import DOMPurify from 'dompurify';

import './shows-accordion.css'

function ShowsAccordion({ showsGroupedByGenre }) {
  const [openGenre, setOpenGenre] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

  const toggleGenre = genre => {
    setOpenGenre(previousValue => (previousValue === genre ? null : genre));
    setSelectedShow(null);
  };

  const selectShow = (e, show) => {
    e.stopPropagation()
    const { id } = show

    setSelectedShow(previousValue => previousValue === id ? null : id);
  };

  return (
    <>
      {Object.entries(showsGroupedByGenre).map(([genre, shows]) => (
        <div key={genre} className='showGenre'  onClick={() => toggleGenre(genre)}>
          {genre}:
          <Collapse isOpened={openGenre === genre}>
            <ul>
              {shows.map(show => (
                <li
                  key={show.id}
                  className='showGenreItem'
                  onClick={e => selectShow(e, show)}
                  >
                    {show.name}
                    {
                    <Collapse isOpened={show.id === selectedShow } >
                        <div
                          className='showDescription'
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(show.summary ) }}
                        />
                    </Collapse>
                  }
                </li>
            ))}
          </ul>
            </Collapse>
        </div>
      ))}
    </>
  );
}

export default ShowsAccordion;
