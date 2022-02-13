import React, { useEffect, useState } from 'react';
import './styles/app.scss';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function getMessage() {
      const response = await fetch('/api/hello');
      const json = await response.json();
      setMessage(json.message);
    }

    getMessage();
  }, []);

  return (
    <main>
      <h1>App</h1>
      <p>{message}</p>
    </main>
  );
};

export default App;
