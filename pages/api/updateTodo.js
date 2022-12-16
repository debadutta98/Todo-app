import mongoose from "mongoose";
import { TodoModal } from "../../models";

export default async function handler(req, res) {
    if (req.method === "PUT") {
        await mongoose.connect(process.env.DB_URL)
            .then(() => {
                console.log('mongoDb connected');
            })
            .catch((err) => {
                console.log(err);
            });
        await TodoModal.updateOne({_id: req.body.itemId}).then(() => {
            res.status(200).end();
        }).catch(() => {
            res.status(404).end();
        }).finally(async () => {
            await mongoose.disconnect();
        })
    }
}