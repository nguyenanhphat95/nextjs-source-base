import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import { InquiryEKYCPresentResponse } from "interfaces/IInquiryEKYCPresent";

const MOCK_DATA = {
  data: {
    responseCode: "00",
    responseDesc: "Successfully",
    hasSendOtp: false,
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InquiryEKYCPresentResponse>
) {
  // const url = `${API_DOMAIN}/getMerchant`;
  // const resp: AxiosResponse<GetMerchantResponse> = await axiosWrapper.post(
  //   url,
  //   req.body
  // );
  // res.status(200).json(resp.data);
  res.status(200).json(MOCK_DATA);
}
