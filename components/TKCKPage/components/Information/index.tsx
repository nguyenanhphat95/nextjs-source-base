import React from "react";
import Image from "next/image";

import { Card, Grid, Box, Modal, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { TYPE_MODAL_INFO } from "components/TKCKPage/pages/FormTKCKPage";

import xIcon from "public/asset/images/X.png";
import _get from "lodash/get";

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
  const info = {
    [TYPE_MODAL_INFO.transferInternet]: {
      title: "Giao dich qua Internet",
      content:
        "HDBS sẽ cung cấp Tài khoản và Mật khẩu cho Quý Khách hàng đăng nhập vào Hệ thống trực tuyến của HDBS để đặt lệnh giao dịch và quản lý danh mục đầu tư",
    },
    [TYPE_MODAL_INFO.transferAuto]: {
      title: "Ứng trước tiền bán chứng khoán tự động",
      content:
        "Dịch vụ ứng trước tiền bán chứng khoán tự động cung cấp cho Quý khách để gia tăng sức mua chứng khoán ngay sau khi lệnh bán chứng khoán trước đó đã khớp lệnh thành công, đồng thời giảm thiểu thời gian thao tác cho Quý khách",
    },
    [TYPE_MODAL_INFO.transferBonds]: {
      title: "Giao dịch trái phiếu phát hành riêng lẻ",
      content:
        "Là Trái phiếu chưa thực hiện niêm yết trên Thị trường Chứng khoán. Trái phiếu do HDBS thực hiện tư vấn, phát hành và làm Đại lý đăng ký Lưu ký, quản lý chuyển nhượng",
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
        >
          <Grid item>{_get(info, `${type}.title`, "")}</Grid>
          {onClose && (
            <Grid item onClick={onClose}>
              <Image width={15} height={15} src={xIcon} />
            </Grid>
          )}
        </Grid>
      </Box>
      <Box p={2}>{_get(info, `${type}.content`, "")}</Box>
    </Card>
  );
};

export default Information;
