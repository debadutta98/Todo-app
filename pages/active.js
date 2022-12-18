import mongoose, { ObjectId } from "mongoose";
import TodoContainer from "../components/TodoContainer";
import { TodoModal } from "../models";

export default function ActiveTodos({ todoList }) {
    return <TodoContainer todoList={todoList} />
}

export async function getServerSideProps() {
    await mongoose.connect(process.env.DB_URL).then(() => {
        console.log('monodb connected');
    }).catch((err) => {
        console.log(err);
    });
    const list = await TodoModal.find({ isCompleted: false });
    const modifiedRecordsId = list.map((value) => {
        return {
            id: value._id.toString(),
            name: value.name,
            isCompleted: value.isCompleted
        }
    });
    await mongoose.disconnect()
    return {
        props: {
            todoList: JSON.stringify(modifiedRecordsId)
        }
    }
}