"use client";

import { FadeInOnScroll } from "../components/fade-scroll";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
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

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
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
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 items-center">
      
      {/* LEFT: STAY UPDATED */}
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl tracking-wider text-black mb-10">
          Stay Updated With Lumnus
        </h2>

        {/* ICONS ROW */}
        <div className="flex justify-center gap-10 mb-10">
          <a
            href="https://www.facebook.com/lumnusconsulting"
            target="_blank"
            className="flex flex-col items-center gap-3 hover:opacity-70 transition-opacity"
          >
            <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center">
              <Facebook className="text-white" size={28} />
            </div>
            <span className="text-sm">Facebook</span>
          </a>

          <a
            href="https://www.instagram.com/lumnusconsulting"
            target="_blank"
            className="flex flex-col items-center gap-3 hover:opacity-70 transition-opacity"
          >
            <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center">
              <Instagram className="text-white" size={28} />
            </div>
            <span className="text-sm">Instagram</span>
          </a>

          <a
            href="https://www.linkedin.com/company/lumnus/posts/?feedView=all"
            target="_blank"
            className="flex flex-col items-center gap-3 hover:opacity-70 transition-opacity"
          >
            <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center">
              <Linkedin className="text-white" size={28} />
            </div>
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>

        {/* EMAIL */}
        <p className="text-blue-950 text-xl font-medium text-center">
          contact@lumnusconsulting.net
        </p>
      </div>

      {/* RIGHT: FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label className="mb-2 block text-lg font-medium">Name</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-gray-100 border border-black/10 rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label className="mb-2 block text-lg font-medium">Email</Label>
          <Input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-gray-100 border border-black/10 rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label className="mb-2 block text-lg font-medium">Subject</Label>
          <Input
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="bg-gray-100 border border-black/10 rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <Label className="mb-2 block text-lg font-medium">Message</Label>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="bg-gray-100 border border-black/10 rounded-lg"
          />
        </div>

        <button
          type="submit"
          disabled={isSending || isSuccess}
          className="w-full bg-blue-950 hover:bg-blue-900 text-white py-3 rounded-full transition-colors"
        >
          {isSending
            ? "Sending..."
            : isSuccess
            ? "Email Sent Successfully!"
            : "Send Message"}
        </button>
      </form>
    </div>
  </section>
</FadeInOnScroll>
               
    </>
  );
}