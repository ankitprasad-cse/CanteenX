import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ data?: string }> | { data?: string };
}

interface DecodedItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

interface DecodedOrder {
  orderNumber: string;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  total: number;
  qrToken?: string;
  items: DecodedItem[];
}

function decodeServerPayload(encodedData?: string): DecodedOrder | null {
  if (!encodedData) return null;

  try {
    let cleaned = encodedData;
    if (cleaned.includes("%")) {
      try {
        cleaned = decodeURIComponent(cleaned);
      } catch {
        // use cleaned string as-is if decoding fails
      }
    }

    cleaned = cleaned.replace(/ /g, "+");
    const remainder = cleaned.length % 4;
    if (remainder > 0) {
      cleaned = cleaned.padEnd(cleaned.length + (4 - remainder), "=");
    }

    const binaryString = Buffer.from(cleaned, "base64").toString("utf-8");
    let jsonString = binaryString;
    try {
      jsonString = decodeURIComponent(
        binaryString
          .split("")
          .map((char) => "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    } catch {
      // jsonString already holds binaryString
    }

    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== "object" || !parsed.on || !Array.isArray(parsed.it)) {
      return null;
    }

    const items: DecodedItem[] = parsed.it.map((item: [string, number, number]) => ({
      name: String(item[0] || "Item"),
      quantity: Number(item[1]) || 1,
      unitPrice: Number(item[2]) || 0,
    }));

    return {
      orderNumber: String(parsed.on),
      status: String(parsed.st || "PLACED"),
      paymentMethod: String(parsed.pm || "CASH"),
      paymentStatus: String(parsed.ps || "PENDING"),
      total: Number(parsed.tt) || 0,
      qrToken: parsed.qt ? String(parsed.qt) : undefined,
      items,
    };
  } catch {
    return null;
  }
}

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const dataParam = resolvedParams?.data;
  const order = decodeServerPayload(dataParam);

  return (
    <div className="min-h-screen bg-surface-subtle flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg bg-surface border border-border rounded-card shadow-sm overflow-hidden">
        {/* Success Header Banner */}
        <div className="bg-emerald-600 p-6 text-white text-center">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-black">
            ✓
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Payment Successful
          </h1>
          <p className="text-xs uppercase tracking-wider font-semibold opacity-90 mt-1">
            CanteenX Demo Order Confirmed
          </p>
        </div>

        <div className="p-6 space-y-6">
          {order ? (
            <>
              {/* Order Number & Optional Token */}
              <div className="bg-surface-subtle border border-border rounded-card p-4 text-center">
                {order.qrToken && (
                  <div className="mb-1">
                    <p className="text-xs uppercase font-bold text-content-muted tracking-wider">
                      Pickup Token
                    </p>
                    <p className="text-3xl font-extrabold text-primary tracking-tight">
                      {order.qrToken}
                    </p>
                  </div>
                )}
                <p className="text-sm font-semibold text-content-secondary">
                  Order #{order.orderNumber}
                </p>
              </div>

              {/* Status & Payment Information */}
              <div className="grid grid-cols-2 gap-3 text-xs border-y border-border py-4">
                <div>
                  <span className="text-content-muted block">Order Status</span>
                  <span className="font-semibold text-content-primary uppercase">
                    {order.status}
                  </span>
                </div>
                <div>
                  <span className="text-content-muted block">Payment Method</span>
                  <span className="font-semibold text-content-primary uppercase">
                    {order.paymentMethod}
                  </span>
                </div>
                <div>
                  <span className="text-content-muted block">Payment Status</span>
                  <span className="font-semibold text-emerald-600 uppercase">
                    {order.paymentStatus}
                  </span>
                </div>
                <div>
                  <span className="text-content-muted block">Verification</span>
                  <span className="font-semibold text-content-primary">
                    Instant Demo
                  </span>
                </div>
              </div>

              {/* Ordered Items List */}
              <div>
                <h2 className="text-xs uppercase font-bold tracking-wider text-content-muted mb-3">
                  Ordered Items
                </h2>
                <div className="space-y-3 divide-y divide-border">
                  {order.items.map((item, idx) => {
                    const subtotal = item.unitPrice * item.quantity;
                    return (
                      <div
                        key={idx}
                        className="pt-3 first:pt-0 flex items-center justify-between text-sm"
                      >
                        <div className="pr-4">
                          <p className="font-medium text-content-primary">
                            {item.name}
                          </p>
                          <p className="text-xs text-content-muted">
                            {item.quantity} × ₹{item.unitPrice.toFixed(2)}
                          </p>
                        </div>
                        <span className="font-semibold text-content-primary shrink-0">
                          ₹{subtotal.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total Amount */}
              <div className="border-t border-border pt-3 flex items-baseline justify-between">
                <span className="text-sm font-bold text-content-primary">
                  Total Amount
                </span>
                <span className="text-2xl font-black text-primary">
                  ₹{order.total.toFixed(2)}
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                !
              </div>
              <h2 className="text-lg font-bold text-content-primary">
                Unable to read order information
              </h2>
              <p className="text-xs text-content-muted">
                The QR link is missing or contains invalid order data.
              </p>
            </div>
          )}

          {/* Home Link */}
          <div className="pt-2">
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-control transition-colors shadow-sm text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}