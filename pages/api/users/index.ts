// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../database/conn";

type Data = {
	name: string;
};

export default async function userHandler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	connectMongo();
}
