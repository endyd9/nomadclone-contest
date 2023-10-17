import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  const onLogoutClick = async () => {
    await auth.signOut();
    navigate("/login");
  };
  return (
    <div>
      <h1 className="text-white">홈임</h1>
      <button onClick={onLogoutClick}>임시 로그아웃</button>
    </div>
  );
}
