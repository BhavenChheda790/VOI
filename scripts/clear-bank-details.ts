/**
 * One-shot: clear placeholder bank-transfer fields from SiteConfig.
 * Removes the "Bank Transfer / Direct deposit" block from the public donate
 * page AND stops the WhatsApp bot from sharing those details.
 *
 *   tsx scripts/clear-bank-details.ts
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const updated = await prisma.siteConfig.update({
    where: { id: 1 },
    data: {
      bankName: null,
      bankAccountName: null,
      bankAccountNumber: null,
      bankRoutingNumber: null,
      paymentInstructions: null,
    },
  });
  console.log("Cleared bank fields:", {
    bankName: updated.bankName,
    bankAccountName: updated.bankAccountName,
    bankAccountNumber: updated.bankAccountNumber,
    bankRoutingNumber: updated.bankRoutingNumber,
    paymentInstructions: updated.paymentInstructions,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
