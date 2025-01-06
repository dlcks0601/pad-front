import router from '@/routes/router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='bg-background'>
      <BrowserRouter>
        <Routes>
          {router.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
