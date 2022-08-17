import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './component/About';
import Error from './component/Error';
import Home from "./component/Home";
import Profile from './component/Profile';
import Appbar from './component/Appbar';
import Register from './component/Register';
import Login from './component/Login';




function App() {
	return (
		<Router>
			<Appbar />
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="/register" element={<Register />}/>
				<Route path="/login" element={<Login />}/>
				<Route path="/profile" element={<Profile />}/>
				<Route path="/about" element={<About />}/>
				
				<Route path="*" element={<Error />} />
			</Routes>
		</Router>
	);
}

export default App;
