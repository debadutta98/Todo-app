import { toast } from "react-toastify";

const TodoItem = (props) => {
    const onDeleteHandler = async (id) => {
        console.log(id);
        try {
            const result = await fetch('/api/deleteTodo', {
                method: "DELETE",
                body: JSON.stringify({
                    listId: id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (result.ok || result.status === 202) {
                toast('Todo is deleted successfully',{
                    type:'success'
                });
            } else {
                toast('Failed to delete current todo',{
                    type:'info'
                });
            }
        } catch (error) {
            toast('Error during delete current todo',{
                type:'error'
            });
        }
    };
    return props.items.map((value, index) => {
        return <div className="item" key={value.id}>
            <div className="flex">
                <div className="relative">
                    <input type="checkbox" id='c1' defaultChecked={value.isCompleted}/>
                    <label className="text-light-veryDarkGrayishBlue ml-8 inline align-middle" htmlFor="c1">{value.name}</label>
                </div>
                <button className="delete" onClick={onDeleteHandler.bind(null, value.id)}>&#x2715;</button>
            </div>
        </div>
    })
}

export default TodoItem;