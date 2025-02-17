import { useRequest, useResponse } from "xantrack-router";
const animals = [
    { name: "tiger", description: "A fierce, striped predator." },
    { name: "elephant", description: "A giant, gentle mammal." },
    { name: "wolf", description: "A cunning, pack hunter." },
    { name: "eagle", description: "A sharp-eyed, soaring bird." },
    { name: "cobra", description: "A venomous, hooded snake." }
  ];

export const GET = () => {
    const [req, res] = [useRequest(), useResponse()]
    res
    .status(200)
    .json(animals[Math.floor(Math.random()*6)])
}
export const POST = () => {
    const [req, res] = [useRequest(), useResponse()]
    const { name, description } = req.body;
    animals.push({ name, description });
    res
    .status(200)
    .json({ success: true, message: 'Updated the animals' })
}