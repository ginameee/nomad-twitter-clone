import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("nweets").add({
      nweet,
      createdAt: Date.now(),
    });
    setNweet("");
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;

    setNweet(value);
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
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};
export default Home;
