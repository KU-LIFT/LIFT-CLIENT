import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../pages/LoginPage';
import MainLayout from '../pages/MainLayout';
import DashBoardPage from '../pages/DashBoardPage';
import BoardPage from '../pages/BoardPage';
import UserListPage from '../pages/UserListPage';
import SettingPage from '../pages/SettingPage';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route element={<PrivateRoute />}>
					<Route element={<MainLayout />}>
						<Route path="/" element={<DashBoardPage />} />
						<Route path="/board" element={<BoardPage />} />
						<Route path="/user" element={<UserListPage />} />
						<Route path="/setting" element={<SettingPage />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
