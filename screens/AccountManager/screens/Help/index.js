import React, { useEffect, useState } from "react";
import DismissKeyboardView from "../../../../components/DismissKeyboardView";
import EditText from "../../../../components/EditText";
import KeyboardView from "../../../../components/KeyboardView";
import LoadingWrapper from "../../../../components/LoadingWrapper";
import TextCustom from "../../../../components/TextCustom";
import TextInputCustom from "../../../../components/TextInputCustom";
import withTranslate from "../../../../HOC/withTranslate";
import Styles from "./style";

const HelpScreen = ({ translate, navigation }) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TextCustom
          onPress={async () => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              navigation.goBack();
            }, 1000);
          }}
          title={translate("send")}
          style={Styles.sendButton}
        />
      ),
    });
  }, [text]);

  return (
    <KeyboardView>
      <DismissKeyboardView>
        <LoadingWrapper isLoading={isLoading} style={Styles.container}>
          <EditText title={translate("help")}>
            <TextInputCustom
              value={text}
              onChangeText={(text) => setText(text)}
              multiline
            />
          </EditText>
        </LoadingWrapper>
      </DismissKeyboardView>
    </KeyboardView>
  );
};

export default withTranslate(HelpScreen);
