import React from "react";

import { makeStyles } from "@mui/styles";
import { Grid, Box } from "@mui/material";
import cn from "classnames";
import { ButtonCustom } from "components/commons";

const useStyles = makeStyles(() => ({
  root: {
    background: "#F2F2F4",
    height: "100vh",
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  },
  textContent: {
    fontSize: 14,
    fontWeight: 400,
  },
  textCenter: {
    textAlign: "center",
  },
  borderBottom: {
    borderBottom: "1px solid",
  },
}));

const EKYCNote = () => {
  const classes = useStyles();

  return (
    <Box p={2}>
      <Box py={1}>CMND1</Box>
      <Box py={1} className={classes.borderBottom}>
        <div className={cn(classes.textCenter, classes.title)}>Hướng dẫn</div>
        <div className={cn(classes.textCenter, classes.title)}>
          Chụp ảnh CMT / Thẻ căn cước
        </div>
      </Box>
      <Box py={1} className={classes.borderBottom}>
        <ul>
          <li className={classes.textContent}>
            Giấy tờ còn hạn sử dụng. Là hình gốc không scan và photocopy
          </li>
          <li className={classes.textContent}>
            Chụp trong môi trường đủ ánh sáng
          </li>
          <li className={classes.textContent}>
            Đảm bảo ảnh rõ nét, không bị mờ lóa
          </li>
        </ul>
      </Box>
      <Box py={2}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            Image1
          </Grid>
          <Grid item xs={4}>
            Image2
          </Grid>
          <Grid item xs={4}>
            Image3
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        <Grid container justifyContent="center">
          <Grid item xs={11}>
            <ButtonCustom fullWidth variant="contained" color="secondary">
              Tôi đã hiểu
            </ButtonCustom>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EKYCNote;
