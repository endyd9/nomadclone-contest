import { useState } from "react";
import LoginForm from "../components/login-form";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/google-login";

export default function Login() {
  const [isForm, setIsForm] = useState<boolean>(false);

  const navigate = useNavigate();

  const changeFormState = () => {
    setIsForm((prev) => !prev);
  };
  return isForm ? (
    <LoginForm changeFormState={changeFormState} />
  ) : (
    <div className="max-w-xl h-full mx-auto flex flex-col justify-between">
      <h1 className="text-5xl text-center">𝕩</h1>
      <div className="flex flex-col mx-10">
        <h2 className="text-2xl font-bold text-center">
          다시 만나서 반가워요!
          <br /> 최신 소식을 보려면 로그인하세요.
        </h2>
        <GoogleLogin />
        <div className="flex items-center justify-between">
          <div className="bg-gray-500 w-[43%] h-[1px] opacity-60"></div>
          <span className="text-gray-500 text-center opacity-60">또는</span>
          <div className="bg-gray-500 w-[43%] h-[1px] opacity-60"></div>
        </div>
        <button
          onClick={changeFormState}
          className="bg-white w-full h-14 my-5 rounded-full"
        >
          <h3 className="text-black font-semibold">로그인 하기</h3>
        </button>
      </div>
      <div className="m-3">
        <span className="text-gray-600 text-lg">계정이 없으신가요? </span>
        <span
          onClick={() => navigate("/join")}
          className="text-blue-500 cursor-pointer hover:underline"
        >
          가입하기
        </span>
      </div>
    </div>
  );
}
