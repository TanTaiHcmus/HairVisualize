import React from "react";
import { connect } from "react-redux";
import Vi from "../localization/vi.json";
import En from "../localization/en.json";
import { LanguageOptions } from "../constants";

export default function withTranslate(Component) {
  const mapStateToProps = (state) => {
    return {
      currentLanguage: state.common.currentLanguage,
    };
  };

  return React.memo(
    connect(mapStateToProps)(({ currentLanguage, ...props }) => {
      const translate = (value) => {
        switch (currentLanguage) {
          case LanguageOptions.Vietnamese: {
            return Vi[value];
          }
          case LanguageOptions.English: {
            return En[value];
          }
          default: {
            return "";
          }
        }
      };

      return <Component translate={translate} {...props} />;
    })
  );
}
