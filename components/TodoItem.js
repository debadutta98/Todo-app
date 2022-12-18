import { Reorder } from "framer-motion";
import { toast } from "react-toastify";

const TodoItem = (props) => {
    const onDeleteHandler = async (id) => {
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
                toast('Todo is deleted successfully', {
                    type: 'success'
                });
                props.deleteItem((items) => items.filter(value => (value.id !== id)))
            } else {
                toast('Failed to delete current todo', {
                    type: 'info'
                });
            }
        } catch (error) {
            toast('Error during delete current todo', {
                type: 'error'
            });
        }
    };
    const onChangeHandler = async (event, id) => {
        try {
            const result = await fetch('/api/updateTodo', {
                method: "PUT",
                body: JSON.stringify({
                    itemId: id,
                    isCompleted: event.target.checked
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (result.ok || result.status === 202) {
                toast('Todo is updated successfully', {
                    type: 'success'
                });
            } else {
                toast('Failed to update current todo', {
                    type: 'error'
                });
            }
        } catch (error) {
            toast('Error during updating current todo', {
                type: 'error'
            });
        }
    }
    return props.items.map((value, index) => {
        return <Reorder.Item value={value} id={'item-' + index} key={value.id} className="item">
            <div className="flex">
                <div className="relative">
                    <input type="checkbox" id={'done-' + index} defaultChecked={value.isCompleted} onChange={(event) => onChangeHandler.call(null, event, value.id)} />
                    <label className="text-light-veryDarkGrayishBlue dark:text-light-lightGrayishBlue2 ml-8 inline align-middle" htmlFor={'done-' + index}>{value.name}</label>
                </div>
                <button className="delete" onClick={onDeleteHandler.bind(null, value.id)}>&#x2715;</button>
            </div>
        </Reorder.Item>;
    })
}

export default TodoItem;