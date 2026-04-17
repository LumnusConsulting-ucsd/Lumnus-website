"use client";

import { FadeInOnScroll } from "../components/fade-scroll";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import { toast } from "sonner";

const heroImage = "/IMG_7327.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

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

      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      toast.error("Failed to send message", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
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
  };

  return (
    <>
      <section
        className="relative h-[40vh] flex items-center justify-center object-contain"
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

      <FadeInOnScroll delayMs={100}>
        <section className="py-20 px-8 bg-white">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="bg-gray-100 border border-black/10 focus-visible:ring-0 focus-visible:border-black/20 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="bg-gray-100 border border-black/10 focus-visible:ring-0 focus-visible:border-black/20 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                  className="bg-gray-100 border border-black/10 focus-visible:ring-0 focus-visible:border-black/20 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message..."
                  rows={6}
                  className="bg-gray-100 border border-black/10 focus-visible:ring-0 focus-visible:border-black/20 rounded-lg"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full max-w-md mx-auto block bg-blue-950 hover:bg-blue-900 text-white text-sm px-8 py-3 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </section>
      </FadeInOnScroll>

      <FadeInOnScroll delayMs={100}>
        <section className="py-24 px-8 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl tracking-wider text-center text-black mb-12">
              Stay Updated With Lumnus
            </h2>

            <div className="flex justify-center gap-14 mb-14">
              <a
                href="https://www.facebook.com/lumnusconsulting"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 hover:opacity-70 transition-opacity"
              >
                <div className="w-20 h-20 bg-blue-950 hover:bg-blue-900 rounded-full flex items-center justify-center transition-colors">
                  <Facebook className="text-white" size={36} />
                </div>
                <span className="text-gray-700 text-lg">Facebook</span>
              </a>

              <a
                href="https://www.instagram.com/lumnusconsulting"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 hover:opacity-70 transition-opacity"
              >
                <div className="w-20 h-20 bg-blue-950 hover:bg-blue-900 rounded-full flex items-center justify-center transition-colors">
                  <Instagram className="text-white" size={36} />
                </div>
                <span className="text-gray-700 text-lg">Instagram</span>
              </a>

              <a
                href="https://www.linkedin.com/company/lumnus/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-4 hover:opacity-70 transition-opacity"
              >
                <div className="w-20 h-20 bg-blue-950 hover:bg-blue-900 rounded-full flex items-center justify-center transition-colors">
                  <Linkedin className="text-white" size={36} />
                </div>
                <span className="text-gray-700 text-lg">LinkedIn</span>
              </a>
            </div>

            <p className="text-center text-blue-950 text-2xl md:text-2xl font-medium">
              contact@lumnusconsulting.net
            </p>
          </div>
        </section>
      </FadeInOnScroll>
    </>
  );
}