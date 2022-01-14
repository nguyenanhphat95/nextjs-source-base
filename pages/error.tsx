import React from "react";
import { useRouter } from "next/router";
import { ERROR_MESSAGE_VERIFY_USER } from "pages/sbh";
import _get from "lodash/get";

const ErrorPage = () => {
  const router = useRouter();
  const { code } = router.query;
  return (
    <div>
      {_get(ERROR_MESSAGE_VERIFY_USER, `${code}`, "Invalid request")}
    </div>
  );
};

export default ErrorPage;
