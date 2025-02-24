import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const data = await req.json();
  const filePath = path.join(process.cwd(), "data", "projects.json");

  // Read existing projects
  let projects = [];
  if (fs.existsSync(filePath)) {
    const jsonData = fs.readFileSync(filePath, "utf-8");
    projects = JSON.parse(jsonData);
  }

  // Add new project
  projects.push(data);

  // Save to file
  fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));

  return NextResponse.json({ message: "Project saved successfully!" }, { status: 200 });
}
