/**
 * One-shot: update SiteConfig WhatsApp/contact number.
 *   tsx scripts/update-contact-number.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.siteConfig.update({
    where: { id: 1 },
    data: {
      whatsappCountryCode: "1",
      whatsappLocalNumber: "9492803936",
    },
  });
  console.log("Updated:", {
    code: updated.whatsappCountryCode,
    number: updated.whatsappLocalNumber,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
