import React from "react";
import { useRouter } from "next/router";
import RegisterSuccessPage from "components/HDBSPage/pages/RegisterSuccessPage";
import { TypeCustomer } from "components/HDBSPage/interfaces";
import _get from "lodash/get";
import { PAGE_TITLE, STEP_HDBS } from "components/HDBSPage/consts";
import Head from "next/head";

const ResultPage = () => {
  const router = useRouter();
  const query = router.query;
  const typeCustomer = _get(query, "typeCustomer", TypeCustomer.KHHH);

  const _handleOtherTransaction = () => {
    if (typeCustomer === TypeCustomer.KHHH) {
      router.push({
        pathname: "/tkckhdbs",
        query: {
          ...query,
          step: STEP_HDBS.stepHome,
        },
      });
      return;
    }
    router.push({
      pathname: "/backToHome",
    });
  };

  return (
    <>
      <Head>
        <title>{PAGE_TITLE[STEP_HDBS.step4]}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <RegisterSuccessPage onClickOtherTransaction={_handleOtherTransaction} />
    </>
  );
};

export default ResultPage;
