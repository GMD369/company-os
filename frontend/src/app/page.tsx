"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  FileSearch,
  Mail,
  Calendar,
  CheckSquare,
  Workflow,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { MarketingHeader } from "@/components/marketing/Header";
import { MarketingFooter } from "@/components/marketing/Footer";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

const features = [
  {
    icon: FileSearch,
    title: "Document knowledge base",
    description:
      "Upload contracts, invoices, and reports. Ask questions in plain English and get answers grounded in your own files.",
  },
  {
    icon: MessageSquare,
    title: "One AI assistant",
    description:
      "A single chat that understands your business — no more switching between five different tabs to find an answer.",
  },
  {
    icon: Mail,
    title: "Gmail integration",
    description:
      "Search, summarize, and draft replies to email without leaving your workspace.",
  },
  {
    icon: Calendar,
    title: "Calendar & scheduling",
    description:
      "See what's next and let the assistant handle the busywork of scheduling.",
  },
  {
    icon: CheckSquare,
    title: "Task management",
    description:
      "Turn conversations and documents into tracked tasks automatically.",
  },
  {
    icon: Workflow,
    title: "Workflow automation",
    description:
      "Automate the repetitive parts of running a small business, end to end.",
  },
];

const steps = [
  {
    step: "01",
    title: "Connect your business",
    description: "Sign up and create your company workspace in under a minute.",
  },
  {
    step: "02",
    title: "Upload your documents",
    description:
      "Drop in PDFs, spreadsheets, and docs — they're indexed automatically.",
  },
  {
    step: "03",
    title: "Ask anything",
    description:
      "Chat with your business data and get instant, accurate answers.",
  },
];

const container = "mx-auto w-full max-w-7xl px-6";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
          <div
            aria-hidden
            className="animate-blob pointer-events-none absolute -top-40 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-[70%] rounded-full bg-gradient-to-br from-indigo-300/40 to-purple-300/30 blur-3xl"
          />
          <div
            aria-hidden
            className="animate-blob-delayed pointer-events-none absolute -top-32 left-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-[10%] rounded-full bg-gradient-to-br from-sky-200/40 to-indigo-200/30 blur-3xl"
          />

          <div className={`${container} pt-28 pb-24 text-center`}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 text-sm text-slate-600 shadow-sm backdrop-blur"
            >
              <Sparkles className="h-4 w-4 text-brand" />
              The AI operating system for small business
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl"
            >
              One assistant for
              <br />
              <span className="text-gradient">everything your business runs on</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-600"
            >
              Stop switching between Gmail, Drive, spreadsheets, and calendars.
              Nexus is a single AI assistant that searches, summarizes, and
              automates work across your entire business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <LinkButton href="/signup" size="lg">
                Get started for free
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/login" variant="secondary" size="lg">
                Log in
              </LinkButton>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-5 text-sm text-slate-500"
            >
              No credit card required &middot; Free to start
            </motion.p>
          </div>
        </section>

        {/* Features */}
        <section id="features" className={`${container} py-28`}>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything scattered. Now in one place.
            </h2>
            <p className="mt-4 text-slate-600">
              Nexus brings your documents, communication, and workflows into a
              single intelligent layer.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <Card className="group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-16px_rgba(79,70,229,0.25)]">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-200 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-y border-slate-200/70 bg-slate-50/60 py-28">
          <div className={container}>
            <Reveal className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Up and running in minutes
              </h2>
              <p className="mt-4 text-slate-600">
                No IT team required. No complicated setup.
              </p>
            </Reveal>
            <div className="relative mt-16 grid gap-10 sm:grid-cols-3">
              <div
                aria-hidden
                className="absolute top-6 left-0 right-0 hidden h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent sm:block"
              />
              {steps.map(({ step, title, description }, i) => (
                <Reveal key={step} delay={i * 0.1} className="relative text-center sm:text-left">
                  <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-bold text-brand shadow-md ring-1 ring-slate-200 sm:mx-0">
                    {step}
                  </div>
                  <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="pricing" className={`${container} py-28`}>
          <Reveal>
            <Card className="relative flex flex-col items-center gap-6 overflow-hidden bg-slate-900 p-14 text-center text-white">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(129,140,248,0.35),transparent_60%)]"
              />
              <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to bring your business into one place?
              </h2>
              <p className="relative max-w-xl text-slate-300">
                Start free. Upgrade only when you need more — no long-term
                contracts, no surprises.
              </p>
              <div className="relative">
                <LinkButton href="/signup" size="lg">
                  Create your workspace
                  <ArrowRight className="h-4 w-4" />
                </LinkButton>
              </div>
            </Card>
          </Reveal>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
