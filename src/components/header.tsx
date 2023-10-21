import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();
  const { isFollow } = useSelector((state: any) => state.peed.value);
  const dispatch = useDispatch();
  const onLogoutClick = async () => {
    await auth.signOut();
    navigate("/login");
  };
  const onClick = () => {
    alert("아직 미구현이라 당신을 로그아웃 시킬테야");
    onLogoutClick();
  };
  return (
    <header className="z-10 max-w-xl w-full pt-5 pb-3 bg-black fixed border-b border-gray-800">
      <div className="flex justify-between mx-3 w-[50%]">
        <div className="w-10 h-10 rounded-full bg-red-100"></div>
        <h1 className="text-3xl">𝕏</h1>
      </div>
      <div className="w-[50%] mx-auto flex justify-between">
        <button
          className={
            isFollow ? "text-gray-600" : "font-bold border-b-2 border-blue-500"
          }
          onClick={onClick}
        >
          추천
        </button>
        <button
          className={
            isFollow ? "font-bold border-b-2 border-blue-500" : "text-gray-600"
          }
          onClick={onClick}
        >
          팔로우 중
        </button>
      </div>
    </header>
  );
};

export default Header;
