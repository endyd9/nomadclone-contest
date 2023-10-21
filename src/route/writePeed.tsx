import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const WritePeed: FC = () => {
  const { register, handleSubmit } = useForm();
  const [isFile, setIsFile] = useState<boolean>(false);
  const navigate = useNavigate();

  const returnToHome = () => {
    navigate("/");
  };

  const onSubmit = async ({ tweet, img }: any) => {
    const user = auth.currentUser;
    if (tweet === "" || tweet.length > 200 || !user) return;
    try {
      const doc = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        userName: user.displayName || "아무개",
        uid: user.uid,
      });
      if (img.length > 0) {
        const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, img[0]);
        const imgUrl = await getDownloadURL(result.ref);
        await updateDoc(doc, {
          imgUrl,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      returnToHome();
    }
  };
  return (
    <div className="max-w-xl h-full mx-auto">
      <div>
        <div className="flex justify-between mx-5 pt-5">
          <span onClick={returnToHome}>취소</span>
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-2 bg-blue-600 rounded-full text-sm"
          >
            게시하기
          </button>
        </div>
        <div className="flex mx-5 mt-5 mb-1">
          <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
          <span className="text-blue-500 mx-3 border border-blue-500 rounded-full px-5">
            공개 ⋁
          </span>
        </div>
      </div>
      <form>
        <textarea
          className="bg-black w-full pl-14 resize-none focus:outline-none"
          cols={10}
          rows={10}
          maxLength={200}
          placeholder="무슨 일이 일어나고 있나요?"
          {...register("tweet", {
            maxLength: 200,
          })}
        />
        <div className="h-14 w-screen border-t border-gray-800 fixed bottom-0 flex items-center justify-center">
          <input
            type="file"
            id="img"
            accept="image/*"
            className="hidden"
            {...register("img")}
          />
          <label
            className="px-3 cursor-pointer text-blue-500 border border-blue-500 rounded-full"
            htmlFor="img"
          >
            {isFile ? "사진 추가 완료!" : "+ 사진 추가 하기"}
          </label>
        </div>
      </form>
    </div>
  );
};

export default WritePeed;
