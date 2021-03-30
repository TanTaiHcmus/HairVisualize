import React, { useEffect, useState } from "react";
import UserApi from "../../Api/userApi";
import Container from "../../components/Container";
import ImageDisplay from "../../components/ImageDisplay";
import { STATUS_MESSAGE } from "../../constants";

const UserInfoScreen = () => {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const handleGetAvatar = async () => {
      const response = await UserApi.getAvatar();
      if (response.message === STATUS_MESSAGE.SUCCESS) {
        console.log(response.data);
      }
    };

    handleGetAvatar();
  });

  return (
    <Container>
      <ImageDisplay image={avatar} />
    </Container>
  );
};

export default UserInfoScreen;
