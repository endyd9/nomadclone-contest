import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function LoginForm({
  changeFormState,
}: {
  changeFormState: Function;
}) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }: any) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="max-w-xl h-full mx-auto flex flex-col justify-between">
      <button onClick={() => changeFormState()} className="absolute m-5">
        취소
      </button>
      <div className="">
        <h1 className="text-5xl text-center mb-5">𝕩</h1>
        <h2 className="text-3xl mx-10">
          시작하려면 먼저 이메일과 비밀번호를 입력하세요.
        </h2>
        <form className="flex flex-col mx-10">
          <input
            className="bg-black border-b border-b-gray-500 placeholder:text-gray-500 h-12 my-3"
            placeholder="이메일"
            type="email"
            {...register("email")}
          />
          <input
            className="bg-black border-b border-b-gray-500 placeholder:text-gray-500 h-12 my-3"
            placeholder="비밀번호"
            type="password"
            {...register("password")}
          />
        </form>
      </div>
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-white w-full h-14 my-5 rounded-full"
      >
        <h3 className="text-black font-semibold">로그인</h3>
      </button>
    </div>
  );
}
