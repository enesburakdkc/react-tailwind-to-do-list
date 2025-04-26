import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [inputTask, setInputTask] = useState("");

    function addTask(e) {
        e.preventDefault();

        if (inputTask.trim()) {
            const newTask = {
                id: Date.now().toString(),
                text: inputTask
            };
            setTasks((prevTasks) => [...prevTasks, newTask]);
            setInputTask("");
        }
    }

    function removeTask(id) {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
    }

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(tasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTasks(items);
    };

    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-light text-gray-700 mb-8 text-center">To-Do List</h1>
            
            <form onSubmit={addTask} className="flex gap-2 mb-8">
                <input 
                    type="text" 
                    placeholder="Enter a task..." 
                    value={inputTask} 
                    onChange={(e) => setInputTask(e.target.value)} 
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 text-gray-700"
                />
                <button 
                    type="submit" 
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                >
                    Add
                </button>
            </form>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div 
                            {...provided.droppableProps} 
                            ref={provided.innerRef}
                            className={`bg-white rounded-lg shadow-sm p-4 ${tasks.length > 0 ? "block" : "hidden"}`}
                        >
                            <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                                {tasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 group"
                                            >
                                                <span 
                                                    className="text-gray-600"
                                                    title={task.text}
                                                >
                                                    {task.text.length > 22 ? `${task.text.substring(0, 22)}...` : task.text}
                                                </span>
                                                <button
                                                    onClick={() => removeTask(task.id)}
                                                    className="p-1 ml-2 text-gray-400 hover:text-red-500 rounded-full"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </main>
    )
}

export default ToDoList