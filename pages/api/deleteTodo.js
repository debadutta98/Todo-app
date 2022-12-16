import mongoose, {ObjectId} from "mongoose";
import { TodoModal } from "../../models";
export default async function handler(req, res) {
    if(req.method === 'DELETE') {
        await mongoose.connect(process.env.DB_URL).then((value)=>{
            console.log('mongodb connected');
        }).catch(err=>{
            console.log(err);
        });
        await TodoModal.deleteOne({_id: req.body.listId}).then(async ()=>{
            res.status(202).end();
        }).catch((error)=>{
            res.status(404).end();
            console.log(error);
        }).finally(async ()=>{
            await mongoose.disconnect();
        });
    }
}