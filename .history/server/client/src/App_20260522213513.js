import React from 'react';
import Login from'./components/Login';
import Signup from'./components/Signup';
function App() {
  return (
    <div className="App">
      <h1>Welcome to CodeQuest</h1>
      <Login/>
      <hr/>
      <Signup/> 
    </div>
  );
}

export default App;