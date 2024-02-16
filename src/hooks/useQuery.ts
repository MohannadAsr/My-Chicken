import { AppDispatch } from '@src/store/store';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

// get Seach Params Or query
export const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

// use it in the Components Like that
// ***************************************

//   const query = useQuery();
//   const queryType = query.get('something');

// ***************************************
