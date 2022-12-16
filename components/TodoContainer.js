import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import TodoItem from "./TodoItem";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const TodoContainer = ({todoList}) => {
    const router = useRouter();
    const [newTodo, setNewTodo] = useState("");
    const [toggle, setToggle] = useState(false);
    const inputCheckRef = useRef();
    const inputTextRef = useRef();
    const onChangeTodoInputHandler = (event) => {
        if (event.target.value) {
            setNewTodo(event.target.value);
            setToggle(!toggle);
        }
    };
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        inputCheckRef.current.disabled = true;
        inputTextRef.current.blur();
        inputTextRef.current.disabled = true;
        try {
            const result = await fetch('/api/addTodo', {
                method: 'POST',
                body: JSON.stringify({
                    todoname: inputTextRef.current.value,
                    isCompleted: inputCheckRef.current.checked
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (result.ok || result.status === 201) {
                toast('Todo is created successfully');
            } else {
                toast('There is some issue');
            }
            inputCheckRef.current.checked = false;
            setNewTodo('');
            inputTextRef.current.value = '';
        } catch (err) {
            toast('ohh! please try again');
        } finally {
            inputCheckRef.current.disabled = false;
            setToggle(false);
            inputTextRef.current.disabled = false;
        }
    }
    const listItems = JSON.parse(todoList);
    return (
        <main className="flex flex-col relative z-10 w-1/2 p-4 m-auto -mt-52 text-white gap-7">
            <div className="inline-flex align-middle">
                <h1 className="text-3xl font-bold tracking-widdest">TODO</h1>
                <div className="ml-auto">
                    <FontAwesomeIcon icon={faMoon} size={"2xl"} cursor="pointer" />
                </div>
            </div>
            <form className="bg-white w-full p-4 rounded" onSubmit={onSubmitHandler}>
                <div className="relative inline">
                    <input type="checkbox" id="addTodo" ref={inputCheckRef} />
                    <span
                        className={`ml-8 align-middle ${toggle ? 'inline' : 'hidden'} cursor-pointer text-light-veryDarkGrayishBlue`}
                        onClick={() => {
                            if (!inputTextRef.current.disabled){
                                setToggle(!toggle);
                            }
                        }}
                    >
                        {newTodo}
                    </span>
                    <input
                        type="text"
                        id="newTodoInput"
                        placeholder="Create a new todo..."
                        className={`border-none outline-none text-light-veryDarkGrayishBlue ml-8 ${!toggle ? 'inline' : 'hidden'}`}
                        onBlur={onChangeTodoInputHandler}
                        defaultValue={newTodo}
                        autoFocus={true}
                        ref={inputTextRef}
                    />
                </div>
            </form>
            <div className="bg-white w-full rounded shadow-md divide-y">
               <TodoItem items={listItems} />
                <footer className="flex p-4 text-light-darkGrayishBlue gap-6 text-xs">
                    <span>{listItems.length} items Left</span>
                    <div className="flex gap-4 m-auto">
                        <Link href='/' className={`hover:text-light-veryDarkGrayishBlue font-bold ${router.asPath === '/'? "text-[#0066ff]" : ''}`}>All</Link>
                        <Link href='/active' className={`hover:text-light-veryDarkGrayishBlue font-bold ${router.asPath === '/active' ? "text-[#0066ff]" : ''}`}>Active</Link>
                        <Link href='/completed' className={`hover:text-light-veryDarkGrayishBlue font-bold ${router.asPath === '/completed' ? "text-[#0066ff]" : ''}`}>Completed</Link>
                    </div>
                    <button className='hover:font-bold truncate'>Clear Completed</button>
                </footer>
            </div>
        </main>
    );
};

export default TodoContainer;
