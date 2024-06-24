// Global state
import { DEFAULT_WEBSITE_TITLE } from '@/constants';
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_WEBSITE_TITLE);
  return {
    name,
    setName,
  };
};

export default useUser;
