import type { NextApiRequest, NextApiResponse } from "next";
import axiosWrapper from "commons/helpers/axios/axios-instance";
import { AxiosResponse } from "axios";
import { API_DOMAIN } from "commons/constants";
import { GetMerchantResponse } from "interfaces/IGetMerchant";

const MOCK_DATA = {
  data: {
    merchantNames: [
      { merchantId: "merchantId1", merchantName: "Cong ty 1" },
      { merchantId: "merchantId2", merchantName: "Cong ty 2" },
      { merchantId: "merchantId3", merchantName: "Cong ty 3" },
    ],
    ternimalNames: [
      {
        terminalId: "terminalId1",
        terminalName: "terminalName1",
        merchantId: "merchantId1",
      },
      {
        terminalId: "terminalId2",
        terminalName: "terminalNam2",
        merchantId: "merchantId2",
      },
      {
        terminalId: "terminalId3",
        terminalName: "terminalName3",
        merchantId: "merchantId13",
      },
      {
        terminalId: "terminalId4",
        terminalName: "terminalName4",
        merchantId: "merchantId1",
      },
    ],
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetMerchantResponse>
) {
  // const url = `${API_DOMAIN}/getMerchant`;
  // const resp: AxiosResponse<GetMerchantResponse> = await axiosWrapper.post(
  //   url,
  //   req.body
  // );
  // res.status(200).json(resp.data);
  res.status(200).json(MOCK_DATA);
}
