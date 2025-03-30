import { useRequest, useResponse } from "../../../utils/constants";

export async function GET(){
    const [_req, res] = [useRequest(), useResponse()]
    res
    .status(200)
    .json({ _id: crypto.randomUUID() })
}