import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
const TodoContainer = () => {
    return <main className="flex flex-col relative z-10 w-1/2 p-4 m-auto text-white gap-7">
        <div className="inline-flex align-middle">
            <h1 className="text-3xl font-bold tracking-widdest">TODO</h1>
            <div className="ml-auto">
                <FontAwesomeIcon icon={faMoon} size={'2xl'} cursor="pointer" />
            </div>
        </div>
        <form className="bg-white w-full p-4 rounded">
            <div className="block relative pl-2 cursor-pointer select-none">
                <input type="checkbox" className="absolute opacity-0 cursor-pointer h-0 w-0" />
                <span className="absolute top-0 left-0 h-6 w-6 border-slate-600 border-2 rounded-full "></span>
            </div>
            <input type='text' placeholder="Create a new todo..." className="border-none outline-none text-black ml-10" />
        </form>
        <div className="bg-white w-full rounded shadow-md divide-y">
            <div className="p-4 cursor-pointer">
                <div className="flex">
                    <div className="block relative pl-2 cursor-pointer select-none">
                        <input type="checkbox" className="absolute opacity-0 cursor-pointer h-0 w-0" />
                        <span className="absolute top-0 left-0 h-6 w-6 border-slate-600 border-2 rounded-full "></span>
                    </div>
                    <span className="text-black ml-10 align-middle">Todo List</span>
                </div>
            </div>
            <footer className="flex p-4 text-black gap-6 text-sm">
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
}

export default TodoContainer;