// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { writeLog } from "commons/helpers/logger";
import type { NextApiRequest, NextApiResponse } from "next";
import { getTodayWithFormat } from "commons/helpers/date";
import { LogData } from "interfaces/ICommon";
import ip from "ip";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const body: LogData = req.body;
  writeLog(
    ip.address(),
    getTodayWithFormat(),
    body.content,
    JSON.stringify(req.body)
  );
  res.status(200).json(true);
}
