/**
 * Upserts two PAST events:
 *  - Gujarati Comedy Show with Dr. Jagdish Trivedi (June 23, 2024)
 *  - Killol in Los Angeles featuring Kinjal Dave (September 8, 2024)
 * Run: cd web && npx tsx scripts/upsert-past-events-2024.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const comedySlug = "gujarati-comedy-show-jagdish-trivedi-2024";
const killolSlug = "killol-in-los-angeles-kinjal-dave-2024";

const comedyBody = `**Voice of India** presented an evening of Gujarati comedy with **Dr. Jagdish Trivedi**.

> *ત્રણ કલાક, ટેન્શનને તલ્લાક, હસી ખડખડાટ* — three hours, divorce from tension, roaring laughter.

### Show details
- **Date:** Sunday, June 23, 2024
- **Time:** 4:30 PM onwards
- **Venue:** Loara High School, 1765 W Cerritos Ave, Anaheim, CA 92804

### Highlights
- **Free parking** for all attendees
- **Free dinner** served for everyone

---

*Thank you to the community that filled the hall and laughed with us.*`;

const killolBody = `**Voice of India Group** presented **Killol in Los Angeles** featuring the **Garba Queen Kinjal Dave**.

### Show details
- **Date:** Sunday, September 8, 2024
- **Time:** 6:00 PM
- **City:** Los Angeles, CA

### Tickets (at the time of event)
- **Early bird:** $30 (Sulekha — offer ended July 20, 2024)

### National promoter
**Manpasand** — +1 (630) 307-2093

---

*A night of dandiya, raas, and music — thank you to everyone who joined us.*`;

async function main() {
  const comedy = await prisma.event.upsert({
    where: { slug: comedySlug },
    create: {
      title: "Gujarati Comedy Show with Dr. Jagdish Trivedi",
      slug: comedySlug,
      summary:
        "An evening of Gujarati comedy with Dr. Jagdish Trivedi — free parking and free dinner for all, at Loara High School, Anaheim.",
      body: comedyBody,
      startAt: new Date("2024-06-23T16:30:00-07:00"),
      endAt: new Date("2024-06-23T20:30:00-07:00"),
      location: "Loara High School, 1765 W Cerritos Ave, Anaheim, CA 92804",
      imageUrl: "/images/events/gujarati-comedy-jagdish-trivedi-2024.png",
      ticketUrl: null,
      kind: "PAST",
      published: true,
      sortOrder: 2,
    },
    update: {
      title: "Gujarati Comedy Show with Dr. Jagdish Trivedi",
      summary:
        "An evening of Gujarati comedy with Dr. Jagdish Trivedi — free parking and free dinner for all, at Loara High School, Anaheim.",
      body: comedyBody,
      startAt: new Date("2024-06-23T16:30:00-07:00"),
      endAt: new Date("2024-06-23T20:30:00-07:00"),
      location: "Loara High School, 1765 W Cerritos Ave, Anaheim, CA 92804",
      imageUrl: "/images/events/gujarati-comedy-jagdish-trivedi-2024.png",
      kind: "PAST",
      published: true,
      sortOrder: 2,
    },
  });

  const killol = await prisma.event.upsert({
    where: { slug: killolSlug },
    create: {
      title: "Killol in Los Angeles — Kinjal Dave",
      slug: killolSlug,
      summary:
        "Garba Queen Kinjal Dave live in Los Angeles — a high-energy night presented by Voice of India Group.",
      body: killolBody,
      startAt: new Date("2024-09-08T18:00:00-07:00"),
      endAt: new Date("2024-09-08T23:00:00-07:00"),
      location: "Los Angeles, CA",
      imageUrl: "/images/events/killol-kinjal-dave-2024.png",
      ticketUrl: null,
      kind: "PAST",
      published: true,
      sortOrder: 3,
    },
    update: {
      title: "Killol in Los Angeles — Kinjal Dave",
      summary:
        "Garba Queen Kinjal Dave live in Los Angeles — a high-energy night presented by Voice of India Group.",
      body: killolBody,
      startAt: new Date("2024-09-08T18:00:00-07:00"),
      endAt: new Date("2024-09-08T23:00:00-07:00"),
      location: "Los Angeles, CA",
      imageUrl: "/images/events/killol-kinjal-dave-2024.png",
      kind: "PAST",
      published: true,
      sortOrder: 3,
    },
  });

  console.log("Upserted events:", comedy.slug, "and", killol.slug);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
