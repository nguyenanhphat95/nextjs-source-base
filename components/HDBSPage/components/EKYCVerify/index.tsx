import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import _get from "lodash/get";
import axios from "axios";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // [theme.breakpoints.down("sm")]: {
    width: 375,
    margin: "0 auto",
    // },
  },
}));

interface Props {
  onFinish?: (data: any) => void;
}

const EKYCComponent = (props: Props) => {
  const classes = useStyles();
  const { onFinish } = props;
  useEffect(() => {
    callEkyc();
  }, []);

  function resetEkyc() {
    const vnpt_ekyc = document.getElementById("vnpt_ekyc");
    if (!vnpt_ekyc) return;

    vnpt_ekyc?.parentNode?.removeChild(vnpt_ekyc);
    callEkyc();
  }

  function isValidEkycCard(dataEkyc: any) {
    const statusCodeCardBack = _get(dataEkyc, "liveness_card_back.statusCode");
    const statusCodeCardFront = _get(
      dataEkyc,
      "liveness_card_front.statusCode"
    );
    const statusCodeCardOCR = _get(dataEkyc, "ocr.statusCode");
    if (
      statusCodeCardBack !== 200 ||
      statusCodeCardFront !== 200 ||
      statusCodeCardOCR !== 200
    ) {
      return false;
    }

    return true;
  }

  function callEkyc() {
    try {
      let vnpt_ekyc_sdk = document.createElement("script");
      vnpt_ekyc_sdk.id = "vnpt_ekyc_sdk";
      vnpt_ekyc_sdk.src = "./asset/js/ekyc-web-sdk-2.3.5.1.js";
      vnpt_ekyc_sdk.async = true;
      vnpt_ekyc_sdk.defer = true;
      document.head.appendChild(vnpt_ekyc_sdk);

      let vnpt_ekyc_styles = document.createElement("link");
      vnpt_ekyc_styles.id = "vnpt_ekyc_styles";
      vnpt_ekyc_styles.rel = "stylesheet";
      vnpt_ekyc_styles.href = "./asset/css/ekyc-web-sdk-2.3.5.css";
      document.head.appendChild(vnpt_ekyc_styles);
      const VNPT_CDN = "https://ekyc-web.vnpt.vn";
      vnpt_ekyc_sdk.onload = async function (_) {
        const initObj = {
          BACKEND_URL: "https://api.idg.vnpt.vn/",
          TOKEN_KEY:
            "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJhHOtzkW8T1JMrEpXoV79SGig1+RPdDPHNrSPyZhkfXh2fDKo/H+GDTG9fPbswRbVoC4UVnz/VdqA2rlPxW/YcCAwEAAQ==",
          TOKEN_ID: "d77a0f01-8395-47e7-e053-62199f0aff95",
          AUTHORIZION:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MWQyNzJmNi04ODhjLTExZWMtOWE2MS0zMzVjYjE4MjIzMzYiLCJhdWQiOlsicmVzdHNlcnZpY2UiXSwidXNlcl9uYW1lIjoibmd1eWVuYW5ocGhhdDI4MDVAZ21haWwuY29tIiwic2NvcGUiOlsicmVhZCJdLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdCIsIm5hbWUiOiJuZ3V5ZW5hbmhwaGF0MjgwNUBnbWFpbC5jb20iLCJ1dWlkX2FjY291bnQiOiI5MWQyNzJmNi04ODhjLTExZWMtOWE2MS0zMzVjYjE4MjIzMzYiLCJhdXRob3JpdGllcyI6WyJVU0VSIl0sImp0aSI6ImY4ODFmZmNmLTVlM2EtNGY3Mi04YzAwLTA4OWVkMzUwMzkzMiIsImNsaWVudF9pZCI6ImFkbWluYXBwIn0.7Yz1MSBv2ngdF-O51pOq9LBNZEq_3CI7es8BbuLeClr9-oU3FVwVM_ErIUl1XcGXyB852Lq5Yb7aeac2xdPnDz6x43GNR3AhXc_kfBHQqMldXCQMw12sO0WwSLnjeNLyov2vqsNn9oEP6BvIuB3Gd1n483AWEpMhuonYbF7owR_MyrETKAeFtMYxvjcIg_fkkdt2VlS2GcTOtqAyjYOZ2srG2jF3RdCRUmqw8fLOeQaIA-bvZJTTMZa_z2eOmaUVVKYj_VsNPUu48QdCztLD7cIE62G_ST6wCldleXr540moIyqpC1dvbW82pdZhak69ZWcfTNOXb_ra9N6wVW5kHg",
          PARRENT_ID: "ekyc_sdk_intergrated",
          FLOW_TYPE: "DOCUMENT", // DOCUMENT, FACE
          SHOW_HELP: true,
          SHOW_TRADEMARK: false,
          CHECK_LIVENESS_CARD: true,
          CHECK_LIVENESS_FACE: true,
          CHECK_MASKED_FACE: true,
          COMPARE_FACE: true,
          LANGUAGE: "vi",
          LIST_ITEM: [-1, 5, 6, 7, 9],
          TYPE_DOCUMENT: -1,
          USE_WEBCAM: true,
          USE_UPLOAD: false,
          ADVANCE_LIVENESS_FACE: true,
          LIST_CHOOSE_STYLE: {
            item_active_color: "#18D696",
            background_icon: "#18D696",
            id_icon: VNPT_CDN + "/images/si/id_card.svg",
            passport_icon: VNPT_CDN + "/images/si/passport.svg",
            drivecard_icon: VNPT_CDN + "/images/si/drivecard.svg",
            army_id_icon: VNPT_CDN + "/images/si/other_doc.svg",
            id_chip_icon: VNPT_CDN + "/images/si/id_chip.svg",
            start_button_background: "#18D696",
            start_button_color: "#111127",
          },
          CAPTURE_IMAGE_STYLE: {
            header_title_style: { color: "black" },
            webcam_streaming_style: {
              margin: "20px 0 20px 0",
              padding: "10px",
              // border: "2px #FFD643 solid",
            },
            video_block_style: { "border-radius": "16px" },
            description1_color_style: {
              color: "black",
              margin: "10px",
              display: "block",
            },
            capture_btn_style: {
              "border-radius": "16px",
              width: "300px",
            },
            capture_btn_text_style: {
              "font-size": "18px",
              color: "black",
              margin: "0",
            },
            capture_btn_icon: "",
            tutorial_btn_icon: VNPT_CDN + "/images/hdbank/help.gif",
            upload_btn_style: {
              display: "flex",
              "background-color": "#FFD643",
              "border-radius": "16px",
              width: "170px",
              border: "2px solid #FFD643",
              margin: "auto",
            },
            upload_btn_text_style: { color: "red" },
            upload_btn_icon: VNPT_CDN + "/images/altiss/upload.svg",
            recapture_btn_style: {
              display: "flex",
              "background-color": "#FFD643",
              "border-radius": "16px",
              width: "130px",
              border: "2px solid #FFD643",
            },
            recapture_btn_text_style: {
              "font-size": "18px",
              color: "black",
              margin: "0",
            },
            recapture_btn_icon: "",
            nextstep_btn_style: {
              "background-color": "#FFD643",
              "border-radius": "16px",
              width: "130px",
            },
            nextstep_btn_text_style: {
              "font-size": "18px",
              color: "black",
              margin: "0",
            },
            nextstep_btn_icon: "",
            capture_and_upload_wrapper_style: {
              background: "rgba(23, 24, 28, 0.7);",
            },
            capture_and_upload_wrapper_bg_img: VNPT_CDN + "/altiss/bg-img.svg",
          },
          MODAL_DOC_STYLE: {
            touch_icon: VNPT_CDN + "/altiss/touch_cmt.svg",
            close_icon: VNPT_CDN + "/altiss/close_icon.svg",
            notice1_icon: VNPT_CDN + "/altiss/cmt_notice1.svg",
            notice2_icon: VNPT_CDN + "/altiss/cmt_notice2.svg",
            notice3_icon: VNPT_CDN + "/altiss/cmt_notice3.svg",
          },
          MODAL_FACE_STYLE: {
            face_icon: VNPT_CDN + "/altiss/face_icon.svg",
            close_icon: VNPT_CDN + "/altiss/close_icon.svg",
            notice1_icon: VNPT_CDN + "/altiss/cmt_notice1.svg",
            notice2_icon: VNPT_CDN + "/altiss/cmt_notice2.svg",
            notice3_icon: VNPT_CDN + "/altiss/cmt_notice3.svg",
          },
          OTHER_CONFIG: {
            loading_icon: "./asset/images/Spinner.gif",
            loading_styles: { "background-color": "black", opacity: "0.7" },
            oval_web: VNPT_CDN + "/kbsv/web_border.json",
            oval_mobile: VNPT_CDN + "/kbsv/mobile_border.json",
            notice_ani: VNPT_CDN + "/animation/cautionHDB.json",
            oval_title_color: "black",
            description_oval_content:
              "Vui lòng tháo kính để xác thực chính xác hơn!",
            description_oval_style: {
              "text-align": "center",
              color: "black",
              "font-weight": "bold",
              "font-size": "14px",
            },
          },
        };

        const ekycsdk = _get(window, "ekycsdk");
        ekycsdk.init(
          initObj,
          (res: any) => {
            console.log("init ekycSDK success");
          },
          call_after_end_flow
        );

        function call_after_end_flow(data: any) {
          if (isValidEkycCard(data)) {
            const vnpt_ekyc = document.getElementById("vnpt_ekyc");
            if (!vnpt_ekyc) return;
            vnpt_ekyc?.parentNode?.removeChild(vnpt_ekyc);
            ekycsdk.init(
              {
                ...initObj,
                FLOW_TYPE: "FACE",
                TYPE_DOCUMENT: data.type_document,
              },
              (res: any) => {
                const result = { ...data, ...res };
                onFinish && onFinish(result);
              }
            );
            return;
          }
          resetEkyc();
        }
      };
    } catch (error) {
      console.log("Exception: ", error);
    }
  }

  return (
    <div className={classes.root}>
      <div id="ekyc_sdk_intergrated"></div>
    </div>
  );
};

export default EKYCComponent;
