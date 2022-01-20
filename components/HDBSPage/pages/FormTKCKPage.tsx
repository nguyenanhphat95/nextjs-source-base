import React, { useState, useEffect, useMemo, useRef, useContext } from "react";
import Image from "next/image";

import { useForm, Controller } from "react-hook-form";

import { makeStyles } from "@mui/styles";
import { Card, Grid, Box, Modal } from "@mui/material";
import { ButtonCustom, CheckboxCustom, SelectCustom } from "components/commons";

import { MerchantNameItem, TerminalNameItem } from "interfaces/IGetMerchant";
import { AccountItem } from "interfaces/IListAccount";
import { FormDataStep1 } from "../interfaces";
import { OptionSelectType } from "commons/constants/types";

import * as hdbsServices from "services/hdbsService";
import TKCKContext from "components/HDBSPage/contexts/TKCKContextValue";

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
  md5?: any;
}

type FormValues = {
  account: string;
  merchantId: string;
  terminalId: string;
  transferInternet: boolean;
  transferAuto: boolean;
  transferBonds: boolean;
};

export const TYPE_MODAL_INFO = {
  transferInternet: "transferInternet",
  transferAuto: "transferAuto",
  transferBonds: "transferBonds",
};

const FormTKCKPage = (props: Props) => {
  const { onSubmit } = props;
  const classes = useStyles();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      account: "",
      merchantId: "",
      terminalId: "",
      transferInternet: true,
      transferAuto: true,
      transferBonds: true,
    },
  });
  const merchantIdValue = watch("merchantId");
  const { loadingBtnSubmit } = useContext(TKCKContext);

  const [listAccount, setListAccount] = useState<AccountItem[]>([]);
  const [listMerchant, setListMerchant] = useState<MerchantNameItem[]>([]);
  const [listTerminal, setListTerminal] = useState<TerminalNameItem[]>([]);

  const typeModal = useRef<string>("");
  const [openModalInfo, setOpenModalInfo] = useState(false);

  useEffect(() => {
    hdbsServices.getListAccountApi().then((res) => {
      const listAccount = _get(res, "data.data", []);
      setListAccount(listAccount);
    });
  }, []);

  useEffect(() => {
    hdbsServices.getMerchant().then((res) => {
      setListMerchant(res.merchantNames);
      setListTerminal(res.terminalNames);
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
    if (!listTerminal.length || !merchantIdValue) {
      return [];
    }
    const listData: OptionSelectType[] = [];
    listTerminal.forEach((item) => {
      if (item.merchantId === merchantIdValue) {
        listData.push({
          id: item.terminalId,
          value: item.terminalName,
        });
      }
    });
    return listData;
  }, [listTerminal, merchantIdValue]);

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

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Card className={classes.content}>
        <Grid container direction="column" spacing={2}>
          <Grid item className={classes.title}>
            Thông tin TKTT
          </Grid>
          <Grid item>
            <Controller
              name="account"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SelectCustom
                  errorMsg={errors.account && "This field is required"}
                  placeholder="Chọn TKTT"
                  options={listAccountNew}
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item className={classes.title}>
            Thông tin bổ sung TKCK
          </Grid>
          <Grid item>
            <Controller
              name="merchantId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange: _onChange, ...rest } }) => (
                <SelectCustom
                  errorMsg={errors.merchantId && "This field is required"}
                  placeholder="Chọn công ty CK"
                  options={listMerchantNew}
                  fullWidth
                  onChange={(e) => {
                    setValue("terminalId", "");
                    _onChange(e);
                  }}
                  {...rest}
                />
              )}
            />
          </Grid>
          <Grid item>
            <Controller
              name="terminalId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SelectCustom
                  errorMsg={errors.terminalId && "This field is required"}
                  placeholder="Chọn địa điểm mở TKCK"
                  options={listTerminalNew}
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box mt={3}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Controller
                name="transferInternet"
                control={control}
                render={({ field: { value, ...rest } }) => {
                  return (
                    <CheckboxCustom
                      checked={value}
                      endIcon={
                        <Image width={20} height={20} src={warningIcon} />
                      }
                      label="Giao dịch qua Internet (Web và App)"
                      onClickEndIcon={() =>
                        _handleShowInfo(TYPE_MODAL_INFO.transferInternet)
                      }
                      {...rest}
                    />
                  );
                }}
              />
            </Grid>

            <Grid item>
              <Controller
                name="transferAuto"
                control={control}
                render={({ field: { value, ...rest } }) => {
                  return (
                    <CheckboxCustom
                      checked={value}
                      endIcon={
                        <Image width={20} height={20} src={warningIcon} />
                      }
                      label="Ứng trước tiền bán chứng khoán tự động"
                      onClickEndIcon={() =>
                        _handleShowInfo(TYPE_MODAL_INFO.transferAuto)
                      }
                      {...rest}
                    />
                  );
                }}
              />
            </Grid>
            <Grid item>
              <Controller
                name="transferBonds"
                control={control}
                render={({ field: { value, ...rest } }) => {
                  return (
                    <CheckboxCustom
                      checked={value}
                      endIcon={
                        <Image width={20} height={20} src={warningIcon} />
                      }
                      label="Giao dịch trái phiếu phát hành riêng lẻ"
                      onClickEndIcon={() =>
                        _handleShowInfo(TYPE_MODAL_INFO.transferBonds)
                      }
                      {...rest}
                    />
                  );
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Card>

      <Box px={3} py={1}>
        <ButtonCustom
          fullWidth
          variant="contained"
          color="secondary"
          type="submit"
          loading={loadingBtnSubmit}
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
    </form>
  );
};

export default FormTKCKPage;
