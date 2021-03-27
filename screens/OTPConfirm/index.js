import React, { useState } from "react";
import Container from "../../components/Container";
import KeyboardView from "../../components/KeyboardView";
import TextCustom from "../../components/TextCustom";
import { Styles } from "./style";

const OTPConfirm = ({ navigation }) => {
  return (
    <KeyboardView>
      <Container>
        <TextCustom title="Enter the OTP code" style={Styles.headTitle} />
        <TextCustom
          title="Enter the code was sent to your email"
          style={Styles.bodyTitle}
        />
      </Container>
    </KeyboardView>
  );
};

export default OTPConfirm;
