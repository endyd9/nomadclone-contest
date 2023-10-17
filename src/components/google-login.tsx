import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function GoogleLogin() {
  const navigate = useNavigate();
  const onGoogleLoginClick = async () => {
    try {
      const provieder = new GoogleAuthProvider();
      await signInWithPopup(auth, provieder);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={onGoogleLoginClick}
      className="bg-white w-full h-14 my-5 rounded-full"
    >
      <div className="flex justify-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="구글로고"
          className="mx-3"
        />
        <h3 className="text-black font-semibold">Google로 계속하기</h3>
      </div>
    </button>
  );
}
