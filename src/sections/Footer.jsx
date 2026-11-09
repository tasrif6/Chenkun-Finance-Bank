import { useState } from "react";
import { brand } from "../constants/content";

export default function Footer() {
  const [status, setStatus] = useState("idle"); // idle | error | sent
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const ok = form.name.trim() && /^\S+@\S+\.\S+$/.test(form.email) && form.message.trim();
    if (!ok) return setStatus("error");
    // TODO: POST `form` to your backend / form service here.
    setStatus("sent");
  };

  return (
    <section id="contact" className="footer">
      <h1 className="t-xl">Contact Us</h1>
      <form className="contact" onSubmit={submit} noValidate>
        <input placeholder="Your name" value={form.name} onChange={set("name")} />
        <input type="email" placeholder="Email" value={form.email} onChange={set("email")} />
        <textarea rows="3" placeholder="How can we help?" value={form.message} onChange={set("message")} />
        <button className="btn" type="submit" disabled={status === "sent"}>
          {status === "sent" ? "Thank you — we’ll be in touch" : "Send message"}
        </button>
        {status === "error" && <em role="alert">Please complete all fields with a valid email.</em>}
      </form>
      <div className="copyright">
        <p>© {new Date().getFullYear()} {brand.full}. All rights reserved.</p>
        <p>Privacy Policy · Terms of Service</p>
      </div>
    </section>
  );
}
