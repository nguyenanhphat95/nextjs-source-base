import React from "react";
import { useRouter } from "next/router";
import _get from "lodash/get";
import { ERROR_MESSAGE_VERIFY_USER } from "components/STKPage/const";

const ErrorPage = () => {
  const router = useRouter();
  const { code } = router.query;
  return (
    <div>{_get(ERROR_MESSAGE_VERIFY_USER, `${code}`, "Invalid request")}</div>
  );
};

export default ErrorPage;
