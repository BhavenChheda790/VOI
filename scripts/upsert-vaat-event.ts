/**
 * One-time / maintenance: upserts the VAAT × Hardik Chauhan event.
 * Run from repo: cd web && npx tsx scripts/upsert-vaat-event.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const slug = "vaat-musical-conversation-hardik-chauhan-2026";

const body = `Celebrating **Mother's Day** — presented by **Voice of India USA**.

### Schedule
- **Tea & snacks:** 3:00 PM  
- **Show:** 3:30 PM  

### Tickets
- **VVIP:** $30 · **General:** $25 (includes tea & snacks)

**Buy tickets:** [Eventbrite](https://www.eventbrite.com/e/vaat-a-musical-conversation-with-hardik-chauhan-tickets-1987955568620)

**Pay via Zelle:** 909-696-0066

### Contacts
- **Sponsorship:** Dolly Oza — 949-280-3936  
- **Tickets:** Adhir Shah — 714-213-3288 · Mihir Gandhi — 714-809-3525 · Kishan Dholiya — +1 (469) 810-8523  

### Partners
National promoters: The Comedy Factory, Shankus Events · Tea & snacks by **Everest Cuisine of India**.

---

*Soulful tunes and stories with Hardik Chauhan — a chill musical hangout, live!*`;

async function main() {
  const row = await prisma.event.upsert({
    where: { slug },
    create: {
      title: "VAAT: A Musical Conversation with Hardik Chauhan",
      slug,
      summary:
        "Mother’s Day — soulful live music with Hardik Chauhan. Tea & snacks, Gayatri Temple Hall, Anaheim.",
      body,
      startAt: new Date("2026-05-10T15:00:00-07:00"),
      endAt: new Date("2026-05-10T17:00:00-07:00"),
      location: "Gayatri Temple Hall, 2446 W Orange Avenue, Anaheim, CA",
      imageUrl: "/images/events/vaat-hardik-chauhan-2026.png",
      ticketUrl:
        "https://www.eventbrite.com/e/vaat-a-musical-conversation-with-hardik-chauhan-tickets-1987955568620",
      kind: "UPCOMING",
      published: true,
      sortOrder: -1,
    },
    update: {
      title: "VAAT: A Musical Conversation with Hardik Chauhan",
      summary:
        "Mother’s Day — soulful live music with Hardik Chauhan. Tea & snacks, Gayatri Temple Hall, Anaheim.",
      body,
      startAt: new Date("2026-05-10T15:00:00-07:00"),
      endAt: new Date("2026-05-10T17:00:00-07:00"),
      location: "Gayatri Temple Hall, 2446 W Orange Avenue, Anaheim, CA",
      imageUrl: "/images/events/vaat-hardik-chauhan-2026.png",
      ticketUrl:
        "https://www.eventbrite.com/e/vaat-a-musical-conversation-with-hardik-chauhan-tickets-1987955568620",
      kind: "UPCOMING",
      published: true,
      sortOrder: -1,
    },
  });

  console.log("Upserted event:", row.id, row.slug);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
