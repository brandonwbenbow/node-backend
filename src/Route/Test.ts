import { Request, Response } from "express";

export async function GET(req: Request, res: Response) {
    console.log("Get at Test...");
}

export async function POST(req: Request, res: Response) {
    console.log("Post at Test...");
}