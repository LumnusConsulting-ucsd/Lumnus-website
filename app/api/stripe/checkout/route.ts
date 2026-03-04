import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { amount, isOngoing, orgName, contactName, email, message } =
      await req.json();

    const amountCents = Math.round(Number(amount) * 100);

    if (!amountCents || amountCents < 100) {
      return NextResponse.json(
        { error: "Invalid donation amount." },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: isOngoing ? "subscription" : "payment",
      customer_email: email,

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: isOngoing
                ? "Lumnus Monthly Sponsorship"
                : "Lumnus Sponsorship",
            },

            unit_amount: amountCents,

            ...(isOngoing && {
              recurring: { interval: "month" },
            }),
          },
          quantity: 1,
        },
      ],

      metadata: {
        orgName: orgName || "",
        contactName: contactName || "",
        email: email || "",
        message: message || "",
      },

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/sponsor/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/sponsor`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}