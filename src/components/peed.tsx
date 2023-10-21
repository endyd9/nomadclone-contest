import {
  query,
  collection,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Unsubscribe } from "redux";
import { db } from "../firebase";
import Tweet, { ITweet } from "./tweet";

const Peed: FC = () => {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      unsubscribe = await onSnapshot(tweetQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, uid, imgUrl, userName, createdAt } = doc.data();
          return {
            tweet,
            photo: imgUrl,
            userName,
            createdAt,
            uid,
            id: doc.id,
          };
        });
        setTweets(tweets);
        return () => {
          unsubscribe && unsubscribe();
        };
      });
    };
    fetchTweets();
  }, []);
  const { isFollow } = useSelector((state: any) => state.peed.value);
  return (
    <div className="max-w-xl">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </div>
  );
};

export default Peed;
