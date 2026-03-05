import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SubscribeRequest {
  name: string;
  email: string;
  company: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubscribeRequest;
    const { name, email, company } = body;

    // Validate required fields
    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Name, email, and company are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Add contact to Resend audience
    const { error: contactError } = await resend.contacts.create({
      email,
      firstName: name.split(" ")[0],
      lastName: name.split(" ").slice(1).join(" ") || undefined,
      unsubscribed: false,
      audienceId: "0675ded3-e4cc-494b-90c2-99421bbcf89b",
    });

    if (contactError) {
      console.error("Resend contact error:", contactError);
      // Continue even if contact creation fails (might be duplicate)
    }

    // Send notification email with lead details
    const { error: emailError } = await resend.emails.send({
      from: "Amana Compliance <onboarding@resend.dev>",
      to: "muhammad@amanacompliance.uk",
      subject: `New Checklist Download: ${company}`,
      text: `New lead from the AML Compliance Checklist download:\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}`,
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
      return NextResponse.json(
        { error: "Failed to subscribe. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
