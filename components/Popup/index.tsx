import * as React from "react";
import { getLanguage } from "commons/helpers";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import _get from "lodash/get";
import { useRouter } from "next/router";
import resources from "pages/assets/translate.json";

const useStyles = makeStyles((theme: any) => ({
  title: {
    fontWeight: 700,
    fontSize: 20,
  },
}));

const style = {
  // margin: '0 10px',
  borderRadius: 5,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface IProps {
  open: boolean;
}

export default function WaitingPopup(props: IProps) {
  const { open } = props;
  const router = useRouter();
  const classes = useStyles();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "popup"]);
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box textAlign="center">
            <Typography className={classes.title}>
              {/* {_get(t, "waiting.title")} */}
              Hệ thống đang kiểm tra thông tin
            </Typography>
            <Typography>
              {/* {_get(t, "waiting.sub1")} */}
              Chờ chút nhé
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
