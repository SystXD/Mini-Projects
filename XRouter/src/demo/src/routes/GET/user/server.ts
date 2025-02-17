import { useRequest, useResponse } from "xantrack-router";
export default async function returnUser(){
    const [_req, res] = [useRequest(), useResponse()]
    res
    .status(200).json(
        {
            success: true
        }
    )
}