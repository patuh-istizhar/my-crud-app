import { PrismaClient } from "@prisma/client";
import TaskForm from "@/components/TaskForm";

const prisma = new PrismaClient();

export default async function EditTask({ params }: { params: { id: string } }) {
    const task = await prisma.task.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!task) {
        return <div>Task not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
            <TaskForm task={task} />
        </div>
    );
}