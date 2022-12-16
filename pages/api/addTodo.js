import mongoose from 'mongoose';
import { TodoModal } from '../../models';
export default function handler(req, res) {
    if (req.method === 'POST') {
        mongoose.connect(process.env.DB_URL).then(async (db) => {
            console.log("mongoDB connected");
            const todoDoc = new TodoModal({
                name: req.body.todoname,
                isCompleted: req.body.isCompleted
            });
            const result = await todoDoc.save();
            if (result && result._id) {
                await db.disconnect()
                res.status(201).json({ message: 'doc is successfully saved' });
            } else {
                await db.disconnect()
                res.status(400).json({ message: 'getting error while creating document' });
            }
        }).catch((reason) => {
            console.log(reason);
            res.status(403).json({ message: 'DB connection error' });
        })
    }
}