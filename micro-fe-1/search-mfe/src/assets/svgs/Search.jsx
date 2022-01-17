import React from 'react'
import CasaIcon from './CasaIcon'

const Search = () => (
  <CasaIcon>
    <svg width='24' height='24' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <path
          d='M10.022 1l.253.003c4.994.13 8.935 4.278 8.806 9.267a8.985 8.985 0 01-1.728 5.087l-.189.249 5.604 5.897c.3.316.306.802.034 1.133l-.074.08-.03.028a.945.945 0 01-1.173.098l-.092-.072-6.081-5.418a9.01 9.01 0 01-5.543 1.719c-4.993-.13-8.935-4.278-8.806-9.267C1.13 4.898 5.144 1.008 10.023 1zm.02 1.81a7.214 7.214 0 100 14.43 7.214 7.214 0 000-14.43z'
          id='search'
        />
      </defs>
      <use xlinkHref='#search' fill='#4B286D' fillRule='evenodd' />
    </svg>
  </CasaIcon>
)

export default Search
