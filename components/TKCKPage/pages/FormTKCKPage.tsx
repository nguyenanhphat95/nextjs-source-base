import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";

import { makeStyles } from "@mui/styles";
import { Card, Grid, Box, Modal } from "@mui/material";
import { ButtonCustom, CheckboxCustom, SelectCustom } from "components/commons";

import { MerchantNameItem, TerminalNameItem } from "interfaces/IGetMerchant";
import { AccountItem } from "interfaces/IListAccount";
import { FormDataStep1 } from "../interfaces";
import { OptionSelectType } from "commons/constants/types";

import * as hdbsServices from "services/hdbsService";

import warningIcon from "public/asset/images/warning.png";
import _get from "lodash/get";
import { Information } from "..";

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  modalInfo: {
    top: "unset !important",
    "& .MuiPaper-root": {
      borderRadius: "5px 5px 0px 0px",
    },
  },
}));

interface Props {
  onSubmit: (data: FormDataStep1) => void;
}

const clientNo = "00012132";

export const TYPE_MODAL_INFO = {
  transferInternet: "transferInternet",
  transferAuto: "transferAuto",
  transferBonds: "transferBonds",
};

const FormTKCKPage = (props: Props) => {
  const { onSubmit } = props;
  const classes = useStyles();

  const [listAccount, setListAccount] = useState<AccountItem[]>([]);
  const [listMerchant, setListMerchant] = useState<MerchantNameItem[]>([]);
  const [listTerminal, setListTerminal] = useState<TerminalNameItem[]>([]);

  const typeModal = useRef<string>("");
  const [openModalInfo, setOpenModalInfo] = useState(false);

  const [data, setData] = useState({
    account: "",
    company: "",
    location: "",
    transferInternet: true,
    transferAuto: true,
    transferBonds: true,
  });

  useEffect(() => {
    hdbsServices.getListAccountApi(clientNo).then((res) => {
      const listAccount = _get(res, "data.data", []);
      setListAccount(listAccount);
    });
  }, []);

  useEffect(() => {
    hdbsServices.getMerchant().then((res) => {
      setListMerchant(res.data.merchantNames);
      setListTerminal(res.data.ternimalNames);
    });
  }, []);

  const listAccountNew = useMemo(() => {
    return (listAccount || []).map((item) => ({
      id: item.accountNo,
      value: item.accountNo,
    }));
  }, [listAccount]);

  const listMerchantNew = useMemo(() => {
    return (listMerchant || []).map((item) => ({
      id: item.merchantId,
      value: item.merchantName,
    }));
  }, [listMerchant]);

  const listTerminalNew = useMemo(() => {
    if (!listTerminal.length || !data.company) {
      return [];
    }
    const listData: OptionSelectType[] = [];
    listTerminal.forEach((item) => {
      if (item.merchantId === data.company) {
        listData.push({
          id: item.terminalId,
          value: item.terminalName,
        });
      }
    });
    return listData;
  }, [listTerminal, data.company]);

  const _handleChange = (field: string, value: string) => {
    if (field === "company") {
      setData({
        ...data,
        location: "",
        [field]: value,
      });
      return;
    }
    setData({
      ...data,
      [field]: value,
    });
  };

  const _handleShowInfo = (key: string) => {
    typeModal.current = key;
    _toggleModalInfo();
  };

  const _toggleModalInfo = () => {
    setOpenModalInfo((prev) => {
      if (prev) typeModal.current = "";
      return !prev;
    });
  };

  const _handleSubmit = () => {
    if (!data.account || !data.company || !data.location) {
      return;
    }
    onSubmit(data);
  };
  return (
    <div className={classes.root}>
      <Card className={classes.content}>
        <Grid container direction="column" spacing={2}>
          <Grid item className={classes.title}>
            Thông tin TKTT
          </Grid>
          <Grid item>
            <SelectCustom
              value={data.account}
              placeholder="Chọn TKTT"
              options={listAccountNew}
              fullWidth
              onChange={(event) => {
                _handleChange("account", _get(event, "target.value"));
              }}
            />
          </Grid>
          <Grid item className={classes.title}>
            Thông tin bổ sung TKCK
          </Grid>
          <Grid item>
            <SelectCustom
              value={data.company}
              placeholder="Chọn công ty CK"
              options={listMerchantNew}
              fullWidth
              onChange={(event) => {
                _handleChange("company", _get(event, "target.value"));
              }}
            />
          </Grid>
          <Grid item>
            <SelectCustom
              value={data.location}
              placeholder="Chọn địa điểm mở TKCK"
              options={listTerminalNew}
              fullWidth
              onChange={(event) => {
                _handleChange("location", _get(event, "target.value"));
              }}
            />
          </Grid>
        </Grid>

        <Box mt={3}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <CheckboxCustom
                checked={data.transferInternet}
                endIcon={<Image width={20} height={20} src={warningIcon} />}
                label="Giao dịch qua Internet (Web và App)"
                onClickEndIcon={() =>
                  _handleShowInfo(TYPE_MODAL_INFO.transferInternet)
                }
                onChange={(event) => {
                  _handleChange(
                    "transferInternet",
                    _get(event, "target.checked", false)
                  );
                }}
              />
            </Grid>
            <Grid item>
              <CheckboxCustom
                checked={data.transferAuto}
                endIcon={<Image width={20} height={20} src={warningIcon} />}
                label="Ứng trước tiền bán chứng khoán tự động"
                onClickEndIcon={() =>
                  _handleShowInfo(TYPE_MODAL_INFO.transferAuto)
                }
                onChange={(event) => {
                  _handleChange(
                    "transferAuto",
                    _get(event, "target.checked", false)
                  );
                }}
              />
            </Grid>
            <Grid item>
              <CheckboxCustom
                checked={data.transferBonds}
                endIcon={<Image width={20} height={20} src={warningIcon} />}
                label="Giao dịch trái phiếu phát hành riêng lẻ"
                onClickEndIcon={() =>
                  _handleShowInfo(TYPE_MODAL_INFO.transferBonds)
                }
                onChange={(event) => {
                  _handleChange(
                    "transferBonds",
                    _get(event, "target.checked", false)
                  );
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Card>

      <Box px={3} py={1}>
        <ButtonCustom
          onClick={_handleSubmit}
          fullWidth
          variant="contained"
          color="secondary"
        >
          Tiếp tục
        </ButtonCustom>
      </Box>

      <Modal
        className={classes.modalInfo}
        open={openModalInfo}
        onClose={_toggleModalInfo}
      >
        <div>
          <Information type={typeModal.current} onClose={_toggleModalInfo} />
        </div>
      </Modal>
    </div>
  );
};

export default FormTKCKPage;
