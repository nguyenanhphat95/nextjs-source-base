import React from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import RegisterSuccessPage from "components/HDBSPage/pages/RegisterSuccessPage";
import { TypeCustomer } from "components/HDBSPage/interfaces";
import _get from "lodash/get";
import { PAGE_TITLE, STEP_HDBS } from "components/HDBSPage/consts";
import Head from "next/head";
import * as qs from "query-string";

const ResultPage = () => {
  const router = useRouter();
  const query = router.query;
  const typeCustomer = _get(query, "typeCustomer", TypeCustomer.KHHH);

  const _handleOtherTransaction = () => {
    if (typeCustomer === TypeCustomer.KHHH) {
      const params = {
        ...query,
        step: STEP_HDBS.stepHome,
      };
      window.location.href = `/tkckhdbs?${qs.stringify(params)}`;
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

      <Script id="md5-id" src="/asset/js/md5.min.js" />

      <RegisterSuccessPage onClickOtherTransaction={_handleOtherTransaction} />
    </>
  );
};

export default ResultPage;
