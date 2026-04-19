import { useEffect, useState, useRef, SetStateAction, Dispatch } from "react";
import { IPhase } from "../constants/interfaces";

import { data } from "../constants/config";
import { useWedding } from "../hooks/use-wedding";
import { useParams, useSearchParams } from "next/navigation";

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [cd, setCd] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setCd(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return cd;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function AnimDiv({
  className,
  children,
  style,
}: {
  className: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`${className} ${inView ? "visible" : ""}`} style={style}>
      {children}
    </div>
  );
}

function Carousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="carousel-wrap mb-4">
      <img src={images[idx]} alt={`slide ${idx + 1}`} className="carousel-img" />
      <button className="carousel-btn prev" onClick={() => setIdx((idx - 1 + images.length) % images.length)}>
        <i className="fa-solid fa-chevron-left" style={{ fontSize: "0.75rem" }} />
      </button>
      <button className="carousel-btn next" onClick={() => setIdx((idx + 1) % images.length)}>
        <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.75rem" }} />
      </button>
      <div
        style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4 }}
      >
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: i === idx ? "#fff" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function InfoCard({
  name,
  relation,
  collapseId,
  children,
  defaultOpen = false,
}: {
  name: string;
  relation: string;
  collapseId: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="gift-card">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        {/* <i className={`fa-solid ${icon}`} /> */}
        <span style={{ fontSize: "0.95rem" }}>{relation}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          <i className="fa-regular fa-user fa-sm" style={{ marginRight: 4 }} />
          {name}
        </p>
        <button
          className="btn-outline-dark-auto"
          style={{ fontSize: "0.75rem", padding: "2px 10px", borderRadius: 8 }}
          onClick={() => setOpen(!open)}
        >
          <i className="fa-solid fa-circle-info fa-sm" /> Info
        </button>
      </div>
      <div className={`collapse-content ${open ? "open" : ""}`} id={collapseId}>
        <hr style={{ margin: "0.5rem 0", borderColor: "var(--border-color)" }} />
        {children}
      </div>
    </div>
  );
}

function LoveHeart({ style }: { style: React.CSSProperties }) {
  return (
    <div className="position-absolute animate-love" style={{ ...style, position: "absolute" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        fill="currentColor"
        style={{ opacity: 0.5 }}
        viewBox="0 0 16 16"
      >
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
      </svg>
    </div>
  );
}

export const Main = ({ phase, setTheme }: { phase: IPhase; setTheme: Dispatch<SetStateAction<"light" | "dark">> }) => {
  const params = useParams<{ inviteId: string }>();
  const { heroImage, weddingDate, weddingDetails, gallery } = data;
  const { groom, bride, events } = weddingDetails[params.inviteId as keyof typeof weddingDetails];

  const [name, setName] = useState("");
  //   const [storyOpen, setStoryOpen] = useState(false);
  const [desktopImgIdx, setDesktopImgIdx] = useState(0);
  const [presence, setPresence] = useState("0");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(data.comments);
  const [infoOpen, setInfoOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const cd = useCountdown(weddingDate);
  const pad = (n: number) => String(n).padStart(2, "0");

  const { isPlaying, toggleAudio, saveToGoogleCalendar } = useWedding();

  // Desktop image slideshow
  useEffect(() => {
    if (phase !== "main") return;
    const t = setInterval(() => setDesktopImgIdx((i) => (i + 1) % events.length), 10000);
    return () => clearInterval(t);
  }, [phase]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const sendComment = () => {
    if (!name.trim() || !comment.trim()) return;
    setComments((prev) => [{ name, presence: Number(presence), time: "just now", msg: comment, likes: 0 }, ...prev]);
    setComment("");
    setName("");
    setPresence("0");
  };

  const presenceIcon = (p: number) => (p === 1 ? "✅" : p === 2 ? "❌" : "");
  return (
    <div className="main-content visible">
      <div className="app-wrapper">
        {/* Desktop sticky panel */}
        <div
          className="desktop-only"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "58%",
            overflow: "hidden",
            background: "var(--bg-primary)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {events.map((item, i) => (
              <img
                key={i}
                src={item.image}
                alt="bg"
                className={`desktop-bg-img ${i === desktopImgIdx ? "slide-active" : ""}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  opacity: i === desktopImgIdx ? 0.3 : 0,
                  transition: "opacity 1s ease",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  maskImage: "linear-gradient(0.5turn, transparent, black 40%, black 60%, transparent)",
                  WebkitMaskImage: "linear-gradient(0.5turn, transparent, black 40%, black 60%, transparent)",
                }}
              />
            ))}
            <div
              className="overlay-bg"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                textAlign: "center",
                padding: "2rem 3rem",
                borderRadius: "20px",
              }}
            >
              <h2 className="font-esthetic" style={{ fontSize: "2rem", marginBottom: "1rem", whiteSpace: "nowrap" }}>
                {groom.name} &amp; {bride.name}
                {/* {groom.longName} <br /> &amp; <br /> Daughter of {bride.fatherName} */}
                {/* {events[desktopImgIdx].name} */}
              </h2>
              <p style={{ margin: 0 }}>{events[0].formatedDate}</p>
            </div>
          </div>
        </div>

        {/* Right scrollable content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <main>
            {/* ── HOME SECTION ── */}
            <section
              id="home"
              style={{
                minHeight: "100vh",
                background: "var(--bg-secondary)",
                position: "relative",
                overflow: "hidden",
                padding: 0,
                margin: 0,
              }}
            >
              <img
                src={heroImage}
                alt="bg"
                style={{
                  position: "absolute",
                  opacity: 0.25,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div style={{ position: "relative", textAlign: "center", padding: "0 1rem" }}>
                <h1
                  className="font-esthetic"
                  style={{ fontSize: "2.25rem", paddingTop: "3rem", paddingBottom: "1rem" }}
                >
                  Wedding invitation
                </h1>
                <img
                  src={heroImage}
                  alt="bg"
                  className="img-center-crop"
                  style={{
                    borderRadius: "50%",
                    border: "3px solid #dee2e6",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                    margin: "1rem auto",
                    display: "block",
                    cursor: "pointer",
                  }}
                />
                <h2 className="font-esthetic" style={{ fontSize: "2.25rem", margin: "1rem 0" }}>
                  {groom.name} &amp; {bride.name}
                </h2>
                <p style={{ fontSize: "1rem", margin: "0.5rem 0" }}>{events[0].formatedDate}</p>
                <button
                  className="btn-outline-dark-auto"
                  style={{ marginTop: "0.5rem" }}
                  onClick={() =>
                    saveToGoogleCalendar({
                      title: `Wedding of ${groom.name} & ${bride.name}`,
                      description: `Join us in celebrating the wedding of ${groom.name} and ${bride.name} on ${events[0].formatedDate}. We look forward to sharing this special day with you!`,
                      location: events[0].location,
                      startDateTime: events[0].startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
                      endDateTime: events[0].endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
                    })
                  }
                >
                  <i className="fa-solid fa-calendar-check" />
                  Save Google Calendar
                </button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div className="mouse-anim">
                    <div className="scroll-dot" />
                  </div>
                </div>
                <p style={{ paddingBottom: "2rem", fontSize: "0.825rem", color: "var(--text-secondary)" }}>
                  Scroll Down
                </p>
              </div>
            </section>

            {/* Wave */}
            <div className="wave-wrapper" style={{ background: "var(--bg-secondary)" }}>
              <svg
                viewBox="0 0 1440 320"
                className="wave-svg"
                style={{ color: "var(--bg-primary)" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  fillOpacity="1"
                  d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,165.3C672,160,768,96,864,96C960,96,1056,160,1152,154.7C1248,149,1344,75,1392,37.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
              </svg>
            </div>

            {/* ── GROOM SECTION ── */}
            <section id="groom" style={{ background: "var(--bg-primary)", textAlign: "center" }}>
              <h2 className="font-arabic" style={{ fontSize: "2rem", padding: "1.5rem 0 1rem" }}>
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
              </h2>
              <h2 className="font-esthetic" style={{ fontSize: "2rem", padding: "0.5rem 0 1rem" }}>
                Assalamualaikum Warahmatullahi Wabarakatuh
              </h2>
              <p style={{ fontSize: "0.95rem", padding: "0 1rem 1.5rem", color: "var(--text-secondary)" }}>
                Without any disrespect, we invite you to attend our wedding ceremony:
              </p>

              <div style={{ overflow: "hidden", paddingBottom: "1.5rem" }}>
                {/* Groom */}
                <div style={{ position: "relative" }}>
                  <LoveHeart style={{ top: "0%", right: "5%" }} />
                  <AnimDiv className="slide-right" style={{ paddingBottom: 4 }}>
                    <img
                      src={groom.image}
                      alt="groom"
                      className="img-center-crop"
                      style={{
                        borderRadius: "50%",
                        border: "3px solid #dee2e6",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                        margin: "1rem auto",
                        display: "block",
                        cursor: "pointer",
                      }}
                    />
                    <h2 className="font-esthetic" style={{ fontSize: "2.125rem", margin: 0 }}>
                      {groom.longName}
                    </h2>
                    <p style={{ marginTop: "0.75rem", marginBottom: "0.25rem", fontSize: "1.25rem" }}>
                      Son of {groom.fatherName}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)" }}>{groom.order}</p>
                    {/* <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)" }}>dan</p>
                    <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)" }}>Ibu lorem ipsum</p> */}
                  </AnimDiv>
                  <LoveHeart style={{ top: "90%", left: "5%" }} />
                </div>

                <h2 className="font-esthetic" style={{ fontSize: "4.5rem", margin: "1rem 0" }}>
                  &amp;
                  {/* with */}
                </h2>

                {/* Bride */}
                <div style={{ position: "relative" }}>
                  <LoveHeart style={{ top: "0%", right: "5%" }} />
                  <AnimDiv className="slide-left" style={{ paddingBottom: 4 }}>
                    <img
                      src={bride.image}
                      alt="bride"
                      className="img-center-crop"
                      style={{
                        borderRadius: "50%",
                        border: "3px solid #dee2e6",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                        margin: "1rem auto",
                        display: "block",
                        cursor: "pointer",
                      }}
                    />
                    <h2 className="font-esthetic" style={{ fontSize: "2.125rem", margin: 0 }}>
                      {bride.name}
                    </h2>
                    <p style={{ marginTop: "0.75rem", marginBottom: "0.25rem", fontSize: "1.25rem" }}>
                      Daughter of {bride.fatherName}
                    </p>
                    <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)" }}>{bride.order}</p>
                    {/* <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)" }}>dan</p>
                    <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)" }}>Ibu lorem ipsum</p> */}
                  </AnimDiv>
                  <LoveHeart style={{ top: "90%", left: "5%" }} />
                </div>
              </div>
            </section>

            {/* Wave */}
            <div className="wave-wrapper" style={{ background: "var(--bg-primary)" }}>
              <svg
                viewBox="0 0 1440 320"
                className="wave-svg"
                style={{ color: "var(--bg-secondary)" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  fillOpacity="1"
                  d="M0,192L40,181.3C80,171,160,149,240,149.3C320,149,400,171,480,165.3C560,160,640,128,720,128C800,128,880,160,960,186.7C1040,213,1120,235,1200,218.7C1280,203,1360,149,1400,122.7L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
                />
              </svg>
            </div>

            {/* ── FIRMAN ALLAH ── */}
            <section style={{ background: "var(--bg-secondary)", padding: "1rem 0 2rem" }}>
              <div style={{ padding: "0 1rem", textAlign: "center" }}>
                <h2
                  className="font-esthetic"
                  style={{ fontSize: "2rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
                >
                  Allah Subhanahu Wa Ta'ala says
                </h2>
                <AnimDiv className="fade-down" style={{ marginTop: "1rem" }}>
                  <div
                    className="card-auto"
                    style={{ borderRadius: 16, padding: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}
                  >
                    <p style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                      And We have created everything in pairs so that you may remember (the greatness of Allah).
                    </p>
                    <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                      Surah. Adh-Dhariyat: 49
                    </p>
                  </div>
                </AnimDiv>
                <AnimDiv className="fade-down" style={{ marginTop: "1rem" }}>
                  <div
                    className="card-auto"
                    style={{ borderRadius: 16, padding: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.07)" }}
                  >
                    <p style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                      And indeed, it is He who created the male and female pairs,
                    </p>
                    <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-secondary)" }}>Surah. An-Najm: 45</p>
                  </div>
                </AnimDiv>
              </div>
            </section>

            {/* ── KISAH CINTA ── */}
            {/* <section style={{ background: "var(--bg-secondary)", padding: "0.5rem 1rem 2rem" }}>
              <div
                className="card-auto"
                style={{ borderRadius: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.08)", padding: "1rem" }}
              >
                <h2
                  className="font-esthetic"
                  style={{ textAlign: "center", fontSize: "2.125rem", padding: "0.5rem 0 1rem" }}
                >
                  Kisah Cinta
                </h2>
                <div style={{ position: "relative" }}>
                  <button
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      zIndex: 3,
                      display: storyOpen ? "none" : "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                    className="btn-outline-dark-auto"
                    onClick={() => setStoryOpen(true)}
                  >
                    <i className="fa-solid fa-heart fa-bounce" />
                    Lihat Story
                  </button>
                  <div style={{ maxHeight: storyOpen ? "none" : "15rem", overflow: "hidden", position: "relative" }}>
                    {!storyOpen && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "8rem",
                          background: `linear-gradient(transparent, var(--card-bg))`,
                          zIndex: 2,
                        }}
                      />
                    )}
                    {LOVE_STORY.map((s, i) => (
                      <div key={i} className="timeline-item">
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <div className="timeline-num">{i + 1}</div>
                          {i < LOVE_STORY.length - 1 && (
                            <div style={{ flex: 1, width: 2, background: "var(--border-color)", marginTop: 4 }} />
                          )}
                        </div>
                        <div style={{ paddingTop: 2, paddingBottom: i < LOVE_STORY.length - 1 ? 0 : 0 }}>
                          <p style={{ fontWeight: 600, marginBottom: 6 }}>
                            {s.icon} {s.title}
                          </p>
                          <p
                            style={{
                              fontSize: "0.85rem",
                              color: "var(--text-secondary)",
                              lineHeight: 1.6,
                              margin: 0,
                            }}
                          >
                            {s.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section> */}

            {/* Wave */}
            <div className="wave-wrapper" style={{ background: "var(--bg-secondary)" }}>
              <svg
                viewBox="0 0 1440 320"
                className="wave-svg"
                style={{ color: "var(--bg-primary)" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  fillOpacity="1"
                  d="M0,96L30,106.7C60,117,120,139,180,154.7C240,171,300,181,360,186.7C420,192,480,192,540,181.3C600,171,660,149,720,154.7C780,160,840,192,900,208C960,224,1020,224,1080,208C1140,192,1200,160,1260,138.7C1320,117,1380,107,1410,101.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
                />
              </svg>
            </div>

            {/* ── WEDDING DATE ── */}
            <section id="wedding-date" style={{ background: "var(--bg-primary)", padding: "0 1rem 1rem" }}>
              <div style={{ textAlign: "center" }}>
                <h2 className="font-esthetic" style={{ fontSize: "2.25rem", padding: "1.5rem 0 1rem" }}>
                  Happy Moments
                </h2>
                <div className="countdown-pill" style={{ marginBottom: "1.5rem" }}>
                  {[
                    { v: cd.d, l: "Day" },
                    { v: cd.h, l: "Hours" },
                    { v: cd.m, l: "Minutes" },
                    { v: cd.s, l: "Seconds" },
                  ].map(({ v, l }) => (
                    <div key={l} className="countdown-item">
                      <span className="countdown-num">{pad(v)}</span>
                      <span className="countdown-label">{l}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.95rem", padding: "0.5rem 0", color: "var(--text-secondary)" }}>
                  By asking for the mercy and blessing of Allah Subhanahu Wa Ta'ala, God willing, we will organize the
                  following event:
                </p>

                <div style={{ position: "relative", overflow: "hidden" }}>
                  <LoveHeart style={{ top: "0%", right: "5%" }} />
                  {events.map((e, i) => (
                    <>
                      <AnimDiv
                        key={e.name}
                        className={i % 2 === 0 ? "slide-left" : "slide-right"}
                        style={{ padding: "0.5rem 0" }}
                      >
                        <h2 className="font-esthetic" style={{ fontSize: "2rem", margin: "0.5rem 0" }}>
                          {e.name}
                        </h2>
                        <p style={{ margin: 0 }}>{e.formatedDate}</p>
                      </AnimDiv>
                      <AnimDiv className="fade-down" style={{ padding: "0.5rem 0 1rem" }}>
                        <a
                          href="https://goo.gl/maps/ALZR6FJZU3kxVwN86"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline-dark-auto"
                          style={{ marginBottom: "0.75rem" }}
                        >
                          <i className="fa-solid fa-map-location-dot" />
                          Look at Google Maps
                        </a>
                        {/* <small style={{ display: "block", marginTop: "0.5rem", color: "var(--text-secondary)" }}>
                          207, Block 15-B1 Township, Lahore
                        </small> */}
                      </AnimDiv>
                    </>
                  ))}
                  {/* <AnimDiv className="slide-left" style={{ padding: "0.5rem 0" }}>
                    <h2 className="font-esthetic" style={{ fontSize: "2rem", margin: "0.5rem 0" }}>
                      Barat
                    </h2>
                    <p style={{ margin: 0 }}>Sunday, November 01, 2026</p>
                  </AnimDiv>
                  <AnimDiv className="slide-left" style={{ padding: "0.5rem 0" }}>
                    <h2 className="font-esthetic" style={{ fontSize: "2rem", margin: "0.5rem 0" }}>
                      Walima
                    </h2>
                    <p style={{ margin: 0 }}>Tuesday, November 03, 2026</p>
                  </AnimDiv> */}
                </div>

                {/* <p style={{ fontSize: "0.95rem", padding: "0.5rem 0", color: "var(--text-secondary)" }}>
                  Demi kehangatan bersama, kami memohon kesediaan Anda untuk mengenakan dress code berikut:
                </p>

                <AnimDiv className="fade-down" style={{ padding: "0.5rem 0" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                      gap: 0,
                    }}
                  >
                    {[
                      ["white", 0],
                      ["aquamarine", -12],
                      ["limegreen", -12],
                    ].map(([color, ml], i) => (
                      <div
                        key={i}
                        className="dress-circle"
                        style={{ background: color as string, marginLeft: ml as number }}
                      />
                    ))}
                  </div>
                  <p style={{ fontSize: "0.95rem" }}>Busana batik dan bersepatu.</p>
                </AnimDiv> */}
              </div>
            </section>

            {/* ── CONTACT ── */}
            {/* <section id="contact" style={{ background: "var(--bg-primary)", padding: "0.5rem 1rem 3rem" }}>
              <div
                style={{
                  border: "1px solid var(--border-color)",
                  borderRadius: 24,
                  padding: "1rem",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                }}
              >
                <h2
                  className="font-esthetic"
                  style={{ textAlign: "center", fontSize: "2.25rem", padding: "0.5rem 0 1rem" }}
                >
                  Galeri
                </h2>
                {gallery.map((imgs, i) => (
                  <Carousel key={i} images={imgs} />
                ))}
              </div>
            </section> */}

            {/* Wave */}
            <div className="wave-wrapper" style={{ background: "var(--bg-primary)" }}>
              <svg
                viewBox="0 0 1440 320"
                className="wave-svg"
                style={{ color: "var(--bg-secondary)" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  fillOpacity="1"
                  d="M0,96L30,106.7C60,117,120,139,180,154.7C240,171,300,181,360,186.7C420,192,480,192,540,181.3C600,171,660,149,720,154.7C780,160,840,192,900,208C960,224,1020,224,1080,208C1140,192,1200,160,1260,138.7C1320,117,1380,107,1410,101.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
                />
              </svg>
            </div>

            {/* ── Greetings & Prayers ── */}
            <section id="comment" style={{ background: "var(--bg-secondary)", padding: "0.75rem 1rem 0" }}>
              <div className="comment-form-wrap" style={{ marginBottom: "0.75rem" }}>
                <h2
                  className="font-esthetic"
                  style={{ textAlign: "center", fontSize: "2.25rem", marginBottom: "1.25rem", marginTop: "0.5rem" }}
                >
                  Greetings &amp; Prayers
                </h2>

                {infoOpen && (
                  <div className="alert-info-custom">
                    <button
                      onClick={() => setInfoOpen(false)}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 10,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1rem",
                        color: "#055160",
                      }}
                    >
                      ×
                    </button>
                    <p style={{ fontSize: "1.2rem", marginBottom: "0.3rem" }}>Bestieee!!!</p>
                    <p style={{ margin: 0 }}>
                      Sama bisa format text seperti Whatsapp lohh... cobainn jugaaa, makaciwww bestieee
                    </p>
                  </div>
                )}

                <label style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.9rem" }}>
                  <i className="fa-solid fa-person" style={{ marginRight: 6 }} />
                  Name
                </label>
                <input
                  className="form-input"
                  style={{ marginBottom: "0.75rem" }}
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.9rem" }}>
                  <i className="fa-solid fa-person-circle-question" style={{ marginRight: 6 }} />
                  Presence
                </label>
                <select
                  className="form-input"
                  style={{ marginBottom: "0.75rem" }}
                  value={presence}
                  onChange={(e) => setPresence(e.target.value)}
                >
                  <option value="0">Confirm Presence</option>
                  <option value="1">✅ Attending</option>
                  <option value="2">❌ Unable to Attend</option>
                </select>

                <label style={{ display: "block", marginBottom: "0.3rem", fontSize: "0.9rem" }}>
                  <i className="fa-solid fa-comment" style={{ marginRight: 6 }} />
                  Messages &amp; Prayers
                </label>
                <textarea
                  className="form-input"
                  rows={4}
                  placeholder="Write Messages and Prayers"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ marginBottom: "0.75rem", resize: "none" }}
                />

                <button className="btn-send" onClick={sendComment}>
                  <i className="fa-solid fa-paper-plane" />
                  Send
                </button>
              </div>

              {/* Comments list */}
              <div style={{ paddingBottom: "1rem" }}>
                {comments.map((c, i) => (
                  <div key={i} className="comment-card">
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <div className="comment-avatar">{c.name.charAt(0).toUpperCase()}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                            {c.name} {presenceIcon(c.presence)}
                          </span>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{c.time}</span>
                        </div>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--text-secondary)",
                            margin: 0,
                            lineHeight: 1.5,
                          }}
                        >
                          {c.msg}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
                          <i
                            className="fa-regular fa-heart"
                            style={{ fontSize: "0.8rem", color: "var(--text-secondary)", cursor: "pointer" }}
                          />
                          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{c.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Wave */}
            <div className="wave-wrapper" style={{ background: "var(--bg-secondary)" }}>
              <svg
                viewBox="0 0 1440 320"
                className="wave-svg"
                style={{ color: "var(--bg-primary)" }}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  fillOpacity="1"
                  d="M0,224L34.3,234.7C68.6,245,137,267,206,266.7C274.3,267,343,245,411,234.7C480,224,549,224,617,213.3C685.7,203,754,181,823,197.3C891.4,213,960,267,1029,266.7C1097.1,267,1166,213,1234,192C1302.9,171,1371,181,1406,186.7L1440,192L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                />
              </svg>
            </div>

            {/* ── CONTACT ── */}
            <section id="contact" style={{ background: "var(--bg-primary)", padding: "0.5rem 0 2rem" }}>
              <div style={{ textAlign: "center" }}>
                <h2 className="font-esthetic" style={{ fontSize: "2.25rem", padding: "1rem 0 0.5rem" }}>
                  Family Contact Info
                </h2>
                {/* <p style={{ fontSize: "0.95rem", padding: "0 1rem 0.5rem", color: "var(--text-secondary)" }}>
                  Dengan hormat, bagi Anda yang ingin memberikan tanda kasih kepada kami, dapat melalui:
                </p> */}
                <InfoCard name="Ashraf Ali" relation="Father" collapseId="tf" defaultOpen>
                  {/* <p style={{ margin: "0 0 0.5rem", fontSize: "0.9rem" }}>
                    <i className="fa-solid fa-building-columns" style={{ marginRight: 4 }} />
                    Bank Central Asia
                  </p> */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ margin: 0, fontSize: "0.85rem" }}>
                      <i className="fa-solid fa-phone" style={{ marginRight: 4 }} />
                      0332-4535147
                    </p>
                    <button
                      className="btn-outline-dark-auto"
                      style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: 8 }}
                      onClick={() => navigator.clipboard?.writeText("0332-4535147")}
                    >
                      <i className="fa-solid fa-copy" />
                    </button>
                  </div>
                </InfoCard>
                {/* <InfoCard name="Wahyu Siapa?" collapseId="qris">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src="https://picsum.photos/200/200?random=20"
                      alt="qris"
                      style={{ borderRadius: 8, maxWidth: 160, background: "white" }}
                    />
                  </div>
                </InfoCard>
                <InfoCard name="Wahyu Siapa?" collapseId="gift">
                  <p style={{ margin: "0 0 0.5rem", fontSize: "0.85rem" }}>
                    <i className="fa-solid fa-phone-volume" style={{ marginRight: 4 }} />
                    0812345678
                  </p>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <i className="fa-solid fa-location-dot" style={{ marginRight: 4 }} />
                    RT 10 RW 02, Desa Pajerukan, Kec. Kalibagor, Kab. Banyumas
                  </p>
                </InfoCard> */}
              </div>
            </section>

            {/* ── FOOTER ── */}
            <section style={{ background: "var(--bg-primary)", padding: "1.5rem 1rem 0.5rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.95rem", padding: "0.5rem 0", color: "var(--text-secondary)" }}>
                Thank you for your attention and prayers, which are a great joy and honor for us.
              </p>
              <h2 className="font-esthetic" style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                Peace be upon you
              </h2>
              <h2 className="font-arabic" style={{ fontSize: "2rem", paddingTop: "0.5rem" }}>
                اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ
              </h2>
              {/* <hr style={{ margin: "1rem 0", borderColor: "var(--border-color)" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 0 1rem",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                <small style={{ color: "var(--text-secondary)" }}>
                  Build with <i className="fa-solid fa-heart" style={{ margin: "0 2px" }} /> Dewanakl
                </small>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <small>
                    <i className="fa-brands fa-github" style={{ marginRight: 4 }} />
                    <a
                      href="https://github.com/dewanakl/undangan"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      github
                    </a>
                  </small>
                  <small>
                    <i className="fa-solid fa-music" style={{ marginRight: 4 }} />
                    <a
                      href="https://pixabay.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      music
                    </a>
                  </small>
                </div>
              </div> */}
            </section>
          </main>

          {/* Bottom navbar */}
          <nav className="bottom-navbar">
            <ul className="nav-list">
              {[
                { id: "home", icon: "fa-house", label: "Home" },
                { id: "groom", icon: "fa-user-group", label: "Groom" },
                { id: "wedding-date", icon: "fa-calendar-check", label: "Wedding Date" },
                { id: "comment", icon: "fa-comments", label: "Comments" },
                { id: "contact", icon: "fa-phone", label: "Contact" },
              ].map(({ id, icon, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={activeSection === id ? "active" : ""}
                    onClick={() => setActiveSection(id)}
                  >
                    <i className={`fa-solid ${icon}`} style={{ fontSize: "1rem" }} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Float buttons */}
      <div className="float-btns">
        <button className="float-btn" onClick={toggleTheme} title="Toggle theme">
          <i className="fa-solid fa-circle-half-stroke" />
        </button>
        <button className="float-btn" title="Music" onClick={toggleAudio}>
          {isPlaying ? <i className="fa-solid fa-circle-pause spin" /> : <i className="fa-solid fa-circle-play" />}
        </button>
      </div>
    </div>
  );
};
