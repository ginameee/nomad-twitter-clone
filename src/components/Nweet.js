import { dbService } from "fbase";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj);

  const handleDeleteNweet = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");

    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };

  const handleUpdateNweet = async (e) => {
    e.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      ...newNweet,
    });
    setIsEditMode(false);
  };

  const handleChangeNweet = (e) => {
    const {
      target: { value },
    } = e;
    e.preventDefault();
    setNewNweet((prev) => ({
      ...prev,
      text: value,
    }));
  };

  const handleToggleEditMode = () => setIsEditMode((prev) => !prev);
  return (
    <div>
      {isEditMode ? (
        <form onSubmit={handleUpdateNweet}>
          <input
            type="text"
            value={newNweet.text}
            placeholder="Edit your nweet"
            onChange={handleChangeNweet}
            required
          />
          <button onClick={handleToggleEditMode}>Cancel</button>
          <input type="submit" value="Save" />
        </form>
      ) : (
        <h4>{nweetObj.text}</h4>
      )}
      {isOwner && (
        <>
          <button onClick={handleDeleteNweet}>Delete Nweet</button>
          <button onClick={handleToggleEditMode}>Edit Nweet</button>
        </>
      )}
    </div>
  );
};

export default Nweet;
