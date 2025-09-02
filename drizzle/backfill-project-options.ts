import { db } from "../lib/db";
import { projects, projectOptions, categories, categoryOptionValues } from "../lib/schema";
import { eq, and } from "drizzle-orm";

async function getCategoryIdByName(name: string): Promise<number | null> {
	const rows = await db
		.select({ categoryId: categories.categoryId })
		.from(categories)
		.where(eq(categories.category, name));
	return rows.length ? rows[0].categoryId! : null;
}

async function getOptionIdByName(categoryId: number, optionName: string): Promise<number | null> {
	const rows = await db
		.select({ optionId: categoryOptionValues.optionId })
		.from(categoryOptionValues)
		.where(and(eq(categoryOptionValues.categoryId, categoryId), eq(categoryOptionValues.optionName, optionName)));
	return rows.length ? rows[0].optionId! : null;
}

async function projectHasCategory(projectId: number, categoryId: number): Promise<boolean> {
	const rows = await db
		.select({ id: projectOptions.id })
		.from(projectOptions)
		.where(and(eq(projectOptions.projectId, projectId), eq(projectOptions.categoryId, categoryId)));
	return rows.length > 0;
}

async function backfill() {
	console.log("Starting backfill for project_options...");

	const defaultSelections: Record<string, string> = {
		Department: "CSE",
		Domain: "Web Development",
		"Project Type": "Mini Project",
		"Year of Submission": "2025",
	};

	const allProjects = await db.select({ projectId: projects.projectId, customDomain: projects.customDomain }).from(projects);
	console.log(`Found ${allProjects.length} projects`);

	for (const p of allProjects) {
		console.log(`\nProcessing project ${p.projectId}`);

		for (const [categoryName, defaultOptionName] of Object.entries(defaultSelections)) {
			const categoryId = await getCategoryIdByName(categoryName);
			if (!categoryId) {
				console.warn(`- Category missing: ${categoryName}; skipping`);
				continue;
			}

			if (await projectHasCategory(p.projectId!, categoryId)) {
				console.log(`- Mapping exists for ${categoryName}; skipping`);
				continue;
			}

			let optionName = defaultOptionName;
			if (categoryName === "Domain" && p.customDomain) {
				// If customDomain exists, link to 'Other'
				optionName = "Other";
			}

			const optionId = await getOptionIdByName(categoryId, optionName);
			if (!optionId) {
				console.warn(`- Option '${optionName}' missing in ${categoryName}; skipping`);
				continue;
			}

			await db.insert(projectOptions).values({
				projectId: p.projectId!,
				categoryId,
				optionId,
			});
			console.log(`+ Inserted mapping: ${categoryName} -> ${optionName}`);
		}
	}

	console.log("\n✅ Backfill complete");
	process.exit(0);
}

backfill().catch((err) => {
	console.error("❌ Backfill failed:", err);
	process.exit(1);
}); 