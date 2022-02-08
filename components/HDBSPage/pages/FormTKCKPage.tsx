import React, { useState, useMemo, useRef, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { useForm, Controller } from "react-hook-form";

import { makeStyles } from "@mui/styles";
import { Card, Grid, Box, Modal } from "@mui/material";
import { ButtonCustom, CheckboxCustom, SelectCustom } from "components/commons";

import { FormDataStep1 } from "../interfaces";
import { OptionSelectType } from "commons/constants/types";

import TKCKContext from "components/HDBSPage/contexts/TKCKContextValue";
import { Information } from "..";

import { LANGUAGE } from "commons/constants";
import resources from "pages/assets/translate.json";
import warningIcon from "public/asset/images/warning.png";
import _get from "lodash/get";

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
  accountNo: string;
  accountType: string;
  merchantId: string;
  terminalId: string;
  isTranInternet: boolean;
  isUttb: boolean;
  isBond: boolean;
  merchantName: string;
  terminalName: string;
};

export const TYPE_MODAL_INFO = {
  transferInternet: "transferInternet",
  transferAuto: "transferAuto",
  transferBonds: "transferBonds",
};

const ERROR_FORM = {
  [LANGUAGE.EN]: {
    required: "This field is required",
  },
  [LANGUAGE.VI]: {
    required: "Trường này là bắt buộc",
  },
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
      accountNo: "",
      accountType: "",
      merchantId: "",
      merchantName: "",
      terminalId: "",
      terminalName: "",
      isTranInternet: true,
      isUttb: true,
      isBond: true,
    },
  });
  const merchantIdValue = watch("merchantId");
  const { loadingBtnSubmit, listMerchant, listTerminal, listAccount } =
    useContext(TKCKContext);

  const typeModal = useRef<string>("");
  const [openModalInfo, setOpenModalInfo] = useState(false);

  const router = useRouter();
  const lang = LANGUAGE.VI;
  // const lang = _get(router, "query.language", LANGUAGE.VI);
  const t = _get(resources, [lang, "formTKCKPage"]);

  const listAccountNew = useMemo(() => {
    return (listAccount || []).map((item) => ({
      id: item.accountNo,
      value: item.accountNo,
      label: item.AcctType,
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
            {t?.titleSection1}
          </Grid>
          <Grid item>
            <Controller
              name="accountNo"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange: _onChange, ...rest } }) => (
                <SelectCustom
                  errorMsg={
                    errors.accountNo && _get(ERROR_FORM, [lang, "required"])
                  }
                  placeholder={t?.placeholderAccount}
                  options={listAccountNew}
                  loading={listAccountNew.length ? false : true}
                  fullWidth
                  onChange={(e) => {
                    const id = e.target.value;
                    const itemSelected = listAccountNew.find(
                      (item) => item.id === id
                    );
                    setValue("accountType", itemSelected?.label || "");
                    _onChange(e);
                  }}
                  {...rest}
                />
              )}
            />
          </Grid>
          <Grid item className={classes.title}>
            {t?.titleSection2}
          </Grid>
          <Grid item>
            <Controller
              name="merchantId"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange: _onChange, ...rest } }) => (
                <SelectCustom
                  errorMsg={
                    errors.merchantId && _get(ERROR_FORM, [lang, "required"])
                  }
                  placeholder={t?.placeholderMerchant}
                  options={listMerchantNew}
                  fullWidth
                  loading={listMerchant.length ? false : true}
                  onChange={(e) => {
                    const id = e.target.value;
                    const itemSelected = listMerchantNew.find(
                      (item) => item.id === id
                    );
                    setValue("terminalId", "");
                    setValue("terminalName", "");
                    itemSelected &&
                      setValue("merchantName", itemSelected.value);
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
              render={({ field: { onChange: _onChange, ...rest } }) => (
                <SelectCustom
                  errorMsg={errors.terminalId && "This field is required"}
                  placeholder={t?.placeholderTerminal}
                  options={listTerminalNew}
                  loading={listMerchant.length ? false : true}
                  onChange={(e) => {
                    const id = e.target.value;
                    const itemSelected = listTerminalNew.find(
                      (item) => item.id === id
                    );
                    itemSelected &&
                      setValue("terminalName", itemSelected.value);
                    _onChange(e);
                  }}
                  fullWidth
                  {...rest}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box mt={3}>
          <Grid container direction="column" spacing={1}>
            <Grid item>
              <Controller
                name="isTranInternet"
                control={control}
                render={({ field: { value, ...rest } }) => {
                  return (
                    <CheckboxCustom
                      checked={value}
                      endIcon={
                        <Image width={20} height={20} src={warningIcon} />
                      }
                      label={t?.labelCheckbox1}
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
                name="isUttb"
                control={control}
                render={({ field: { value, ...rest } }) => {
                  return (
                    <CheckboxCustom
                      checked={value}
                      endIcon={
                        <Image width={20} height={20} src={warningIcon} />
                      }
                      label={t?.labelCheckbox2}
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
                name="isBond"
                control={control}
                render={({ field: { value, ...rest } }) => {
                  return (
                    <CheckboxCustom
                      checked={value}
                      endIcon={
                        <Image width={20} height={20} src={warningIcon} />
                      }
                      label={t?.labelCheckbox3}
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
          {t?.btnContinue}
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
