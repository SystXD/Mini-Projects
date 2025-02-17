import { useRequest, useResponse } from "xantrack-router";

const fruits = [
    { name: "apple", description: "A sweet, crunchy fruit." },
    { name: "banana", description: "A soft, yellow fruit." },
    { name: "mango", description: "A juicy, tropical fruit." },
    { name: "grape", description: "A small, juicy berry." },
    { name: "peach", description: "A fuzzy, sweet fruit." }
  ]
export default async function returnFruit(){
    const [req, res] = [useRequest(), useResponse()]
    const { fruit } = req.params;
    res
    .status(200)
    .json(fruits.find(f => f.name === fruit))
}