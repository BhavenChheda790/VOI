/**
 * One-shot: dump current DB content (events, pages, gallery, site config, FAQs)
 * to prisma/seed-data.json so it can be re-seeded into a fresh Postgres DB.
 *
 * Run while DATABASE_URL still points at the SQLite dev.db.
 *   tsx scripts/export-content.ts
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [siteConfig, pages, events, faqs, albums, images] = await Promise.all([
    prisma.siteConfig.findUnique({ where: { id: 1 } }),
    prisma.page.findMany({ orderBy: { id: "asc" } }),
    prisma.event.findMany({ orderBy: { id: "asc" } }),
    prisma.chatFaq.findMany({ orderBy: { id: "asc" } }),
    prisma.galleryAlbum.findMany({ orderBy: { id: "asc" } }),
    prisma.galleryImage.findMany({ orderBy: { id: "asc" } }),
  ]);

  const dump = {
    exportedAt: new Date().toISOString(),
    siteConfig,
    pages,
    events,
    faqs,
    albums,
    images,
  };

  const out = join(process.cwd(), "prisma", "seed-data.json");
  writeFileSync(out, JSON.stringify(dump, null, 2));

  console.log(`Wrote ${out}`);
  console.log(
    `  siteConfig=${siteConfig ? 1 : 0}  pages=${pages.length}  events=${events.length}  faqs=${faqs.length}  albums=${albums.length}  images=${images.length}`
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
