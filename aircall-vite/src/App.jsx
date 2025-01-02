import React, { useEffect, useState } from 'react';
import { testAPI } from './utils/api.jsx';
import ActivityFeed from './components/ActivityFeed';
import ArchivedTab from './components/ArchivedTab';
import Header from './components/Header';

import './css/app.css';
import './css/body.css';
import './css/header.css';
import './css/index.css';

function App() {
  const [activeTab, setActiveTab] = useState('feed');

  useEffect(() => {
    console.log('Starting API test...');
    testAPI();
  }, []);

  return (
    <div className='container'>
      <Header />
      <div className='container-view'>
        <div className="tabs">
          <button 
            className={activeTab === 'feed' ? 'active' : ''} 
            onClick={() => setActiveTab('feed')}
          >
            Activity Feed
          </button>
          <button 
            className={activeTab === 'archived' ? 'active' : ''} 
            onClick={() => setActiveTab('archived')}
          >
            Archived
          </button>
        </div>
        
        {activeTab === 'feed' ? <ActivityFeed /> : <ArchivedTab />}
      </div>
    </div>
  );
}

export default App;