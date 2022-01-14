import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

import cn from "classnames";
import notifyIcon1 from "public/images/noti1.png";
import notifyIcon2 from "public/images/noti2.png";
import notifyIcon3 from "public/images/noti3.png";
import notifyIcon4 from "public/images/noti4.png";

import resources from "pages/assets/translate.json";
import { LANGUAGE } from "commons/constants";
import _get from "lodash/get";

createTheme();
const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 50,
    paddingBottom: 50,
  },
  header: {
    fontWeight: 500,
    fontSize: 30,
  },
  title: {
    fontWeight: 500,
    fontSize: 18,
  },
  content: {
    fontSize: 14,
  },
  notifySelected: {
    background: "#FFF9E2",
    boxShadow: "0px 14px 40px rgba(79, 51, 39, 0.1)",
    borderRadius: 20,
    "& .title": {
      color: "#BE1128",
    },
  },
}));

export const LIST_NOTIFICATION = [
  {
    image: notifyIcon1,
    title: "itemTitle1",
    content: "itemContent1",
    shortContent: "itemShortContent1",
  },
  {
    image: notifyIcon2,
    title: "itemTitle2",
    content: "itemContent2",
    shortContent: "itemShortContent2",
  },
  {
    image: notifyIcon3,
    title: "itemTitle3",
    content: "itemContent3",
    shortContent: "",
  },
  {
    image: notifyIcon4,
    title: "itemTitle3",
    content: "itemContent3",
    shortContent: "",
  },
  {
    image: notifyIcon4,
    title: "itemTitle3",
    content: "itemContent3",
    shortContent: "",
  },
];

const SectionNotification = () => {
  const classes = useStyles();
  const indexSelected = 0;

  const { locale } = useRouter();
  const t = _get(resources, [locale || LANGUAGE.VI, "notification"]);

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center">
        <Grid item xs={11} md={7}>
          <Box
            mb={2}
            className={classes.header}
            display="flex"
            justifyContent="center"
          >
            {t.title}
          </Box>

          <Grid container direction="column" spacing={4}>
            {LIST_NOTIFICATION.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  p={2}
                  className={
                    index === indexSelected ? classes.notifySelected : ""
                  }
                >
                  <Grid container spacing={2}>
                    <Grid item xs="auto">
                      <Image src={item.image} alt="icon-image" />
                    </Grid>
                    <Grid item xs={true}>
                      <Box className={cn(classes.title, "title")}>
                        {t[item.title]}
                      </Box>
                      <Box className={classes.content}>{t[item.content]}</Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SectionNotification;
