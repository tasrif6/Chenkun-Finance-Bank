import { banks } from "../constants/content";

const initials = (n) => n.split(" ").filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

// Auto-sliding rows (pure CSS). Each row renders its list twice for a seamless loop.
export default function Banks() {
  return (
    <section id="banks" className="banks">
      <div className="banks-head">
        <span className="eyebrow">{banks.eyebrow}</span>
        <h2>{banks.title}</h2>
        {/* <p className="banks-note">Placeholder names. Confirm real partners before publishing.</p> */}
      </div>
      {banks.rows.map((row, r) => (
        <div key={r} className={`marquee ${r % 2 ? "rev" : ""}`}>
          {[0, 1].map((k) => (
            <ul key={k} className="marquee-track" aria-hidden={k === 1}>
              {row.map((bank, i) => (
                <li key={bank.name} className="bank">
                  {bank.logo ? (
                    <img src={bank.logo} alt={bank.name} loading="lazy" />
                  ) : (
                    <b style={{ "--c": banks.colors[(i + r * 3) % banks.colors.length] }}>{initials(bank.name)}</b>
                  )}
                  {bank.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      ))}
    </section>
  );
}
