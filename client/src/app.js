import React from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [refreshFlag, setRefreshFlag] = React.useState(false);

  const onNewBug = () => {
    // simple way to refresh list after new bug
    setRefreshFlag(!refreshFlag);
  };

  return (
    <ErrorBoundary>
      <div>
        <h1>Bug Tracker</h1>
        <BugForm onNewBug={onNewBug} />
        <BugList key={refreshFlag} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
