import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { webinarRegistrationSchema } from "@/lib/validations/webinar";
import { sendWebinarConfirmation } from "@/lib/email";
import { generateCalendarLinks } from "@/lib/calendar";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = webinarRegistrationSchema.parse(body);
    const { webinarId } = body;

    if (!webinarId) {
      return NextResponse.json({ error: "Webinar ID is required" }, { status: 400 });
    }

    const webinar = await prisma.webinar.findUnique({
      where: { id: webinarId }
    });

    if (!webinar) {
      return NextResponse.json({ error: "Webinar not found" }, { status: 404 });
    }

    // Create registration in database
    const registration = await prisma.webinarRegistration.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        jobTitle: validatedData.jobTitle,
        companyName: validatedData.companyName,
        country: validatedData.country,
        state: validatedData.state,
        city: validatedData.city,
        industry: validatedData.industry,
        timezone: validatedData.timezone,
        howDidYouHear: validatedData.howDidYouHear,
        topicsOfInterest: validatedData.topicsOfInterest,
        agreeToTerms: validatedData.agreeToTerms,
        subscribeUpdates: validatedData.subscribeUpdates,
        webinarId: webinar.id,
      },
    });

    // Generate calendar links
    const webinarDate = new Date(webinar.scheduledAt);
    const endDate = new Date(webinarDate.getTime() + 60 * 60 * 1000); // 1 hour duration

    const calendarLinks = generateCalendarLinks({
      title: webinar.title,
      description: webinar.description || "Join us for an insightful session on business growth strategies.",
      location: "Online (Link to be sent via email)",
      startTime: webinarDate,
      endTime: endDate,
    });

    // Send confirmation email
    await sendWebinarConfirmation({
      email: validatedData.email,
      firstName: validatedData.firstName,
      calendarLinks,
    });

    return NextResponse.json(
      { 
        message: "Registration successful!", 
        id: registration.id,
        calendarLinks
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error in webinar registration:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", details: (error as unknown as { errors: unknown[] }).errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
