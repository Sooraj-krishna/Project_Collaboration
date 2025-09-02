import { db } from "../lib/db";
import { categories, categoryOptionValues } from "../lib/schema";
import { eq } from "drizzle-orm";

async function ensureCategory(categoryName: string): Promise<number> {
	const existing = await db
		.select({ categoryId: categories.categoryId })
		.from(categories)
		.where(eq(categories.category, categoryName));

	if (existing.length > 0) {
		return existing[0].categoryId!;
	}

	const inserted = await db
		.insert(categories)
		.values({ category: categoryName })
		.returning({ categoryId: categories.categoryId });
	return inserted[0].categoryId!;
}

async function ensureOption(categoryId: number, optionName: string): Promise<void> {
	const existing = await db
		.select({ optionId: categoryOptionValues.optionId })
		.from(categoryOptionValues)
		.where(
			eq(categoryOptionValues.optionName, optionName)
		);

	if (existing.length > 0) return;

	await db.insert(categoryOptionValues).values({
		optionName,
		categoryId,
	});
}

async function seed() {
	console.log("Seeding default categories and options...");

	const seedData: Record<string, string[]> = {
		Department: [
			"CSE",
			"ECE",
			"EEE",
			"MECH",
			"CIVIL",
			"AIDS",
		],
		Domain: [
			"Web Development",
			"Mobile App",
			"AI/ML",
			"Data Science",
			"IoT",
			"Cybersecurity",
			"Other",
		],
		"Project Type": [
			"Mini Project",
			"Major Project",
			"Research",
			"Hackathon",
		],
		"Year of Submission": [
			"2023",
			"2024",
			"2025",
			"2026",
		],
	};

	for (const [categoryName, options] of Object.entries(seedData)) {
		const categoryId = await ensureCategory(categoryName);
		for (const opt of options) {
			await ensureOption(categoryId, opt);
		}
		console.log(`✔ Seeded: ${categoryName} (${options.length} options)`);
	}

	console.log("✅ Seeding complete");
	process.exit(0);
}

seed().catch((err) => {
	console.error("❌ Seeding failed:", err);
	process.exit(1);
}); 