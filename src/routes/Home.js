import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;

    setNweet(value);
  };

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      setNweets(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  const handleChangeFile = (e) => {
    const {
      target: { files },
    } = e;

    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = (fileLoadEvent) => {
      const {
        currentTarget: { result },
      } = fileLoadEvent;

      setAttachment(result);
    };

    reader.readAsDataURL(file);
  };

  const handleClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Waht's on your mind?"
          maxLength={120}
          onChange={handleChange}
          value={nweet}
        />
        <input type="file" accept="image/*" onChange={handleChangeFile} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="attachment" />
            <button onClick={handleClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            nweetObj={nweet}
            key={nweet.id}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
