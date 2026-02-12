import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Valentine.jsx
 * Drop this into a Vite + React project.
 * Usage:
 *   import Valentine from "./Valentine";
 *   export default function App(){ return <Valentine /> }
 */

export default function Valentine() {
  const prefersReducedMotion = useReducedMotion();

  // --- Customize these ---
  const data = useMemo(
    () => ({
      herName: "Stella", // change
      yourName: "Marc", // change
      title: "Terminal: Us ✈️",
      subtitle: "A little letter, a little game, a lot of us.",
      letter: [
        `Hi ${"Stella"}…`,
        "I’ve been thinking about how our story started — like a movie scene that somehow became real.",
        "Out of all the timelines, I’m grateful we found the one where we chose each other.",
        "",
        "Some of my favorite little moments:",
        "• Our first meet at the airport (I still feel that rush).",
        "• Exploring a whole city like it was ours for a week.",
        "• Watching you become brave enough to travel on your own.",
        "• “100 Songs for Stella” finally happening (iconic).",
        "• Meeting each other’s parents — the serious level-up.",
        "",
        "I love how you make life feel brighter and softer at the same time.",
        "If love had a soundtrack, ours would be the kind you replay on purpose.",
        "",
        "So… I made you a tiny place to land.",
        "",
        `Will you be my Valentine?`,
        "",
        `— ${"Marc"}`,
      ],
      songs: [
        "Ikaw at Ako — Johnoy Danao",
        "Lalim — MATEO",
        "Soft Spot — Keshi",
        "Lover — Taylor Swift",
        "Youth — Troye Sivan",
        "I Like Me Better — Lauv",
        "Afterglow — Taylor Swift",
        "Iris — The Goo Goo Dolls",
      ],
      insideJoke: "“Tung Tung Tung Sahur and Ballerina Cappucina” 🥴💘",
      yesMessageTitle: "Boarding Pass: ACCEPTED ✅",
      yesMessageBody:
        "Okay wow. I’m smiling like an idiot.\n\nYour seat is permanently next to mine.\nHappy Valentine’s, my love. 💌",
    }),
    [],
  );

  const [stage, setStage] = useState("intro"); // intro -> envelope -> letter -> question -> yes
  const [lineIndex, setLineIndex] = useState(0);

  const letterLines = data.letter;

  const canAdvanceLetter = stage === "letter" && lineIndex < letterLines.length;
  const revealedLines = useMemo(
    () => (stage === "letter" ? letterLines.slice(0, lineIndex) : []),
    [stage, lineIndex, letterLines],
  );

  // playful "No" button dodge
  const [noJuke, setNoJuke] = useState({ x: 0, y: 0, r: 0 });

  const next = () => {
    if (stage === "intro") return setStage("envelope");
    if (stage === "envelope") return setStage("letter");
    if (stage === "letter") {
      if (lineIndex < letterLines.length) return setLineIndex((v) => v + 1);
      return setStage("question");
    }
    if (stage === "question") return; // wait for answer
    if (stage === "yes") return;
  };

  const startAutoReveal = () => {
    // optional: reveal the whole letter quickly
    setStage("letter");
    setLineIndex(letterLines.length);
    setStage("question");
  };

  const onEnvelopeOpen = () => {
    setStage("letter");
    // start with a small “type in” feel
    if (lineIndex === 0) setLineIndex(1);
  };

  const onYes = () => setStage("yes");

  const onNoHover = () => {
    // keep it cute, not obnoxious
    const rand = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;
    setNoJuke({
      x: rand(-90, 90),
      y: rand(-40, 40),
      r: rand(-8, 8),
    });
  };

  return (
    <div style={styles.page}>
      <BackgroundHearts disabled={prefersReducedMotion} />
      <Glow disabled={prefersReducedMotion} />

      <div style={styles.shell}>
        <Header data={data} stage={stage} />

        <div style={styles.card}>
          <AnimatePresence mode="wait">
            {stage === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                style={styles.panel}
              >
                <div style={styles.kicker}>✈️ Arrival Gate</div>
                <h2 style={styles.h2}>I made you something.</h2>
                <p style={styles.p}>
                  It’s a tiny interactive love letter — sentimental, silly, and
                  very us.
                </p>

                <div style={styles.row}>
                  <Pill>Tap to continue</Pill>
                  <Pill subtle>{data.insideJoke}</Pill>
                </div>

                <PrimaryButton onClick={next}>Enter</PrimaryButton>
              </motion.div>
            )}

            {stage === "envelope" && (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={styles.panel}
              >
                <div style={styles.kicker}>💌 Incoming Message</div>
                <h2 style={styles.h2}>You have one new letter.</h2>
                <p style={styles.p}>
                  Open it slowly. (Or dramatically. Your choice.)
                </p>

                <Envelope
                  onOpen={onEnvelopeOpen}
                  reducedMotion={prefersReducedMotion}
                />

                <div style={styles.row}>
                  <SecondaryButton onClick={() => setStage("intro")}>
                    Back
                  </SecondaryButton>
                  <PrimaryButton onClick={onEnvelopeOpen}>Open</PrimaryButton>
                </div>
              </motion.div>
            )}

            {stage === "letter" && (
              <motion.div
                key="letter"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={styles.panel}
              >
                <div style={styles.kicker}>📝 Love Letter</div>

                <div style={styles.letterPaper}>
                  <AnimatePresence>
                    {revealedLines.map((line, i) => (
                      <motion.div
                        key={`${i}-${line}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        style={{
                          ...styles.letterLine,
                          ...(line.startsWith("•") ? styles.bullet : null),
                          ...(line.trim() === "" ? styles.spacer : null),
                        }}
                      >
                        {line.trim() === "" ? "\u00A0" : line}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {lineIndex < letterLines.length && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35 }}
                      style={styles.cursorRow}
                    >
                      <motion.span
                        animate={
                          prefersReducedMotion ? {} : { opacity: [0.2, 1, 0.2] }
                        }
                        transition={{ duration: 1.2, repeat: Infinity }}
                        style={styles.cursor}
                      />
                      <span style={styles.cursorHint}>tap “Next line”</span>
                    </motion.div>
                  )}
                </div>

                <div style={styles.rowBetween}>
                  <SecondaryButton onClick={() => setStage("envelope")}>
                    Back
                  </SecondaryButton>

                  <div style={styles.row}>
                    <SecondaryButton onClick={startAutoReveal}>
                      Reveal all
                    </SecondaryButton>
                    <PrimaryButton
                      onClick={next}
                      disabled={
                        !canAdvanceLetter && lineIndex >= letterLines.length
                      }
                    >
                      {lineIndex < letterLines.length
                        ? "Next line"
                        : "Continue"}
                    </PrimaryButton>
                  </div>
                </div>

                <SongsTray songs={data.songs} />
              </motion.div>
            )}

            {stage === "question" && (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                style={styles.panel}
              >
                <div style={styles.kicker}>🎫 Final Check-In</div>
                <h2 style={styles.h2}>
                  {data.herName}, will you be my Valentine?
                </h2>
                <p style={styles.p}>
                  This is the part where my heart does that little *thump*
                  thing.
                </p>

                <div
                  style={{ ...styles.row, justifyContent: "center", gap: 14 }}
                >
                  <PrimaryButton onClick={onYes}>Yes 💘</PrimaryButton>

                  <motion.div
                    animate={
                      prefersReducedMotion
                        ? { x: 0, y: 0, rotate: 0 }
                        : { x: noJuke.x, y: noJuke.y, rotate: noJuke.r }
                    }
                    transition={{ type: "spring", stiffness: 520, damping: 22 }}
                    style={{ display: "inline-block" }}
                  >
                    <SecondaryButton
                      onMouseEnter={onNoHover}
                      onClick={onNoHover}
                    >
                      No 🙃
                    </SecondaryButton>
                  </motion.div>
                </div>

                <div style={{ marginTop: 14, ...styles.mini }}>
                  (It’s okay. You can still click “No.” It just… doesn’t want to
                  be clicked.)
                </div>
              </motion.div>
            )}

            {stage === "yes" && (
              <motion.div
                key="yes"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                style={styles.panel}
              >
                <div style={styles.kicker}>✅ Accepted</div>
                <h2 style={styles.h2}>{data.yesMessageTitle}</h2>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  style={styles.bigNote}
                >
                  {data.yesMessageBody.split("\n").map((t, i) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                      {t}
                    </div>
                  ))}
                </motion.div>

                <div style={styles.rowBetween}>
                  <SecondaryButton onClick={() => setStage("question")}>
                    Replay
                  </SecondaryButton>
                  <PrimaryButton onClick={() => setStage("intro")}>
                    Start over
                  </PrimaryButton>
                </div>

                <ConfettiHearts disabled={prefersReducedMotion} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={styles.footer}>
          <span style={styles.footerText}>
            Made with ♡ by {data.yourName} for {data.herName}
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Components -------------------- */

function Header({ data, stage }) {
  return (
    <div style={styles.header}>
      <div>
        <div style={styles.brandRow}>
          <span style={styles.badge}>✈️</span>
          <div>
            <div style={styles.h1}>{data.title}</div>
            <div style={styles.sub}>{data.subtitle}</div>
          </div>
        </div>
      </div>
      <div style={styles.stagePills}>
        <StagePill active={stage === "intro"}>Arrival</StagePill>
        <StagePill active={stage === "envelope"}>Letter</StagePill>
        <StagePill active={stage === "question"}>Ask</StagePill>
        <StagePill active={stage === "yes"}>Yes</StagePill>
      </div>
    </div>
  );
}

function StagePill({ active, children }) {
  return (
    <motion.div
      style={{
        ...styles.stagePill,
        ...(active ? styles.stagePillActive : styles.stagePillIdle),
      }}
      layout
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {children}
    </motion.div>
  );
}

function Pill({ children, subtle }) {
  return (
    <div
      style={{
        ...styles.pill,
        ...(subtle ? styles.pillSubtle : null),
      }}
    >
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.btn,
        ...styles.btnPrimary,
        ...(disabled ? styles.btnDisabled : null),
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, onMouseEnter }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      style={{ ...styles.btn, ...styles.btnSecondary }}
    >
      {children}
    </button>
  );
}

function Envelope({ onOpen, reducedMotion }) {
  const [open, setOpen] = useState(false);

  const handle = () => {
    if (open) return;
    setOpen(true);
    // let the animation breathe, then open stage
    setTimeout(() => onOpen?.(), reducedMotion ? 0 : 520);
  };

  return (
    <motion.div
      onClick={handle}
      style={styles.envelopeWrap}
      whileHover={reducedMotion ? {} : { scale: 1.02 }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
    >
      <motion.div style={styles.envelopeBase}>
        <motion.div
          style={styles.envelopeFlap}
          animate={open ? { rotateX: 180, y: -6 } : { rotateX: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        />
        <motion.div
          style={styles.envelopeLetter}
          animate={open ? { y: -28, opacity: 1 } : { y: 10, opacity: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 18,
            delay: open ? 0.08 : 0,
          }}
        >
          <div style={styles.envelopeSeal}>💗</div>
          <div style={styles.envelopeHint}>tap to open</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function SongsTray({ songs }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={styles.kicker}>🎶 Our soundtrack</div>
      <div style={styles.songsGrid}>
        {songs.slice(0, 8).map((s) => (
          <div key={s} style={styles.songChip}>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Ambient Effects -------------------- */

function BackgroundHearts({ disabled }) {
  const hearts = useMemo(() => {
    const n = 14;
    return Array.from({ length: n }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 22,
      delay: Math.random() * 2.2,
      duration: 6 + Math.random() * 6,
      opacity: 0.08 + Math.random() * 0.14,
    }));
  }, []);

  if (disabled) return null;

  return (
    <div style={styles.heartsLayer} aria-hidden>
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          style={{
            ...styles.heart,
            left: `${h.left}%`,
            fontSize: h.size,
            opacity: h.opacity,
          }}
          initial={{ y: 120 }}
          animate={{ y: -220 }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

function Glow({ disabled }) {
  if (disabled) return null;
  return (
    <motion.div
      aria-hidden
      style={styles.glow}
      animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.05, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function ConfettiHearts({ disabled }) {
  const pieces = useMemo(() => {
    const n = 22;
    return Array.from({ length: n }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 520,
      rot: (Math.random() - 0.5) * 90,
      delay: Math.random() * 0.25,
      size: 12 + Math.random() * 18,
    }));
  }, []);

  if (disabled) return null;

  return (
    <div style={styles.confettiLayer} aria-hidden>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          style={{ ...styles.confetti, fontSize: p.size }}
          initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
          animate={{ opacity: 1, y: 180, x: p.x, rotate: p.rot }}
          transition={{
            duration: 1.2,
            delay: p.delay,
            ease: "easeOut",
          }}
        >
          💗
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------- Styles -------------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 20% 10%, rgba(255, 80, 140, 0.25), transparent 50%)," +
      "radial-gradient(900px 500px at 90% 20%, rgba(255, 190, 70, 0.18), transparent 55%)," +
      "radial-gradient(1200px 700px at 50% 90%, rgba(120, 180, 255, 0.18), transparent 55%)," +
      "linear-gradient(180deg, #0b0c10 0%, #0a0b12 100%)",
    color: "rgba(255,255,255,0.92)",
    display: "flex",
    justifyContent: "center",
    padding: "28px 16px",
    position: "relative",
    overflow: "hidden",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji"',
  },
  shell: { width: "min(980px, 100%)", position: "relative", zIndex: 2 },
  header: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 18,
    marginBottom: 14,
  },
  brandRow: { display: "flex", gap: 12, alignItems: "center" },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    display: "grid",
    placeItems: "center",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
    fontSize: 18,
  },
  h1: { fontSize: 20, fontWeight: 750, letterSpacing: 0.2 },
  sub: { fontSize: 13, opacity: 0.72, marginTop: 2 },
  stagePills: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  stagePill: {
    padding: "8px 10px",
    borderRadius: 999,
    fontSize: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
  },
  stagePillActive: {
    background: "rgba(255,255,255,0.14)",
    border: "1px solid rgba(255,255,255,0.22)",
    boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
  },
  stagePillIdle: { opacity: 0.72 },

  card: {
    borderRadius: 22,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    boxShadow: "0 30px 90px rgba(0,0,0,0.45)",
    overflow: "hidden",
  },
  panel: { padding: 18 },
  kicker: { fontSize: 12, letterSpacing: 0.6, opacity: 0.75, marginBottom: 10 },
  h2: { margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: 0.2 },
  p: { marginTop: 10, marginBottom: 16, opacity: 0.82, lineHeight: 1.5 },

  row: { display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center",
  },

  pill: {
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    fontSize: 12,
    opacity: 0.92,
  },
  pillSubtle: { opacity: 0.7 },

  btn: {
    borderRadius: 14,
    padding: "11px 14px",
    fontSize: 14,
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.14)",
    cursor: "pointer",
    transition: "transform 120ms ease",
    userSelect: "none",
  },
  btnPrimary: {
    background: "rgba(255,255,255,0.92)",
    color: "#0b0c10",
    boxShadow: "0 16px 50px rgba(0,0,0,0.45)",
  },
  btnSecondary: {
    background: "rgba(255,255,255,0.06)",
    color: "rgba(255,255,255,0.9)",
  },
  btnDisabled: { opacity: 0.5, cursor: "not-allowed" },

  letterPaper: {
    borderRadius: 18,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",
    padding: 16,
    lineHeight: 1.6,
  },
  letterLine: { fontSize: 14, opacity: 0.92, whiteSpace: "pre-wrap" },
  bullet: { paddingLeft: 10, opacity: 0.9 },
  spacer: { opacity: 0.2 },
  cursorRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
    opacity: 0.75,
  },
  cursor: {
    width: 10,
    height: 10,
    borderRadius: 999,
    display: "inline-block",
    background: "rgba(255,255,255,0.85)",
  },
  cursorHint: { fontSize: 12, opacity: 0.72 },

  songsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 10,
    marginTop: 8,
  },
  songChip: {
    padding: "10px 12px",
    borderRadius: 14,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    fontSize: 13,
    opacity: 0.9,
  },

  bigNote: {
    marginTop: 14,
    padding: 16,
    borderRadius: 18,
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
  },
  mini: { fontSize: 12, opacity: 0.7 },

  envelopeWrap: {
    display: "grid",
    placeItems: "center",
    margin: "18px 0 10px",
  },
  envelopeBase: {
    width: "min(520px, 92%)",
    height: 220,
    borderRadius: 20,
    position: "relative",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",
    overflow: "hidden",
    boxShadow: "0 26px 70px rgba(0,0,0,0.45)",
    perspective: 900,
    cursor: "pointer",
  },
  envelopeFlap: {
    position: "absolute",
    inset: 0,
    transformOrigin: "top",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
    clipPath: "polygon(0 0, 100% 0, 50% 58%)",
  },
  envelopeLetter: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
    top: 48,
    borderRadius: 16,
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.16)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  envelopeSeal: {
    width: 46,
    height: 46,
    borderRadius: 999,
    display: "grid",
    placeItems: "center",
    background: "rgba(255,255,255,0.14)",
    border: "1px solid rgba(255,255,255,0.18)",
    boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
    fontSize: 20,
  },
  envelopeHint: { fontSize: 12, opacity: 0.75 },

  footer: {
    marginTop: 14,
    opacity: 0.65,
    display: "flex",
    justifyContent: "center",
  },
  footerText: { fontSize: 12 },

  heartsLayer: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 1,
  },
  heart: { position: "absolute", bottom: -40 },

  glow: {
    position: "absolute",
    inset: -120,
    background:
      "radial-gradient(600px 300px at 50% 30%, rgba(255,255,255,0.12), transparent 60%)",
    filter: "blur(10px)",
    pointerEvents: "none",
    zIndex: 0,
  },

  confettiLayer: { position: "absolute", inset: 0, pointerEvents: "none" },
  confetti: { position: "absolute", left: "50%", top: 40 },
};
