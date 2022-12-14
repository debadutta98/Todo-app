import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import TodoItem from "./TodoItem";
import { useRef, useState } from "react";
const TodoContainer = () => {
    const [newTodo, setNewTodo] = useState("");
    const [toggle, setToggle] = useState(false);
    const onChangeTodoInputHandler = (event) => {
        if (event.target.value) {
            setNewTodo(event.target.value);
            setToggle(!toggle);
        }
    };
    return (
        <main className="flex flex-col relative z-10 w-1/2 p-4 m-auto -mt-52 text-white gap-7">
            <div className="inline-flex align-middle">
                <h1 className="text-3xl font-bold tracking-widdest">TODO</h1>
                <div className="ml-auto">
                    <FontAwesomeIcon icon={faMoon} size={"2xl"} cursor="pointer" />
                </div>
            </div>
            <form className="bg-white w-full p-4 rounded">
                <div className="relative inline">
                    <input type="checkbox" id="addTodo" />
                    {toggle ? (
                        <label
                            className="ml-8 align-middle inline cursor-pointer text-light-veryDarkGrayishBlue"
                            htmlFor="addTodo"
                            onClick={() => {
                                setToggle(!toggle);
                            }}
                        >
                            {newTodo}
                        </label>
                    ) : (
                        <input
                            type="text"
                            placeholder="Create a new todo..."
                                className="border-none outline-none text-light-veryDarkGrayishBlue ml-8"
                            onBlur={onChangeTodoInputHandler}
                            defaultValue={newTodo}
                        />
                    )}
                </div>
            </form>
            <div className="bg-white w-full rounded shadow-md divide-y">
                <TodoItem items={[{ name: "Todo List" }]} />
                <footer className="flex p-4 text-light-darkGrayishBlue gap-6 text-xs">
                    <span>5 items Left</span>
                    <div className="flex gap-4 m-auto">
                        <button>All</button>
                        <button>Active</button>
                        <button>Completed</button>
                    </div>
                    <button>Clear Completed</button>
                </footer>
            </div>
        </main>
    );
};

export default TodoContainer;
