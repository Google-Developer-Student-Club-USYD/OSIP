import { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import SignUp from './views/SignUp';
import SignIn from './views/SignIn';

import './App.css';

// set page title
export function useTitle(title) {
	useEffect(() => {
		const prevTitle = document.title;

		document.title = title;
		
		return () => {
			document.title = prevTitle
		}
	})
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
