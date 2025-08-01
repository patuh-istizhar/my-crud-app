"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Task {
    id: number;
    title: string;
    description?: string | null;
}

export default function TaskList({ tasks }: { tasks: Task[] }) {
    const router = useRouter();

    const handleDelete = async (id: number) => {
        await fetch(`/api/tasks/${id}`, { method: "DELETE" });
        router.refresh();
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.map((task) => (
                    <TableRow key={task.id}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.description || "-"}</TableCell>
                        <TableCell>
                            <Link href={`/edit/${task.id}`}>
                                <Button variant="outline" className="mr-2">Edit</Button>
                            </Link>
                            <Button variant="destructive" onClick={() => handleDelete(task.id)}>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}