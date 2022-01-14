import React, { useState, useMemo, useContext } from "react";
import { useRouter } from "next/router";

import { Grid, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { ButtonCustom, SelectCustom } from "components/commons";

import { LANGUAGE } from "commons/constants";
import resources from "pages/assets/translate.json";

import _get from "lodash/get";
import { AccountItem } from "interfaces/IListAccount";
import STKContext from "components/STKPage/contexts/STKContextValue";

const useStyles = makeStyles(() => ({
  root: {
    background: "white",
    borderRadius: 20,
  },
  btnCustomRegister: {
    borderColor: "#333333 !important",
    color: "#333333 !important",
  },
  title: {
    fontSize: 20,
    fontWeight: 500,
  },
  textCenter: {
    textAlign: "center",
  },
  labelAccount: {
    fontWeight: 500,
  },
}));

interface Props {
  onSubmit: (value: string | number) => void;
  listAccount?: AccountItem[];
}

const LIST_ACCOUNT = [
  {
    AcctType: "700",
    accountNo: "055704070000003",
    accountName: "kqizvy",
    balance: "1000030137",
    Ccy: "VND",
    Branchname: "PGD TAN PHU - CN LBT",
    AcctTypeName: "TGTT TRONG NUOC CN/365",
    clientInd: "N",
    acctStatus: "A",
  },
  {
    AcctType: "700",
    accountNo: "089704070000009",
    accountName: "nsqtk",
    balance: "3821455",
    Ccy: "VND",
    Branchname: "PGD NGUYEN ANH THU-CN CH",
    AcctTypeName: "TGTT TRONG NUOC CN/365",
    clientInd: "N",
    acctStatus: "A",
  },
  {
    AcctType: "700",
    accountNo: "089704070001195",
    accountName: "xmbua",
    balance: "20458897",
    Ccy: "VND",
    Branchname: "PGD NGUYEN ANH THU-CN CH",
    AcctTypeName: "TGTT TRONG NUOC CN/365",
    clientInd: "S",
    acctStatus: "A",
  },
  {
    AcctType: "80A",
    accountNo: "089959080000004",
    accountName: "yhehdq",
    balance: "0",
    Ccy: "SJC",
    Branchname: "PGD NGUYEN ANH THU-CN CH",
    AcctTypeName: "LAI PHAI TRA VGH CHUYEN DOI",
    clientInd: "N",
    acctStatus: "N",
  },
  {
    AcctType: "700",
    accountNo: "060704070002325",
    accountName: "uwnym",
    balance: "125149",
    Ccy: "VND",
    Branchname: "CN PHU NHUAN-PGD PHAN VAN TRI",
    AcctTypeName: "TGTT TRONG NUOC CN/365",
    clientInd: "N",
    acctStatus: "A",
  },
  {
    AcctType: "7PR",
    accountNo: "060704070002332",
    accountName: "pysdj",
    balance: "199328126",
    Ccy: "VND",
    Branchname: "CN PHU NHUAN-PGD PHAN VAN TRI",
    AcctTypeName: "GOI HDB PRO(7PR)",
    clientInd: "N",
    acctStatus: "A",
  },
  {
    AcctType: "922",
    accountNo: "060704090000302",
    accountName: "unpzdq",
    balance: "0",
    Ccy: "VND",
    Branchname: "CN PHU NHUAN-PGD PHAN VAN TRI",
    AcctTypeName: "TK TAM UNG SP TRA LAI TRUOC",
    clientInd: "N",
    acctStatus: "A",
  },
  {
    AcctType: "700",
    accountNo: "060704070002884",
    accountName: "xefyoc",
    balance: "2",
    Ccy: "VND",
    Branchname: "CN PHU NHUAN-PGD PHAN VAN TRI",
    AcctTypeName: "TGTT TRONG NUOC CN/365",
    clientInd: "N",
    acctStatus: "A",
  },
  {
    AcctType: "917",
    accountNo: "060704090000301",
    accountName: "ppmlxi",
    balance: "0",
    Ccy: "VND",
    Branchname: "CN PHU NHUAN-PGD PHAN VAN TRI",
    AcctTypeName: "TK TRA LAI TIET KIEM",
    clientInd: "N",
    acctStatus: "N",
  },
];

const ChooseAccountForm = (props: Props) => {
  const { onSubmit, listAccount } = props;
  const classes = useStyles();
  const [account, setAccount] = useState("");
  const { locale } = useRouter();
  const t = _get(resources, [locale || LANGUAGE.VI, "chooseAccountForm"]);
  const { loadingBtnSubmit } = useContext(STKContext);

  const listAccountNew = useMemo(() => {
    return (listAccount || []).map((item) => ({
      id: item.accountNo,
      value: item.accountNo,
    }));
  }, [listAccount]);

  return (
    <Box py={3} px={2} className={classes.root}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Box className={classes.title} display="flex" justifyContent="center">
            {t.title}
          </Box>
        </Grid>
        <Grid item>
          <Box className={classes.textCenter}>{t.content}</Box>
        </Grid>
        <Grid item>
          <Box className={classes.labelAccount}>{t.labelAccount}</Box>
        </Grid>

        <Grid item>
          <SelectCustom
            value={account}
            fullWidth
            options={listAccountNew}
            placeholder={t.placeholderAccount}
            onChange={(event) => {
              setAccount(_get(event, "target.value"));
            }}
          />
        </Grid>
      </Grid>

      <Box mt={4} className={classes.textCenter}>
        <ButtonCustom
          variant="contained"
          color="secondary"
          onClick={() => onSubmit(account)}
          disabled={account ? false : true}
          loading={loadingBtnSubmit}
        >
          {t.btnSubmit}
        </ButtonCustom>
      </Box>
    </Box>
  );
};

export default ChooseAccountForm;
