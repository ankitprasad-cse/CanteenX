import ReceiptPageClient from "./ReceiptPageClient";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;

  return <ReceiptPageClient requestedOrderNumber={params.order ?? null} />;
}
