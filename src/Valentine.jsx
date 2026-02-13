import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export default function ValentineLetter({ askGifUrl, celebrateGifUrl }) {
  const prefersReducedMotion = useReducedMotion();

  // ✅ Swap these anytime (or pass props instead)
  const ASK_GIF =
    askGifUrl ||
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDAweGhxNGxrMzJ1d3J0Zmw5NjhsMHRmaXdlaXpicDkyc2llaWlncyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t8xgPfC5oNIRMrNooe/giphy.gif"; // placeholder
  const CELEBRATE_GIF =
    celebrateGifUrl ||
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmp3YTk4eG1kdjhpY3E5N2lsb2Z5bHR5a3RtMXljdjFqZzFoZHpyYiZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/MDJ9IbxxvDUQM/giphy.gif"; // placeholder

  // ✅ PASTE YOUR LETTER HERE (blank lines = paragraphs)
  const LETTER = `
Hi my beautiful jo,

I'm sorry I've seemed so busy last weekend. I wanted to make something special for you. I know it's not anything physical but I hope it can still make you happy. The same way you make me happy everyday. You know jo, I love you so much. I really love our moments together. I love hearing you laugh, I love when you're my hype man. I really love when we make fun of shows together jo. It's almost our 6 months and I feel like we've been together for a lifetime. These last 6 months have meant so much to me. We have been through so much together. So much joys and happiness but also some pretty hard times. You have no idea how grateful I am that you're still with me through it all. I feel like I'm in constant growth when I'm with you and thank you so much for always pushing you. I love you so much and I love you always. I cannot wait for what the future holds for us. I can't stop being so excited for all the things we have planned. This is only the beginning of our story.

Oh, and one other thing.
`.trim();

  const letterParagraphs = useMemo(
    () => LETTER.split(/\n\s*\n/).map((p) => p.trim()),
    [LETTER],
  );

  const [stage, setStage] = useState("envelope"); // envelope -> letter -> ask -> yes
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    if (open) return;
    setOpen(true);
    setTimeout(() => setStage("letter"), prefersReducedMotion ? 0 : 520);
  };

  const restart = () => {
    setOpen(false);
    setStage("envelope");
  };

  return (
    <div className="vday">
      <BackgroundHearts disabled={prefersReducedMotion} />
      <Glow disabled={prefersReducedMotion} />

      <div className="vday__shell">
        <main className="vday__card">
          <AnimatePresence mode="wait">
            {stage === "envelope" && (
              <motion.section
                key="envelope"
                className="vday__panel"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <div className="vday__kicker">💗 A message for you</div>
                <h2 className="vday__h2">Tap to open.</h2>
                <p className="vday__p">I wrote this with you in my heart.</p>

                <Envelope
                  open={open}
                  onOpen={onOpen}
                  reducedMotion={prefersReducedMotion}
                />

                <div className="vday__rowCenter">
                  <button
                    className="vday__btn vday__btn--primary"
                    onClick={onOpen}
                  >
                    Open the letter
                  </button>
                </div>
              </motion.section>
            )}

            {stage === "letter" && (
              <motion.section
                key="letter"
                className="vday__panel"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <div className="vday__kicker">📝 Love letter</div>

                <motion.div
                  className="vday__paper"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {letterParagraphs.map((para, i) => (
                    <motion.p
                      key={i}
                      className="vday__para"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                        delay: prefersReducedMotion ? 0 : i * 0.06,
                      }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </motion.div>

                <div className="vday__rowBetween">
                  <button
                    className="vday__btn vday__btn--secondary"
                    onClick={() => setStage("envelope")}
                  >
                    Back
                  </button>
                  <button
                    className="vday__btn vday__btn--primary vday__btn--primaryWide"
                    onClick={() => setStage("ask")}
                  >
                    Next
                  </button>
                </div>
              </motion.section>
            )}

            {stage === "ask" && (
              <motion.section
                key="ask"
                className="vday__panel"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="vday__kicker">💘 One more thing</div>

                <motion.div
                  className="vday__gifWrap"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <img
                    className="vday__gif"
                    src={ASK_GIF}
                    alt="Cute Valentine gif"
                    loading="lazy"
                  />
                </motion.div>

                <motion.div
                  className="vday__ask"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: prefersReducedMotion ? 0 : 0.05,
                  }}
                >
                  Will you be my Valentine?
                </motion.div>

                <div className="vday__rowCenter">
                  <button
                    className="vday__btn vday__btn--primary vday__btn--primaryWide"
                    onClick={() => setStage("yes")}
                  >
                    Yes 💗
                  </button>
                </div>

                <div className="vday__mini">
                  (You’re allowed to smile first.)
                </div>
              </motion.section>
            )}

            {stage === "yes" && (
              <motion.section
                key="yes"
                className="vday__panel"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="vday__kicker">✅ Yay</div>
                <h2 className="vday__h2">
                  Okay… I’m officially the happiest person.
                </h2>

                <motion.div
                  className="vday__gifWrap vday__gifWrap--celebrate"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <img
                    className="vday__gif"
                    src={CELEBRATE_GIF}
                    alt="Celebration gif"
                    loading="lazy"
                  />
                </motion.div>

                <motion.div
                  className="vday__note"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.5 }}
                >
                  Happy Valentine’s, my love. 💌
                </motion.div>

                <div className="vday__rowBetween">
                  <button
                    className="vday__btn vday__btn--secondary"
                    onClick={() => setStage("ask")}
                  >
                    Replay
                  </button>
                  <button
                    className="vday__btn vday__btn--primary vday__btn--primaryWide"
                    onClick={restart}
                  >
                    Start over
                  </button>
                </div>

                <ConfettiHearts disabled={prefersReducedMotion} />
              </motion.section>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* -------------------- Subcomponents -------------------- */

function Envelope({ open, onOpen, reducedMotion }) {
  return (
    <motion.div
      className="vday__envWrap"
      onClick={onOpen}
      whileHover={reducedMotion ? {} : { scale: 1.02 }}
      whileTap={reducedMotion ? {} : { scale: 0.98 }}
    >
      <div className="vday__envBase">
        <motion.div
          className="vday__envFlap"
          animate={open ? { rotateX: 180, y: -6 } : { rotateX: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        />
        <motion.div
          className="vday__envLetter"
          animate={open ? { y: -26, opacity: 1 } : { y: 10, opacity: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 240,
            damping: 18,
            delay: open ? 0.08 : 0,
          }}
        >
          <div className="vday__envSeal">💗</div>
          <div className="vday__envHint">tap to open</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* -------------------- Ambient Effects -------------------- */

function BackgroundHearts({ disabled }) {
  const hearts = useMemo(() => {
    const n = 12;
    return Array.from({ length: n }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 20,
      delay: Math.random() * 2.2,
      duration: 6 + Math.random() * 7,
      opacity: 0.08 + Math.random() * 0.14,
    }));
  }, []);

  if (disabled) return null;

  return (
    <div className="vday__hearts" aria-hidden>
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="vday__heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
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
      className="vday__glow"
      aria-hidden
      animate={{ opacity: [0.32, 0.58, 0.32], scale: [1, 1.05, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function ConfettiHearts({ disabled }) {
  const pieces = useMemo(() => {
    const n = 18;
    return Array.from({ length: n }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 420,
      rot: (Math.random() - 0.5) * 90,
      delay: Math.random() * 0.25,
      size: 12 + Math.random() * 18,
    }));
  }, []);

  if (disabled) return null;

  return (
    <div className="vday__confetti" aria-hidden>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="vday__confettiPiece"
          style={{ fontSize: `${p.size}px` }}
          initial={{ opacity: 0, y: 0, x: 0, rotate: 0 }}
          animate={{ opacity: 1, y: 180, x: p.x, rotate: p.rot }}
          transition={{ duration: 1.15, delay: p.delay, ease: "easeOut" }}
        >
          💗
        </motion.div>
      ))}
    </div>
  );
}
