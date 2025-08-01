import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { title, description } = await request.json();
        const task = await prisma.task.update({
            where: { id: parseInt(params.id) },
            data: { title, description },
        });
        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.task.delete({
            where: { id: parseInt(params.id) },
        });
        return NextResponse.json({ message: "Task deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}