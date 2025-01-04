
import { useAuthStore } from '../store/authStore';


const HomePage = () => {
  const { logout } = useAuthStore();
  return (
    <>
      <div>HomePage</div>
      <button onClick={logout}> click </button>
    </>
  )
}

export default HomePage;