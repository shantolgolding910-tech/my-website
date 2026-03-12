import { Router, type IRouter } from "express";
import { SubmitContactBody } from "@workspace/api-zod";
import { db, contactsTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  try {
    const parsed = SubmitContactBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid input. Please check all fields." });
      return;
    }

    const { fullName, email, phone, businessType, challenge } = parsed.data;

    const [inserted] = await db.insert(contactsTable).values({
      fullName,
      email,
      phone,
      businessType,
      challenge,
    }).returning({ id: contactsTable.id });

    res.json({
      success: true,
      message: "Thank you! We'll be in touch within 24 hours to confirm your strategy call.",
      id: inserted.id,
    });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

export default router;
