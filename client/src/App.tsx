import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Router from './Router';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
