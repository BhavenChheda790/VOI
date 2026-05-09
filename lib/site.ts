import { prisma } from "@/lib/prisma";

export async function getSiteConfig() {
  const config = await prisma.siteConfig.findUnique({ where: { id: 1 } });
  if (!config) throw new Error("SiteConfig missing — run npm run db:seed");
  return config;
}

export function whatsappHref(
  countryCode: string,
  localNumber: string,
  prefilled?: string
) {
  const digits = `${countryCode.replace(/\D/g, "")}${localNumber.replace(/\D/g, "")}`;
  const url = new URL(`https://wa.me/${digits}`);
  if (prefilled) url.searchParams.set("text", prefilled);
  return url.toString();
}
