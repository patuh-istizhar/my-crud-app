import { PrismaClient } from "@prisma/client";
import TaskList from "@/components/TaskList";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

export default async function Home() {
  const tasks = await prisma.task.findMany();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <Link href="/create">
        <Button className="mb-4">Create New Task</Button>
      </Link>
      <TaskList tasks={tasks} />
    </div>
  );
}