import { useDrop } from 'react-dnd';
import Task from './Task';
import { ColumnType } from '../../../context/ColumnContext';

const Column: React.FC<{
    column: ColumnType;
    moveTaskCallBack: (targetColumnId: number, taskId: number) => void;
}> = ({ column, moveTaskCallBack }) => {
    const [, dropRef] = useDrop({
        accept: 'TASK',
        canDrop: () => true,
        drop: (item: { id: number }) => {
            moveTaskCallBack(column.id, item.id);
        },
    });

    return (
        <div ref={dropRef} className="column">
            <h3>{column.title}</h3>
            <div className="task-list">
                {column.tasks.map((task) => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

export default Column;
