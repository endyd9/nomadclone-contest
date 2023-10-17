import { useState } from "react";
import JoinForm from "../components/join-form";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/google-login";

export default function Join() {
  const [isForm, setIsform] = useState<boolean>(false);

  const navigate = useNavigate();

  const changeFormState = () => {
    setIsform((prev) => !prev);
  };
  return isForm ? (
    <JoinForm changeFormState={changeFormState} />
  ) : (
    <div className="max-w-xl h-full mx-auto flex flex-col justify-between">
      <h1 className="text-5xl text-center">𝕩</h1>
      <div className="flex flex-col mx-10">
        <h2 className="text-3xl font-semibold">
          지금 세계에서 무슨 일이 일어나고 있는지 알아보세요.
        </h2>
      </div>
      <div className="mx-10">
        <GoogleLogin />
        <div className="flex items-center justify-between">
          <div className="bg-gray-500 w-[43%] h-[1px] opacity-60"></div>
          <span className="text-gray-500 text-center opacity-60">또는</span>
          <div className="bg-gray-500 w-[43%] h-[1px] opacity-60"></div>
        </div>
        <button
          className="bg-white w-full h-14 my-5 rounded-full"
          onClick={changeFormState}
        >
          <h3 className="text-black font-semibold">계정 만들기</h3>
        </button>
        <p className="text-gray-600 text-sm">
          가입하면 트위터의{" "}
          <span className="text-blue-500">
            이용약관, 개인정보 처리방침, 쿠키 사용
          </span>
          에 동의하게 됩니다.
        </p>
        <div className="m-3">
          <span className="text-gray-600 text-lg">계정이 있신가요? </span>
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            로그인하기
          </span>
        </div>
      </div>
    </div>
  );
}
