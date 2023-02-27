import { useDrag } from 'react-dnd';
import { TaskType } from '../../../context/ColumnContext';

const Task: React.FC<{ task: TaskType }> = ({ task }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={dragRef} className="task">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
        </div>
    );
};

export default Task;
