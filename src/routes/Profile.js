import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();

  const handleClickLogOut = async () => {
    await authService.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={handleClickLogOut}>Log Out</button>
    </>
  );
};
export default Profile;
