import { createContext, ReactNode, useState } from 'react';

export type TaskType = {
    id: number;
    title: string;
    description: string;
};

export type ColumnType = {
    id: number;
    title: string;
    tasks: TaskType[];
};

// Create a new context to hold the column state
export const ColumnContext = createContext<{
    taskCount: number;
    columns: ColumnType[];
    insert: (title: string, description: string) => void;
    remove: (taskId: number) => void;
    updateTasks: (sourceId: number, targetId: number, taskId: number) => void;
}>({
    taskCount: 0,
    columns: [],
    insert: () => {},
    remove: () => {},
    updateTasks: () => {},
});

const ColumnProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [taskCount, setTaskCount] = useState<number>(0);
    const [columns, setColumns] = useState<ColumnType[]>([
        { id: 1, title: 'To Do', tasks: [] },
        { id: 2, title: 'In Progress', tasks: [] },
        { id: 3, title: 'Done', tasks: [] },
    ]);

    const insert = (title: string, description: string) => {
        let [firstCol, ...Cols] = columns;
        const newTask = { id: taskCount, title, description };
        if (firstCol) firstCol.tasks.push(newTask);
        else {
            firstCol = {
                id: 1,
                title: 'To Do',
                tasks: [newTask],
            };
        }

        setColumns([firstCol, ...Cols]);
        setTaskCount(taskCount + 1);
    };

    const remove = (taskId: number) => {
        const targetColumn = columns.find((col) =>
            col.tasks.some(({ id }) => id === taskId),
        );
        if (!targetColumn) return;

        setColumns((prevCols) => {
            const targetIndex = prevCols.findIndex(
                ({ id }) => id === targetColumn.id,
            );
            const taskIndex = targetColumn.tasks.findIndex(
                ({ id }) => id === taskId,
            );
            targetColumn.tasks.splice(taskIndex, 1);
            prevCols[targetIndex].tasks = targetColumn.tasks;
            return prevCols;
        });
        setTaskCount(taskCount - 1);
    };

    const updateTasks = (
        sourceId: number,
        targetId: number,
        taskId: number,
    ) => {
        // Find source col and target col
        const newSourceColumn = columns.find((col) => col.id === sourceId);
        const newTargetColumn = columns.find(({ id }) => id === targetId);
        if (!newSourceColumn || !newTargetColumn) return;

        // Move Task and modify the tasks
        const taskIndex = newSourceColumn.tasks.findIndex(
            ({ id }) => id === taskId,
        );
        const task = newSourceColumn.tasks[taskIndex];
        newSourceColumn.tasks.splice(taskIndex, 1);
        newTargetColumn.tasks.push(task);

        // Dispatch Changes
        setColumns((prevColumns) => {
            // Create new columns
            const newColumns = [...prevColumns];
            const newSourceIndex = newColumns.findIndex(
                ({ id }) => id === newSourceColumn.id,
            );
            const newTargetIndex = newColumns.findIndex(
                ({ id }) => id === newTargetColumn.id,
            );
            newColumns[newSourceIndex].tasks = newSourceColumn.tasks;
            newColumns[newTargetIndex].tasks = newTargetColumn.tasks;
            return newColumns;
        });
    };

    return (
        <ColumnContext.Provider
            value={{ taskCount, columns, insert, remove, updateTasks }}
        >
            {children}
        </ColumnContext.Provider>
    );
};

export default ColumnProvider;
