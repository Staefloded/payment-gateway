import {useEffect, useMemo, useState} from 'react';
import {convertedDate} from 'utils';

const useFetchApi = (
  apiFunction,
  valueDate,
  queryArray,
  base,
  page,
  pageSize,
  isFilter = true,
  isSearch = true,
  id = '',
) => {
  const [customDate, setCustomDate] = useState([]);
  const [compoundFilter, setCompoundFilter] = useState({});

  const startDate = customDate?.[0];
  const endDate = customDate?.[1];

  const resetFilter = () => {
    setCustomDate([]);
    setCompoundFilter({});
  };

  const [queryType, setQueryType] = useState({
    key:
      queryArray.filter((item) =>
        item.key === 'select' && isFilter
          ? item
          : item.key === 'input' && isSearch
          ? item
          : '',
      )[0]?.value ?? '',
    value: '',
  });

  useEffect(() => {
    const data = convertedDate(valueDate);
    setCustomDate(data);
  }, [valueDate]);

  useEffect(() => {
    setCompoundFilter((prev) => {
      if (queryType.value === '') {
        return {...prev};
      }

      return {
        ...prev,
        [queryType.key]: queryType.value ?? '',
      };
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryType.value]);

  // memoize queries to avoid rerender
  const queries = useMemo(() => {
    const arr = [];
    for (const prop in compoundFilter) {
      arr.push(`${prop}=${compoundFilter[prop]}`);
    }

    return arr.join('&');
  }, [compoundFilter]);

  useEffect(() => {
    const baseQuery = `${base}&${queries}`;

    if (id) {
      if (Array.isArray(customDate) && customDate.length === 2) {
        apiFunction({
          id: `${id}`,
          query: `${baseQuery}&startDate=${startDate}&endDate=${endDate}`,
        });
      } else {
        apiFunction({id: `${id}`, query: `${baseQuery}`});
      }
    } else {
      if (Array.isArray(customDate) && customDate.length === 2) {
        apiFunction(`${baseQuery}&startDate=${startDate}&endDate=${endDate}`);
      } else {
        apiFunction(`${baseQuery}`);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, page, startDate, endDate, queries]);

  return {
    setQueryType,
    queryType,
    resetFilter,
    queries,
  };
};

export default useFetchApi;
