"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";

const heroImage = "/IMG_7327.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }


      setIsSuccess(true);
      toast.success("Message sent — we'll get back to you soon.");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setIsSuccess(false); 
  };

  return (
    <>
      <section
        className="relative flex h-[40svh] min-h-88 items-center justify-center object-contain"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImage})`,
          backgroundSize: "100%",
          backgroundPosition: "center 55%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-white text-4xl md:text-5xl font-medium tracking-tight uppercase">
          WORK WITH US
        </h1>
      </section>

      <section className="py-16 px-8 bg-surface">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 items-center">
      
      {/* LEFT: STAY UPDATED */}
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl tracking-wider text-foreground mb-10">
          Stay Updated With Lumnus
        </h2>

        {/* ICONS ROW */}
        <div className="flex justify-center gap-10 mb-10">
          <a
            href="https://www.facebook.com/lumnusconsulting"
            target="_blank"
            className="flex flex-col items-center gap-3 hover:opacity-70 transition-opacity"
          >
            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center">
              <Facebook className="text-brand-foreground" size={28} />
            </div>
            <span className="text-sm">Facebook</span>
          </a>

          <a
            href="https://www.instagram.com/lumnusconsulting"
            target="_blank"
            className="flex flex-col items-center gap-3 hover:opacity-70 transition-opacity"
          >
            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center">
              <Instagram className="text-brand-foreground" size={28} />
            </div>
            <span className="text-sm">Instagram</span>
          </a>

          <a
            href="https://www.linkedin.com/company/lumnus/posts/?feedView=all"
            target="_blank"
            className="flex flex-col items-center gap-3 hover:opacity-70 transition-opacity"
          >
            <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center">
              <Linkedin className="text-brand-foreground" size={28} />
            </div>
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>

        {/* EMAIL */}
        <a
          href="mailto:contact@lumnusconsulting.net"
          className="text-brand hover:text-brand-light text-xl font-medium text-center transition-colors"
        >
          contact@lumnusconsulting.net
        </a>
      </div>

      {/* RIGHT: FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-[2rem] bg-white/[0.03] ring-1 ring-white/10 p-6 md:p-10 shadow-xl shadow-black/20"
      >
        <div className="space-y-2">
          <Label htmlFor="contact-name" className="mb-2 block text-lg font-medium">Name</Label>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-surface rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email" className="mb-2 block text-lg font-medium">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-surface rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-subject" className="mb-2 block text-lg font-medium">Subject</Label>
          <Input
            id="contact-subject"
            name="subject"
            autoComplete="off"
            value={formData.subject}
            onChange={handleChange}
            required
            className="bg-surface rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-message" className="mb-2 block text-lg font-medium">Message</Label>
          <Textarea
            id="contact-message"
            name="message"
            autoComplete="off"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="bg-surface rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={isSending || isSuccess}
          className="w-full bg-brand hover:bg-brand-light text-brand-foreground py-3 rounded-full transition-all hover:shadow-lg active:scale-[0.98]"
        >
          {isSending
            ? "Sending…"
            : isSuccess
            ? "Message sent"
            : "Send Message"}
        </button>
      </form>
    </div>
  </section>
    </>
  );
}
