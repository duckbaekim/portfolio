import {useState, useCallback} from 'react';

export default (initValue) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((v) => {
    setter(v);
  }, []);
  return [value, handler];
};
