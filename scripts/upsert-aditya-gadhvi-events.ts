/**
 * Upserts the two Aditya Gadhvi events (Live in Concert + Garba) as PAST events.
 * Run: cd web && npx tsx scripts/upsert-aditya-gadhvi-events.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const concertSlug = "aditya-gadhvi-live-in-concert-2025";
const garbaSlug = "garba-with-aditya-gadhvi-kaviraj-2025";

const concertBody = `**Voice of India** presented an unforgettable evening with **Aditya Gadhvi — Live in Concert**, his **first time in Los Angeles**.

### Show details
- **Date:** Saturday, May 3, 2025
- **Doors:** 6:00 PM
- **Venue:** Saban Theatre, 8440 Wilshire Blvd, Beverly Hills, CA 90211

### Tickets
General tiers ranged from **$39 → $89**, with **VIP $109** and **VVIP $129** for premium seating.

### National promoters
GKR Productions · Music Kida · Shree Sound · AARNA

---

*Thank you to the LA community that packed Saban Theatre and made this night possible.*`;

const garbaBody = `**Voice of India** presented **Garba with Aditya Gadhvi & Kaviraj** — a night of dandiya, raas, and live music.

### Show details
- **Date:** Saturday, August 30, 2025
- **Doors:** 7:30 PM
- **Venue:** Cerritos College Gym, 11110 Alondra Blvd, Norwalk, CA 90650

### Tickets
- **Early bird:** $39
- **After August 10:** $49

### Contacts (at the time of event)
- **Group tickets / booth sponsorship:** Dolly Oza — 949-424-3936
- **Tickets:** Jay Oza — 714-749-2171 · Jitu & Rina Trivedi — 840-219-5831

---

*Thank you to everyone who came out to dance — proceeds supported Voice of India programs.*`;

async function main() {
  const concert = await prisma.event.upsert({
    where: { slug: concertSlug },
    create: {
      title: "Aditya Gadhvi: Live in Concert (Los Angeles)",
      slug: concertSlug,
      summary:
        "Aditya Gadhvi’s first concert in Los Angeles — a sold-out night at Saban Theatre, Beverly Hills.",
      body: concertBody,
      startAt: new Date("2025-05-03T18:00:00-07:00"),
      endAt: new Date("2025-05-03T22:00:00-07:00"),
      location: "Saban Theatre, 8440 Wilshire Blvd, Beverly Hills, CA 90211",
      imageUrl: "/images/events/aditya-gadhvi-live-in-concert-2025.png",
      ticketUrl: null,
      kind: "PAST",
      published: true,
      sortOrder: 0,
    },
    update: {
      title: "Aditya Gadhvi: Live in Concert (Los Angeles)",
      summary:
        "Aditya Gadhvi’s first concert in Los Angeles — a sold-out night at Saban Theatre, Beverly Hills.",
      body: concertBody,
      startAt: new Date("2025-05-03T18:00:00-07:00"),
      endAt: new Date("2025-05-03T22:00:00-07:00"),
      location: "Saban Theatre, 8440 Wilshire Blvd, Beverly Hills, CA 90211",
      imageUrl: "/images/events/aditya-gadhvi-live-in-concert-2025.png",
      kind: "PAST",
      published: true,
      sortOrder: 0,
    },
  });

  const garba = await prisma.event.upsert({
    where: { slug: garbaSlug },
    create: {
      title: "Garba with Aditya Gadhvi & Kaviraj — Los Angeles",
      slug: garbaSlug,
      summary:
        "A high-energy Garba night with Aditya Gadhvi and Kaviraj at Cerritos College Gym, Norwalk, CA.",
      body: garbaBody,
      startAt: new Date("2025-08-30T19:30:00-07:00"),
      endAt: new Date("2025-08-31T00:00:00-07:00"),
      location: "Cerritos College Gym, 11110 Alondra Blvd, Norwalk, CA 90650",
      imageUrl: "/images/events/garba-aditya-gadhvi-kaviraj-2025.png",
      ticketUrl: null,
      kind: "PAST",
      published: true,
      sortOrder: 1,
    },
    update: {
      title: "Garba with Aditya Gadhvi & Kaviraj — Los Angeles",
      summary:
        "A high-energy Garba night with Aditya Gadhvi and Kaviraj at Cerritos College Gym, Norwalk, CA.",
      body: garbaBody,
      startAt: new Date("2025-08-30T19:30:00-07:00"),
      endAt: new Date("2025-08-31T00:00:00-07:00"),
      location: "Cerritos College Gym, 11110 Alondra Blvd, Norwalk, CA 90650",
      imageUrl: "/images/events/garba-aditya-gadhvi-kaviraj-2025.png",
      kind: "PAST",
      published: true,
      sortOrder: 1,
    },
  });

  console.log("Upserted events:", concert.slug, "and", garba.slug);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
