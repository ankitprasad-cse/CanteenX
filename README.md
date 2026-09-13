# Campus Canteen — Checkout + Digital Receipt Prototype

A clean Next.js prototype for a university canteen ordering flow.

## Included
- Student menu/home page
- Search and category filtering
- Shared cart state
- Cart quantity controls
- Checkout page
- Cash at counter (default)
- Online payment demo option (no real gateway)
- Duplicate-click protection while placing an order
- Order lifecycle starting at `PLACED`
- Digital order receipt / ticket
- Secure QR token generated for each order
- Order status page integration
- Current order persistence in browser localStorage
- Responsive mobile bottom navigation
- No `app/template.tsx`
- No artificial page-transition animation that traps fixed navigation

## Run

Use Node.js 20+ (Node 22/24 is fine).

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

For a production test:

```bash
npm run build
npm start
```

## Demo flow

1. Open the home page.
2. Add food to the cart.
3. Open Cart.
4. Click `Proceed to checkout`.
5. Keep `Cash at counter` selected or choose the clearly labelled online demo.
6. Click `Place order`.
7. The cart is cleared only after order creation.
8. The digital receipt appears at `/checkout/success` with order number, customer, time, items, total, payment method, status and QR code.
9. `View order status` opens `/orders` and shows the newly created order.

The QR contains an order number plus a random token only; it does not contain sensitive student information.
