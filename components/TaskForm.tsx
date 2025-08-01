"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface TaskFormProps {
    task?: { id?: number; title: string; description?: string | null };
}

export default function TaskForm({ task }: TaskFormProps) {
    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = task?.id ? "PUT" : "POST";
        const url = task?.id ? `/api/tasks/${task.id}` : "/api/tasks";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description }),
        });
        router.push("/");
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <Button type="submit">{task?.id ? "Update" : "Create"} Task</Button>
        </form>
    );
}