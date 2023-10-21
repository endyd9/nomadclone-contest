import { FC, useState } from "react";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

export interface ITweet {
  createdAt: number;
  id: string;
  photo?: string;
  tweet: string;
  uid: string;
  userName: string;
}

const Tweet: FC<ITweet> = ({ id, createdAt, photo, tweet, userName, uid }) => {
  const user = auth.currentUser;

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTweet, setEditTweet] = useState<string>(tweet);

  const onEditClick = async () => {
    if (!editMode) return;
    try {
      //트윗만 업데이트
      updateDoc(doc(db, "tweets", id), {
        tweet: editTweet,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEditMode(false);
    }
  };
  const onDeleteClick = async () => {
    if (
      !confirm("게시물 삭제\n 정말로 이 게시물을 삭제하시겠습니까?") ||
      user?.uid !== uid
    )
      return;
    try {
      await deleteDoc(doc(db, "tweets", id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex my-5">
      <div className="flex flex-col">
        <div className="w-12 h-12 bg-white rounded-full mt-3 mr-3"></div>
      </div>
      <div className="flex flex-col mt-3 w-[80%]">
        <div className="flex">
          <span className="mr-2">{userName}</span>
          <span className="text-gray-600">작성시간</span>
          {user?.uid === uid && (
            <>
              {editMode ? (
                <button
                  onClick={() => {
                    setEditTweet(tweet);
                    setEditMode((prev) => !prev);
                  }}
                  className="mx-2 mt-1 text-red-500 border border-red-500 rounded-full px-3"
                >
                  취소
                </button>
              ) : (
                <button
                  onClick={() => setEditMode((prev) => !prev)}
                  className="mx-2 text-blue-500 border border-blue-500 rounded-full px-3"
                >
                  수정
                </button>
              )}

              {editMode ? (
                <button
                  onClick={onEditClick}
                  className="mx-2 text-blue-500 border border-blue-500 rounded-full px-3"
                >
                  게시하기
                </button>
              ) : (
                <button
                  onClick={onDeleteClick}
                  className="mx-2 mt-1 text-red-500 border border-red-500 rounded-full px-3"
                >
                  삭제
                </button>
              )}
            </>
          )}
        </div>
        <p className="w-[90%]">
          {editMode ? (
            <textarea
              className="bg-black w-[80%] resize-none focus:outline-none"
              cols={10}
              rows={10}
              maxLength={200}
              placeholder="무슨 일이 바뀌었나요?"
              value={editTweet}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setEditTweet(event.target.value)
              }
            />
          ) : (
            tweet
          )}
        </p>
        {photo && <img src={photo} alt="" />}
      </div>
    </div>
  );
};

export default Tweet;
