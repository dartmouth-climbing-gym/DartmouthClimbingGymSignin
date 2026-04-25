/**
 * src/pages/WaiverPage.tsx
 * 
 * Page for signing the climbing gym waivers.
 */

import { useState } from "react";
import { signWaiver, validateInput } from "../services/waivers";

type Category = "netID" | "email";
type Status = "idle" | "submitting" | "success" | "error";

const CATEGORY_LABELS: Record<Category, { label: string; placeholder: string; hint: string }> = {
  netID: {
    label: "Dartmouth NetID",
    placeholder: "f001abc",
    hint: "Starts with f or d, followed by 6 characters",
  },
  email: {
    label: "Dartmouth .edu Email Address",
    placeholder: "jane@dartmouth.edu",
    hint: "Any Dartmouth email address (must end with @dartmouth.edu)",
  },
};

const WAIVER_CLAUSES = [
  `I acknowledge that I am using the Dartmouth Climbing Gym voluntarily and of my own free will with the full realization that doing so may involve significant risk of bodily injury, including death, or damage to property of myself and others. Risk of harm may arise from my own actions, inactions or negligence; the actions, inactions and negligence of others, including but not limited to representatives of Dartmouth College as defined in Paragraph 2 below; environmental or weather conditions; equipment conditions; or any other cause not specifically set forth in this provision. I realize that it is not possible to list specifically each and every individual injury risk. However, knowing the material risks and appreciating, knowing, and reasonably anticipating that injuries and even death are a possibility, I hereby expressly assume all risks of injury or death which could occur by reason of my participation.`,
  `I agree that in exchange for and in consideration of the College's permitting me to use this facility, I hereby assume all the risks associated with the activity and agree to release, hold harmless, waive, discharge and covenant not to sue the Trustees of Dartmouth College, its trustees, officers, servants, agents, employees, and volunteers (hereinafter collectively referred to as "Releasees") from any and all liability, actions, causes of action, negligence, debts, claims, or demands of any kind and nature whatsoever which may arise by or in connection with my participation in any activities related to the facility.`,
  `In exchange for and in consideration of Dartmouth permitting me to use this facility, I agree further to hold harmless and indemnify the Trustees of Dartmouth College, its trustees, officers, servants, agents, employees, and volunteers from any and all liability, actions, causes of action, negligence, debts, claims or demands of any kind and nature whatsoever (including attorneys' fees and costs) by any person or the college which may arise by or in connection with my participation in this facility.`,
  `It is my express intent that this agreement shall bind the members of my family and spouse, if I am alive, and my heirs, assigns and personal representatives, if I am deceased, and shall be deemed as a Release, Waiver, Discharge and Covenant Not to Sue the above named releasees.`,
];

const WAIVER_CLOSING = `In signing this acknowledgment & assumption of risk, hold harmless agreement, release, waiver of liability and covenant not to sue, I acknowledge and represent that I have read the foregoing document, fully understand it, and sign it voluntarily as my own free act and deed; that no oral representation, statements or inducements, apart from the provisions of the foregoing written document have been made; that I am at least eighteen (18) years of age and fully competent; and that I execute this document for full, adequate and complete consideration fully intending to be bound by same.`;

export default function WaiverPage() {
  const [category, setCategory] = useState<Category>("netID");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [idError, setIdError] = useState("");

  const { label, placeholder, hint } = CATEGORY_LABELS[category];

  function handleCategoryChange(next: Category) {
    setCategory(next);
    setId("");
    setIdError("");
  }

  function handleIdChange(val: string) {
    setId(val);
    if (idError) setIdError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateInput(category, id.trim())) {
      setIdError(`Invalid ${label.toLowerCase()}. ${hint}.`);
      return;
    }

    setStatus("submitting");
    setMessage("");

    const result = await signWaiver(category, id.trim(), name.trim());

    if (result.success) {
      setStatus("success");
      setMessage(result.message);
      setId("");
      setName("");
    } else {
      setStatus("error");
      setMessage(result.message);
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <main className="flex flex-1 flex-col bg-background">
      {/* Header band */}
      <div className="bg-forest-green px-6 py-14 sm:px-16">
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 font-jost text-xs font-semibold uppercase tracking-widest text-spring-green">
            Dartmouth Climbing Gym
          </p>

          <h1 className="font-anton text-5xl uppercase text-white sm:text-6xl">Sign Waiver</h1>

          <div className="mt-4 h-0.5 w-12 bg-spring-green" />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-6 py-12 sm:px-16 mx-auto w-full max-w-5xl">
          {/* Waiver text */}
          <div className="mb-10 flex flex-col items-center gap-5 rounded-2xl border-2 border-surface bg-white p-8">
            <p className="text-center font-jost font-bold text-xl text-forest-green">
              For and in consideration of Dartmouth permitting me to use the Dartmouth Climbing Gym,
              I acknowledge and willingly agree to the following statements and conditions:
            </p>

            <div className="h-0.5 w-16 bg-dartmouth-green" />

            <ol className="flex list-none flex-col gap-4">
              {WAIVER_CLAUSES.map((clause, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 shrink-0 font-jost text-xl font-semibold text-dartmouth-green">
                    {i + 1}.
                  </span>

                  <p className="font-jost text-base leading-relaxed text-forest-green">{clause}</p>
                </li>
              ))}
            </ol>

            <div className="h-0.5 w-16 bg-dartmouth-green" />

            <p className="font-jost text-sm leading-relaxed text-forest-green/80">{WAIVER_CLOSING}</p>
          </div>

          {/* Form */}
          {status === "success" ? (
            <div className="flex flex-col items-start gap-6 rounded-2xl border-2 border-dartmouth-green bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-spring-green">
                <svg
                  className="h-6 w-6 text-forest-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <p className="font-anton text-2xl uppercase text-forest-green">Waiver Signed</p>
                <p className="mt-1 font-jost text-base text-forest-green/60">{message}</p>
              </div>

              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="rounded border-2 border-dartmouth-green px-6 py-2.5 font-jost font-semibold text-dartmouth-green transition-all duration-150 hover:bg-dartmouth-green hover:text-white"
              >
                Sign Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
              {/* Category toggle */}
              <fieldset>
                <legend className="mb-3 font-jost text-xs font-semibold uppercase tracking-widest text-forest-green/50">
                  Sign with a Dartmouth NetID or an email address?
                </legend>

                <div className="flex gap-3">
                  {(["netID", "email"] as Category[]).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryChange(cat)}
                      className={`rounded-full border-2 px-5 py-2 font-jost text-sm font-semibold transition-all duration-150 ${
                        category === cat
                          ? "border-dartmouth-green bg-dartmouth-green text-white"
                          : "border-surface text-forest-green/60 hover:border-dartmouth-green hover:text-dartmouth-green"
                      }`}
                    >
                      {cat === "netID" ? "Dartmouth NetID" : "Dartmouth .edu Email"}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-jost text-sm font-semibold uppercase tracking-wider text-forest-green"
                >
                  Name / Signature
                </label>

                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  disabled={isSubmitting}
                  className="rounded-xl border-2 border-surface bg-white px-4 py-3.5 font-jost text-base text-forest-green placeholder-surface-secondary transition-colors focus:border-dartmouth-green focus:outline-none disabled:opacity-50"
                />
              </div>

              {/* ID / Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="id"
                  className="font-jost text-sm font-semibold uppercase tracking-wider text-forest-green"
                >
                  {label}
                </label>

                <input
                  id="id"
                  type={category === "email" ? "email" : "text"}
                  required
                  value={id}
                  onChange={(e) => handleIdChange(e.target.value)}
                  placeholder={placeholder}
                  disabled={isSubmitting}
                  className={`rounded-xl border-2 bg-white px-4 py-3.5 font-jost text-base text-forest-green placeholder-surface-secondary transition-colors focus:outline-none disabled:opacity-50 ${
                    idError
                      ? "border-red-400 focus:border-red-500"
                      : "border-surface focus:border-dartmouth-green"
                  }`}
                />
                {idError ? (
                  <p className="font-jost text-sm text-red-500">{idError}</p>
                ) : (
                  <p className="font-jost text-xs text-forest-green/40">{hint}</p>
                )}
              </div>

              {/* Error banner */}
              {status === "error" && (
                <div className="rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3">
                  <p className="font-jost text-sm text-red-600">{message}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !id.trim()}
                className="self-start rounded border-2 border-spring-green bg-spring-green px-8 py-3 font-jost text-lg font-semibold text-forest-green transition-all duration-150 hover:bg-transparent hover:text-spring-green disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting ? "Signing…" : "Sign Waiver"}
              </button>
            </form>
          )}
        </div>
    </main>
  );
}
