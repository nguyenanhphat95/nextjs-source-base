import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Card, Grid, Box, Modal, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { TYPE_MODAL_INFO } from "components/HDBSPage/pages/FormTKCKPage";
import { LANGUAGE } from "commons/constants";
import resources from "pages/assets/translate.json";

import xIcon from "public/asset/images/X.png";
import _get from "lodash/get";
import { getLanguage } from "commons/helpers";

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  header: {
    padding: "10px",
    background: "#C7262E",
    color: "white",
  },
}));

interface Props {
  onClose?: () => void;
  type: string;
}

const Information = (props: Props) => {
  const classes = useStyles();
  const { onClose, type } = props;
  const router = useRouter();
  const lang = getLanguage(router);
  const t = _get(resources, [lang, "informationModal"]);

  const info = {
    [TYPE_MODAL_INFO.transferInternet]: {
      title: "titleTransferInternet",
      content: "contentTransferInternet",
    },
    [TYPE_MODAL_INFO.transferAuto]: {
      title: "titleTransferAuto",
      content: "contentTransferAuto",
    },
    [TYPE_MODAL_INFO.transferBonds]: {
      title: "titleTransferBonds",
      content: "contentTransferBonds",
    },
  };
  return (
    <Card>
      <Box className={classes.header}>
        <Grid
          alignItems="center"
          spacing={1}
          container
          justifyContent="space-between"
          wrap="nowrap"
        >
          <Grid item>{t[`${_get(info, `${type}.title`, "")}`]}</Grid>
          {onClose && (
            <Grid item onClick={onClose}>
              <Image width={15} height={15} src={xIcon} />
            </Grid>
          )}
        </Grid>
      </Box>
      <Box p={2}>{t[`${_get(info, `${type}.content`, "")}`]}</Box>
    </Card>
  );
};

export default Information;
