import { readFileSync } from "node:fs";
import { join } from "node:path";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type Dump = {
  siteConfig: Record<string, unknown> | null;
  pages: Array<Record<string, unknown>>;
  events: Array<Record<string, unknown>>;
  faqs: Array<Record<string, unknown>>;
  albums: Array<{ id: number; slug: string } & Record<string, unknown>>;
  images: Array<{ albumId: number } & Record<string, unknown>>;
};

function loadDump(): Dump | null {
  try {
    const raw = readFileSync(join(__dirname, "seed-data.json"), "utf8");
    return JSON.parse(raw) as Dump;
  } catch {
    return null;
  }
}

function stripIdAndTimestamps<T extends Record<string, unknown>>(row: T) {
  const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = row;
  return rest;
}

async function main() {
  const dump = loadDump();
  if (!dump) {
    throw new Error(
      "prisma/seed-data.json missing. Run `npx tsx scripts/export-content.ts` against your source DB first."
    );
  }

  await prisma.donationProof.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.galleryAlbum.deleteMany();
  await prisma.chatFaq.deleteMany();
  await prisma.event.deleteMany();
  await prisma.page.deleteMany();
  await prisma.siteConfig.deleteMany();
  await prisma.adminUser.deleteMany();

  const passwordHash = await bcrypt.hash("changeme", 10);
  await prisma.adminUser.create({
    data: {
      email: process.env.ADMIN_EMAIL ?? "admin@voi.local",
      passwordHash,
    },
  });

  if (dump.siteConfig) {
    const { id: _id, updatedAt: _u, ...rest } = dump.siteConfig as Record<string, unknown>;
    await prisma.siteConfig.create({ data: { id: 1, ...(rest as object) } });
  }

  for (const p of dump.pages) {
    await prisma.page.create({ data: stripIdAndTimestamps(p) as never });
  }

  for (const e of dump.events) {
    const { startAt, endAt, ...rest } = stripIdAndTimestamps(e) as Record<string, unknown>;
    await prisma.event.create({
      data: {
        ...(rest as object),
        startAt: startAt ? new Date(startAt as string) : null,
        endAt: endAt ? new Date(endAt as string) : null,
      } as never,
    });
  }

  for (const f of dump.faqs) {
    await prisma.chatFaq.create({ data: stripIdAndTimestamps(f) as never });
  }

  // Gallery: keep album ↔ image relation across new IDs.
  const oldToNewAlbumId = new Map<number, number>();
  for (const a of dump.albums) {
    const created = await prisma.galleryAlbum.create({
      data: stripIdAndTimestamps(a) as never,
    });
    oldToNewAlbumId.set(a.id, created.id);
  }
  for (const img of dump.images) {
    const newAlbumId = oldToNewAlbumId.get(img.albumId);
    if (!newAlbumId) {
      console.warn(`Skipping image with unknown albumId=${img.albumId}`);
      continue;
    }
    const { albumId: _a, ...rest } = stripIdAndTimestamps(img) as Record<string, unknown>;
    await prisma.galleryImage.create({
      data: { ...(rest as object), albumId: newAlbumId } as never,
    });
  }

  console.log(
    `Seed complete. siteConfig=${dump.siteConfig ? 1 : 0} pages=${dump.pages.length} events=${dump.events.length} faqs=${dump.faqs.length} albums=${dump.albums.length} images=${dump.images.length}`
  );
  console.log(`Admin login: ${process.env.ADMIN_EMAIL ?? "admin@voi.local"} / changeme`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
