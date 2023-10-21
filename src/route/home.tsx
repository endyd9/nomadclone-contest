import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Peed from "../components/peed";

export default function Home() {
  const navigate = useNavigate();
  const onWriteClick = () => {
    navigate("/write");
  };
  return (
    <div className="max-w-xl h-full mx-auto">
      <Header />

      <div className="w-screen pt-24 mx-5">
        <Peed />
      </div>
      <div className="w-12 h-12 bg-blue-400 rounded-full fixed bottom-20 right-5 flex items-center justify-center">
        <button onClick={onWriteClick} className="text-3xl">
          +
        </button>
      </div>
    </div>
  );
}
