import MyPage from '@/components/pages/MyPage';
import LoginPage from '../components/pages/LoginPage';

const router = [
  { path: '/login', element: <LoginPage /> },
  { path: '/mypage', element: <MyPage /> },
];

export default router;
