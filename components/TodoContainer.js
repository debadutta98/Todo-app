import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import TodoItem from "./TodoItem";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Reorder } from "framer-motion";
import { useChangeMode } from "./context";
const TodoContainer = ({todoList}) => {
    const router = useRouter();
    const [newTodo, setNewTodo] = useState("");
    const [toggle, setToggle] = useState(false);
    const [lock, setLock] = useState(false);
    const [items, setTodoItems] = useState([]);
    const inputCheckRef = useRef();
    const inputTextRef = useRef();
    const ctx = useChangeMode();
    useEffect(()=>{
        const list = JSON.parse(todoList);
        setTodoItems(list);
    }, [todoList]);
    useEffect(()=>{
        const bodyEl = document.querySelector('body');
        if(ctx.darkMode){
            if (!bodyEl.classList.contains('dark')){
                bodyEl.classList.add('dark');
                bodyEl.classList.add('bg-dark-veryDarkBlue');
            }
            bodyEl.classList.remove('bg-light-lightGrayishBlue1');
        } else {
            if(bodyEl.classList.contains('dark')){
                bodyEl.classList.remove('dark');
                bodyEl.classList.remove('bg-dark-veryDarkBlue');
            }
            bodyEl.classList.add('bg-light-lightGrayishBlue1');
        }
    },[ctx.darkMode]);
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

    const deleteAllItems = async () => {
        setLock(true);
        try {
            const result = await fetch('/api/deleteAll',{
                method:'DELETE'
            })
            if(result.ok || result.status === 202) {
                toast('Delete All todos successfully',{
                    type:'success'
                });
            } else {
                toast('There is some problem please try again', {
                    type: 'error'
                });
            }
        } catch(err){
            console.log(err);
            toast('Error please try again!!',{
                type:'error'
            })
        } finally {
            setLock(false);
        }
    };
    return (
        <main className='flex flex-col relative z-10 w-[90%] sml:w-10/12 p-4 m-auto -mt-52 gap-7 md:w-3/4 mdl:w-1/2'>
            <div className="inline-flex align-middle text-light-lightgray">
                <h1 className="text-3xl font-bold tracking-widdest">TODO</h1>
                <div className="ml-auto">
                    <FontAwesomeIcon icon={!ctx.darkMode? faMoon: faSun} size={"2xl"} cursor="pointer" onClick={ctx.onChangeMode}/>
                </div>
            </div>
            <form className="bg-light-lightgray dark:bg-dark-veryDarkDesaturatedBlue w-full p-4 rounded" onSubmit={onSubmitHandler} autoComplete="off" autoCorrect="on">
                <div className="relative inline">
                    <input type="checkbox" id="addTodo" ref={inputCheckRef} />
                    <span
                        className={`ml-8 align-middle ${toggle ? 'inline' : 'hidden'} cursor-pointer text-light-veryDarkGrayishBlue dark:text-light-lightGrayishBlue2`}
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
                        className={`border-none outline-none text-light-veryDarkGrayishBlue dark:text-light-lightGrayishBlue2 ml-8 ${!toggle ? 'inline' : 'hidden'} bg-light-lightgray dark:bg-dark-veryDarkDesaturatedBlue`}
                        onBlur={onChangeTodoInputHandler}
                        defaultValue={newTodo}
                        autoFocus={true}
                        ref={inputTextRef}
                        minLength={5}
                    />
                </div>
            </form>
            <div className="bg-light-lightgray dark:bg-dark-veryDarkDesaturatedBlue w-full rounded shadow-xl divide-y dark:divide-dark-veryDarkGrayishBlue text-light-veryDarkGrayishBlue dark:text-light-lightGrayishBlue2">
                <Reorder.Group values={items} onReorder={setTodoItems} className="divide-y dark:divide-dark-veryDarkGrayishBlue text-light-veryDarkGrayishBlue dark:text-light-lightGrayishBlue2">
                    <TodoItem items={items} />
                </Reorder.Group>
                <footer className="flex p-4 text-light-darkGrayishBlue gap-6 text-xs">
                    <span>{items.length} items Left</span>
                    <div className="flex gap-4 m-auto mv:hidden">
                        <Link href='/' className={`hover:text-light-veryDarkGrayishBlue font-bold ${router.asPath === '/'? "text-[#0066ff]" : ''}`} passHref>All</Link>
                        <Link href='/active' className={`hover:text-light-veryDarkGrayishBlue font-bold ${router.asPath === '/active' ? "text-[#0066ff]" : ''}`} passHref>Active</Link>
                        <Link href='/completed' className={`hover:text-light-veryDarkGrayishBlue font-bold ${router.asPath === '/completed' ? "text-[#0066ff]" : ''}`} passHref>Completed</Link>
                    </div>
                    <button className='hover:font-bold truncate mv:ml-auto' onClick={deleteAllItems} disabled={lock}>Clear Completed</button>
                </footer>
            </div>
            <div className="hidden mv:flex p-4 bg-light-lightgray dark:bg-dark-veryDarkDesaturatedBlue text-light-darkGrayishBlue gap-6 text-xs w-full rounded shadow-xl">
                <div className="flex gap-4 m-auto">
                    <Link href='/' className={`hover:text-light-veryDarkGrayishBlue font-bold ${router.asPath === '/' ? "text-[#0066ff]" : ''}`} passHref>All</Link>
                    <Link href='/active' className={`hover:text-light-veryDarkGrayishBlue font-bold ${router.asPath === '/active' ? "text-[#0066ff]" : ''}`} passHref>Active</Link>
                    <Link href='/completed' className={`hover:text-light-veryDarkGrayishBlue font-bold ${router.asPath === '/completed' ? "text-[#0066ff]" : ''}`} passHref>Completed</Link>
                </div>
            </div>
        </main>
    );
};

export default TodoContainer;
