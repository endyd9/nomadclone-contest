import { useForm } from "react-hook-form";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function JoinForm({
  changeFormState,
}: {
  changeFormState: Function;
}) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async ({ name, email, password }: any) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, { displayName: name });
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
      <div>
        <h1 className="text-5xl text-center mb-5">𝕩</h1>
        <h2 className="text-3xl mx-10">계정을 생성하세요</h2>
        <form id="join" className="flex flex-col mx-10">
          <input
            className="bg-black border-b border-b-gray-500 placeholder:text-gray-500 h-12 my-3"
            placeholder="이름"
            type="text"
            {...register("name")}
          />
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
        type="submit"
        form="join"
        onClick={handleSubmit(onSubmit)}
        className="bg-white w-full h-14 my-5 rounded-full"
      >
        <h3 className="text-black font-semibold">회원가입</h3>
      </button>
    </div>
  );
}
