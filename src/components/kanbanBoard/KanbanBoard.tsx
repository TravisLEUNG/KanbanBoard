import { useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './components/Column';
import { ColumnContext } from '../../context/ColumnContext';
import './KanbanBoard.scss';

const KanbanBoard = () => {
    const { columns, updateTasks } = useContext(ColumnContext);

    const handleTaskMoving = (targetColumnId: number, taskId: number) => {
        const sourceColumn = columns.find((col) =>
            col.tasks.some(({ id }) => id === taskId),
        );
        if (sourceColumn) updateTasks(sourceColumn.id, targetColumnId, taskId);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="board">
                {columns.map((column) => (
                    <Column
                        key={column.id}
                        column={column}
                        moveTaskCallBack={handleTaskMoving}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default KanbanBoard;
