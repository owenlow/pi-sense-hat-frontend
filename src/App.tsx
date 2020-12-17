import React from 'react';
import styles from './App.module.css';
import SensorListView from "./views/SensorListView";

function App() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <SensorListView/>
      </header>
    </div>
  );
}

export default App;
