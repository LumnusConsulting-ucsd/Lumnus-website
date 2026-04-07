"use client";

import { useState } from "react";
import {
  Users,
  TrendingUp,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { FadeInOnScroll } from "../components/fade-scroll";

export default function SponsorPage() {
  const [isOngoing, setIsOngoing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const [orgName, setOrgName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const suggestedAmounts = [25, 50, 100];

  const scrollToForm = () => {
    const el = document.getElementById("sponsor-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactName || !email) {
      alert("Please complete required fields.");
      return;
    }

    const amount =
      customAmount !== ""
        ? Number(customAmount)
        : selectedAmount !== null
        ? selectedAmount
        : null;

    if (!amount) {
      alert("Please select or enter an amount.");
      return;
    }

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          isOngoing,
          orgName,
          contactName,
          email,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Checkout failed.");
      }

      window.location.href = data.url;
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/IMG_2356.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl tracking-wider mb-6">
            SUPPORT LUMNUS
          </h1>
          <button
            onClick={scrollToForm}
            className="bg-blue-950 hover:bg-blue-900 text-white text-sm md:text-base px-6 py-3 rounded-full font-medium transition-colors inline-flex items-center gap-2"
          >
            Become a Sponsor
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Sponsor Impact */}
      <FadeInOnScroll>
        <section className="py-16 md:py-24 px-6 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto text-center mb-10 md:mb-16">
            <h2 className="text-black text-3xl md:text-5xl mb-4 md:mb-6">Your Impact</h2>
            <p className="text-black text-lg md:text-xl max-w-3xl mx-auto">
              Your contribution helps shape the future generations of Lumnus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 max-w-7xl mx-auto">
            <ImpactCard
              icon={<Users className="text-white" size={32} />}
              title="Associate Development"
              text="Fund comprehensive workshops, specialized training programs, and professional development opportunities that equip our members with real-world consulting skills."
            />
            <ImpactCard
              icon={<TrendingUp className="text-white" size={32} />}
              title="Client Projects"
              text="Support pro-bono consulting projects that help businesses achieve sustainable, long-term growth through thoughtful strategic guidance and data-informed decision-making."
            />
            <ImpactCard
              icon={<Briefcase className="text-white" size={32} />}
              title="Club Operations"
              text="Support club operations, Project management, organizational resources, and outreach initiatives that help us continue developing future business leaders."
            />
          </div>
        </section>
      </FadeInOnScroll>

      {/* Sponsor Form */}
      <section id="sponsor-form" className="py-12 md:py-24 px-4 md:px-8 bg-gray-50">
        <form onSubmit={handleSubmit}>
          <div className="max-w-4xl mx-auto bg-white border-t-4 border-blue-950 p-6 md:p-12 rounded-lg shadow-sm">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-black text-2xl md:text-4xl mb-3 md:mb-4">Become a Sponsor</h2>
              <p className="text-black text-sm md:text-lg">
                Choose an amount below or enter a custom amount to support Lumnus Consulting.
              </p>
            </div>

            <div className="mb-8 flex justify-center">
              <div className="inline-flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsOngoing(false)}
                  className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 rounded-lg transition text-sm sm:text-base ${
                    !isOngoing
                      ? "bg-blue-950 text-white shadow-md"
                      : "text-black"
                  }`}
                >
                  One-Time
                </button>
                <button
                  type="button"
                  onClick={() => setIsOngoing(true)}
                  className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 rounded-lg transition text-sm sm:text-base ${
                    isOngoing
                      ? "bg-blue-950 text-white shadow-md"
                      : "text-black"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
              {suggestedAmounts.map((amount) => (
                <button
                  type="button"
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                  className={`py-3 md:py-4 px-3 md:px-6 border-2 rounded-lg transition ${
                    selectedAmount === amount && !customAmount
                      ? "border-blue-950 bg-blue-950 text-white"
                      : "border-gray-300 bg-white text-black hover:border-blue-950"
                  }`}
                >
                  <div className="font-medium text-sm md:text-base text-black">
                    ${amount}
                    {isOngoing ? "/mo" : ""}
                  </div>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block mb-1.5 text-black text-sm md:text-base">Or Enter Custom Amount</label>
              <input
                placeholder="$"
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="w-full px-4 py-3 border rounded-lg text-black placeholder-gray-500 text-sm md:text-base"
              />
            </div>

            <div className="w-full h-[1px] bg-gray-600 mb-6" />

            <div className="space-y-4 mb-8">
              <div>
                <label className="block mb-1.5 text-black text-sm md:text-base">Organization</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg text-black placeholder-gray-500 text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-black text-sm md:text-base">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg text-black placeholder-gray-500 text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-black text-sm md:text-base">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg text-black placeholder-gray-500 text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block mb-1.5 text-black text-sm md:text-base">Message (Optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border rounded-lg resize-none text-sm md:text-base"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-950 hover:bg-blue-900 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2"
            >
              Continue to Payment
            </button>

            <p className="text-center text-xs md:text-sm text-black mt-5">
              Your donation will be processed securely. Tax receipt will be sent to your email.
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

function ImpactCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="border-t-4 border-blue-950 p-6 md:p-8 bg-gray-50">
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-blue-950 p-3 md:p-4 shrink-0">{icon}</div>
        <div>
          <h3 className="text-black text-xl md:text-2xl mb-2 md:mb-3">{title}</h3>
          <p className="text-black text-sm md:text-base">{text}</p>
        </div>
      </div>
    </div>
  );
}