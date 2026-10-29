import type { Metadata } from "next";
import { PageHead } from "../components/PageHead";
import { SignInForm } from "../components/SignInForm";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Light sign in for saved artisans and your listing status. No dashboard and no public profile.",
  alternates: { canonical: "/sign-in" },
  robots: { index: false, follow: true },
};

export default function SignInPage() {
  return (
    <>
      <PageHead
        title="Light"
        highlight="sign in"
        intro="Saved artisans and your listing status only. No dashboard, no charts, no data selling. Your shortlist stays on this device."
        image="/images/workshop-05.jpg"
        crumb="Sign in"
      />
      <section className="hf-section">
        <div className="container">
          <div className="hf-signin">
            <SignInForm />
          </div>
        </div>
      </section>
    </>
  );
}
