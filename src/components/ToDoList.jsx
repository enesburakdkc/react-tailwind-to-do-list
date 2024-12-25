import { useState } from "react"
import ArrowUp from "../icons/arrow_upward.svg"
import ArrowDown from "../icons/arrow_downward.svg"

function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [inputTask, setInputTask] = useState("");

    function addTask(e) {
        e.preventDefault();

        if (inputTask.trim()) {
            setTasks((prevTasks) => [...prevTasks, inputTask]);
            setInputTask("");
        }
    }

    function removeTask(index) {
        setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    }

    function taskToUp(index) {
        if (index === 0) return;

        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];

            [updatedTasks[index - 1], updatedTasks[index]] = [updatedTasks[index], updatedTasks[index - 1]];
            return updatedTasks;
        });
    }

    function taskToDown(index) {
        if (index === tasks.length - 1) return;

        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];

            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            return updatedTasks;
        });
    }

    return (
        <main>
            <form onSubmit={addTask} className="inputContainer flex gap-4">
                <input type="text" placeholder="Enter a task" value={inputTask} onChange={(e) => setInputTask(e.target.value)} className="text-black border rounded-md w-72 p-1 px-2" />
                <button type="submit" id="addButton" className="px-3 bg-white border rounded-md border-gray-200 duration-300 hover:bg-black hover:text-white">Add</button>
            </form>

            <div className={`tasksContainer mt-9 bg-white p-3 rounded-md border ${tasks.length > 0 ? "block" : "hidden"}`}>
                <div className="flex flex-col gap-4 max-h-44 overflow-auto">
                    {tasks.map((task, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <span className="mx-4">{task}</span>
                            <button
                                onClick={() => removeTask(index)}
                                className="text-red-500 hover:underline ml-auto mr-4"
                            >
                                Remove
                            </button>
                            <div className="arrows flex flex-row">
                                <img
                                    src={ArrowUp}
                                    onClick={() => taskToUp(index)}
                                    className="h-5 w-5 cursor-pointer"
                                    alt="Move Up"
                                />
                                <img
                                    src={ArrowDown}
                                    onClick={() => taskToDown(index)}
                                    className="h-5 w-5 cursor-pointer"
                                    alt="Move Down"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default ToDoList