import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [version, setVersion] = useState('');
  const fetchVersion = async() => {
    const response = await axios.get('/api/version');
    setVersion(response.data.version);
  }
  useEffect(() => {
    fetchVersion()
  }, []);
  return <h1>Version fetched from BE: {version}</h1>;
};

export default App;
