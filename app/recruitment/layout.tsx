import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruitment | Lumnus Consulting",
  description:
    "Apply to join Lumnus Consulting, a student-run consulting organization at UC San Diego. Spring 2027 recruitment is open.",
};

export default function RecruitmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
