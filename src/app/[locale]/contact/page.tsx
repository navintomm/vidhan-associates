"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, ArrowRight, CheckCircle } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918606723820";
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactPage() {

 const t = useTranslations("contactPage");
 const locale = useLocale();

 const [form, setForm] = useState({
 name: "",
 phone: "",
 email: "",
 matter: t.raw("matters")[0], // Initialize with the first translated matter
 preferredDate: "",
 preferredTime: "",
 message: "",
 });
 const [state, setState] = useState<FormState>("idle");

 const matters = t.raw("matters") as Array<string>;

 const handleChange = (
 e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
 ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

 // ── WhatsApp deep-link submit ────────────────────────────────────────
 const handleWhatsApp = () => {
 const text = encodeURIComponent(
 `Hello Vidhan Law Chambers,\n\nName: ${form.name}\nPhone: ${form.phone}\nMatter: ${form.matter}\nPreferred Date: ${form.preferredDate || 'Any'}\nPreferred Time: ${form.preferredTime || 'Any'}\n\n${form.message}`
 );
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
 };

 // ── Web3Forms email submit ───────────────────────────────────────────
 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setState("sending");
 try {
 const res = await fetch("https://api.web3forms.com/submit", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 access_key: WEB3FORMS_KEY,
 subject: `New enquiry from ${form.name} — ${form.matter}`,
 ...form,
 }),
 });
 const data = await res.json();
 setState(data.success ? "success" : "error");
 } catch {
 setState("error");
 }
 };

 return (
 <div className="bg-parchment min-h-screen">

 {/* ── Hero ─────────────────────────────────────────────────────── */}
 <section className="relative pt-40 pb-20 px-6 lg:px-12 border-b border-gold/10">
 <div className="container mx-auto max-w-5xl">
 <motion.p
 initial={{ opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.6 }}
 className="text-xs md:text-sm tracking-wide-2xl uppercase text-gold/50 mb-6 break-words"
 >
 {t("hero.subtitle")}
 </motion.p>
 <motion.h1
 initial={{ opacity: 0, y: 24 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.8, delay: 0.1 }}
 className={`${locale === "ml" ? "text-3xl md:text-5xl lg:text-6xl break-words" : "text-5xl md:text-7xl"} font-serif text-ink leading-tight mb-6 max-w-2xl`}
 >
 {t("hero.title")}
 </motion.h1>
 <motion.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: 0.8, delay: 0.2 }}
 className="text-ink/40 font-sans text-lg md:text-xl max-w-xl leading-relaxed"
 >
 {t("hero.description")}
 </motion.p>
 </div>
 </section>

 {/* ── Main Content ─────────────────────────────────────────────── */}
 <section className="py-20 px-6 lg:px-12">
 <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-16">

 {/* ── Left: Form (3 cols) ───────────────────────────────────── */}
 <div className="lg:col-span-3">
 {state === "success" ? (
 <motion.div
 initial={{ opacity: 0, scale: 0.97 }}
 animate={{ opacity: 1, scale: 1 }}
 className="flex flex-col items-start gap-6 py-16"
 >
 <CheckCircle size={40} className="text-gold" />
 <h2 className={`${locale === "ml" ? "text-xl md:text-2xl break-words whitespace-normal" : "text-2xl"} font-serif text-ink`}>
 {t("form.successTitle")}
 </h2>
 <p className="text-ink/50 font-sans text-sm leading-relaxed">
 {t("form.successDesc")}
 </p>
 <button
 onClick={() => { setState("idle"); setForm({ name: "", phone: "", email: "", matter: matters[0], preferredDate: "", preferredTime: "", message: "" }); }}
 className="text-xs tracking-wide-xl uppercase text-gold/60 hover:text-gold transition-colors break-words"
 >
 {t("form.submitAnother")}
 </button>
 </motion.div>
 ) : (
 <form onSubmit={handleSubmit} className="space-y-8">
 {/* Name */}
 <div>
 <label className="block text-sm tracking-wide-xl uppercase text-ink/50 mb-3 break-words">
 {t("form.fields.fullName")}
 </label>
 <input
 required
 name="name"
 value={form.name}
 onChange={handleChange}
 placeholder={t("form.placeholders.fullName")}
 className="w-full bg-transparent border border-gold/15 hover:border-gold/30 focus:border-gold/50 outline-none px-5 py-4 text-ink placeholder-parchment/20 font-sans text-lg transition-colors"
 />
 </div>

 {/* Phone + Email */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
 <div>
 <label className="block text-sm tracking-wide-xl uppercase text-ink/50 mb-3 break-words">
 {t("form.fields.phone")}
 </label>
 <input
 required
 name="phone"
 value={form.phone}
 onChange={handleChange}
 placeholder={t("form.placeholders.phone")}
 className="w-full bg-transparent border border-gold/15 hover:border-gold/30 focus:border-gold/50 outline-none px-5 py-4 text-ink placeholder-parchment/20 font-sans text-lg transition-colors"
 />
 </div>
 <div>
 <label className="block text-sm tracking-wide-xl uppercase text-ink/50 mb-3 break-words">
 {t("form.fields.email")}
 </label>
 <input
 name="email"
 type="email"
 value={form.email}
 onChange={handleChange}
 placeholder={t("form.placeholders.email")}
 className="w-full bg-transparent border border-gold/15 hover:border-gold/30 focus:border-gold/50 outline-none px-5 py-4 text-ink placeholder-parchment/20 font-sans text-lg transition-colors"
 />
 </div>
 </div>

 {/* Matter type */}
 <div>
 <label className="block text-sm tracking-wide-xl uppercase text-ink/50 mb-3 break-words">
 {t("form.fields.matter")}
 </label>
 <select
 required
 name="matter"
 value={form.matter}
 onChange={handleChange}
 className="w-full bg-parchment border border-gold/15 hover:border-gold/30 focus:border-gold/50 outline-none px-5 py-4 text-ink font-sans text-lg transition-colors appearance-none cursor-pointer"
 >
 {matters.map((m) => (
 <option key={m} value={m} className="bg-parchment text-ink">
 {m}
 </option>
 ))}
 </select>
 </div>

 {/* Date + Time */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
 <div>
 <label className="block text-sm tracking-wide-xl uppercase text-ink/50 mb-3 break-words">
 {t("form.fields.date")}
 </label>
 <input
 type="date"
 name="preferredDate"
 value={form.preferredDate}
 onChange={handleChange}
 style={{ colorScheme: "dark" }}
 className="w-full bg-transparent border border-gold/15 hover:border-gold/30 focus:border-gold/50 outline-none px-5 py-4 text-ink placeholder-parchment/20 font-sans text-lg transition-colors cursor-text"
 />
 </div>
 <div>
 <label className="block text-sm tracking-wide-xl uppercase text-ink/50 mb-3 break-words">
 {t("form.fields.time")}
 </label>
 <input
 type="time"
 name="preferredTime"
 value={form.preferredTime}
 onChange={handleChange}
 style={{ colorScheme: "dark" }}
 className="w-full bg-transparent border border-gold/15 hover:border-gold/30 focus:border-gold/50 outline-none px-5 py-4 text-ink placeholder-parchment/20 font-sans text-lg transition-colors cursor-text"
 />
 </div>
 </div>

 {/* Message */}
 <div>
 <label className="block text-sm tracking-wide-xl uppercase text-ink/50 mb-3 break-words">
 {t("form.fields.message")}
 </label>
 <textarea
 required
 name="message"
 value={form.message}
 onChange={handleChange}
 rows={8}
 placeholder={t("form.placeholders.message")}
 className="w-full bg-transparent border border-gold/15 hover:border-gold/30 focus:border-gold/50 outline-none px-5 py-4 text-ink placeholder-parchment/20 font-sans text-lg transition-colors resize-none"
 />
 </div>

 {/* Action buttons */}
 <div className="flex flex-col sm:flex-row gap-4 pt-4">
 {/* Primary — WhatsApp */}
 <button
 type="button"
 onClick={handleWhatsApp}
 className="group flex-1 flex items-center justify-center gap-3 border border-gold/40 hover:border-gold px-6 py-5 text-sm tracking-wide-xl uppercase text-gold transition-all hover:bg-gold/5 break-words"
 >
 <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
 </svg>
 {t("form.buttons.whatsapp")}
 </button>

 {/* Secondary — Email form */}
 <button
 type="submit"
 disabled={state === "sending"}
 className="group flex-1 flex items-center justify-center gap-3 bg-gold/10 hover:bg-gold/20 border border-gold/20 hover:border-gold/40 px-6 py-5 text-sm tracking-wide-xl uppercase text-ink/80 hover:text-ink transition-all disabled:opacity-50 break-words"
 >
 {state === "sending" ? (
 t("form.buttons.sending")
 ) : (
 <>
 {t("form.buttons.email")}
 <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
 </>
 )}
 </button>
 </div>

 {state === "error" && (
 <p className="text-seal text-base mt-2">
 {t("form.errorMsg")}
 </p>
 )}
 </form>
 )}
 </div>

 {/* ── Right: Contact info (2 cols) ──────────────────────────── */}
 <aside className="lg:col-span-2 space-y-12 pt-2">
 
 {/* ERNAKULAM OFFICE SECTION */}
 <div className="space-y-6">
 <div className="flex items-center gap-3 border-b border-gold/15 pb-4">
 <MapPin size={22} className="text-gold" />
 <h3 className="text-base tracking-wide-2xl uppercase text-gold/80 font-medium break-words">{t("info.ernakulamTitle")}</h3>
 </div>
 
 <div className="text-ink/70 font-sans text-base leading-relaxed pl-2 break-words" dangerouslySetInnerHTML={{ __html: `<strong class="text-ink font-serif font-medium text-lg">Vidhan Law Chambers</strong><br />${t("info.ernakulamAddress")}` }} />

 <div className="w-full h-56 bg-parchment/50 border border-gold/15 overflow-hidden rounded-sm">
 <iframe
 width="100%"
 height="100%"
 style={{ border: 0 }}
 loading="lazy"
 allowFullScreen
 className="transition-all duration-700 ease-in-out"
 src="https://maps.google.com/maps?q=High%20Court%20of%20Kerala,%20Kochi&t=&z=15&ie=UTF8&iwloc=&output=embed"
 ></iframe>
 </div>
 <a
 href="https://maps.google.com/?q=New+Emerald+Building,+Power+House+Road,+High+Court+of+Kerala,+Kochi"
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center justify-center w-full py-4 bg-gold hover:bg-gold/90 text-ink font-serif text-base transition-colors rounded-sm break-words"
 >
 {t("info.ernakulamBtn")}
 </a>
 </div>

 {/* THRISSUR OFFICE SECTION */}
 <div className="space-y-6">
 <div className="flex items-center gap-3 border-b border-gold/15 pb-4">
 <MapPin size={22} className="text-gold" />
 <h3 className="text-base tracking-wide-2xl uppercase text-gold/80 font-medium break-words">{t("info.thrissurTitle")}</h3>
 </div>
 
 <div className="text-ink/70 font-sans text-base leading-relaxed pl-2 break-words" dangerouslySetInnerHTML={{ __html: `<strong class="text-ink font-serif font-medium text-lg">Vidhan Law Chambers</strong><br />${t("info.thrissurAddress")}` }} />

 <div className="w-full h-56 bg-parchment/50 border border-gold/15 overflow-hidden rounded-sm">
 <iframe
 width="100%"
 height="100%"
 style={{ border: 0 }}
 loading="lazy"
 allowFullScreen
 className="transition-all duration-700 ease-in-out"
 src="https://maps.google.com/maps?q=Alukkas%20Castle,%20Ayyanthole,%20Thrissur&t=&z=15&ie=UTF8&iwloc=&output=embed"
 ></iframe>
 </div>
 <a
 href="https://maps.google.com/?q=Alukkas+Castle,+Civil+Lines+Road,+Ayyanthole,+Thrissur"
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center justify-center w-full py-4 bg-gold hover:bg-gold/90 text-ink font-serif text-base transition-colors rounded-sm break-words"
 >
 {t("info.thrissurBtn")}
 </a>
 </div>

 {/* DIRECT CONTACT SECTION */}
 <div className="space-y-6 pt-4">
 <div className="flex items-center gap-3 border-b border-gold/15 pb-4">
 <Phone size={22} className="text-gold" />
 <h3 className="text-base tracking-wide-2xl uppercase text-gold/80 font-medium break-words">{t("info.directTitle")}</h3>
 </div>
 
 <div className="grid grid-cols-2 gap-6 pl-2">
 <div className="space-y-2">
 <p className="text-xs tracking-wide-2xl uppercase text-gold/40 break-words">{t("info.phonesLabel")}</p>
 <p className="text-ink/80 font-sans text-base">+91 79071 39328</p>
 <p className="text-ink/80 font-sans text-base">+91 96337 49958</p>
 <p className="text-ink/80 font-sans text-base">+91 86067 23820</p>
 <p className="text-ink/80 font-sans text-base">+91 78926 14468</p>
 </div>
 
 <div className="space-y-2">
 <p className="text-xs tracking-wide-2xl uppercase text-gold/40 break-words">{t("info.emailLabel")}</p>
 <p className="text-ink/80 font-sans text-base">consult@vidhan.test</p>
 </div>
 </div>
 </div>

 <p className="text-xs tracking-wide text-ink/40 leading-relaxed pt-4 break-words">
 {t("info.confidentiality")}
 </p>
 </aside>
 </div>
 </section>

 <div className="pb-20" />
 </div>
 );
}
