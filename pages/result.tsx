import React from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import RegisterSuccessPage from "components/HDBSPage/pages/RegisterSuccessPage";
import { TypeCustomer } from "components/HDBSPage/interfaces";
import _get from "lodash/get";
import { PAGE_TITLE, ROUTE_STEP, STEP_HDBS } from "components/HDBSPage/consts";
import Head from "next/head";
import * as qs from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store/reducer";
import { SECRET_KEY_ACCESS_TOKEN } from "commons/constants";
import jwt from "jsonwebtoken";

interface Props {
  toggleNotify: (desc?: string, onClose?: any) => void;
}

export async function getServerSideProps(router: any) {
  const token = router.query.jwt;
  try {
    if (!token) {
      return {
        redirect: {
          destination: "/_error",
          permanent: false,
        },
      };
    }
    const jwtInfo = jwt.verify(token, SECRET_KEY_ACCESS_TOKEN as string);
    return {
      props: {
        jwtInfo,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/_error",
        permanent: false,
      },
    };
  }
}

const ResultPage = (props: Props) => {
  const { toggleNotify } = props;
  const router = useRouter();
  const query = router.query;
  const typeCustomer = _get(query, "typeCustomer", TypeCustomer.KHHH);
  const { step }: AppState = useSelector((state) => _get(state, "app"));

  const _handleOtherTransaction = () => {
    if (typeCustomer === TypeCustomer.KHHH) {
      query.returnHome = "true"
      router.push({
        pathname: ROUTE_STEP.stepHome,
        query,
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
      </Head>

      <Script id="md5-id" src="/asset/js/md5.min.js" />

      <RegisterSuccessPage toggleNotify={toggleNotify} onClickOtherTransaction={_handleOtherTransaction} />
    </>
  );
};

export default ResultPage;
