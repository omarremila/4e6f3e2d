import React, { useEffect } from 'react';
import { testAPI } from './utils/api';
import Header from './components/Header';
import './css/app.css';
import './css/body.css';
import './css/header.css';
import './css/index.css' 
function App() {
  useEffect(() => {
    console.log('Starting API test...');
    testAPI();
  }, []);

  return (
    <div className='container'>
      <Header />
      <div className='container-view'>
        <div>Open Chrome DevTools (press F12) to see API test results in the console</div>
      </div>
    </div>
  );
}

export default App;