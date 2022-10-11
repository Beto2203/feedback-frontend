import { useState } from 'react';
import MainScreen from './components/MainScreen.js';

function App() {
  const [user, setUser] = useState(null);


  return (
    <div>
      <MainScreen />
    </div>
  );
}

export default App;
