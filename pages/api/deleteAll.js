import mongoose from "mongoose";
import { TodoModal } from "../../models";

export default async function handler(req,res) {
    if(req.method === "DELETE"){
        await mongoose.connect(process.env.DB_URL)
        .then((value)=>{
            console.log('mongoDb connected');
        })
        .catch((err)=>{
            console.log('err');
        });
        await TodoModal.deleteMany().then(()=>{
            res.status(202).end();
        }).catch(()=>{
            res.status(404).end();
        }).finally(async ()=>{
            await mongoose.disconnect();
        })
    }
}