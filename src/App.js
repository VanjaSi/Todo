import logo from './logo.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomeView from './components/HomeView';
import AddView from './components/AddView';

import { TodoProvider } from './context/TodoContext';

function App() {
	return (
		<TodoProvider>
			<Router>
				<Header logo={logo} />
				<div className='container'>
					<Routes>
						<Route path='/' element={<HomeView />} />
						<Route path='/add' element={<AddView />} />
					</Routes>
				</div>
			</Router>
		</TodoProvider>
	);
}

export default App;
