export default function Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Josefin Sans', sans-serif",
      }}
    >
      {/* Falling petals */}
      {[
        { left: "8%", color: "#d4a0a0", dur: "9s", delay: "0s" },
        { left: "20%", color: "#c090b0", dur: "12s", delay: "2s" },
        { left: "35%", color: "#d4a0a0", dur: "8s", delay: "4s" },
        { left: "55%", color: "#e0b0a0", dur: "11s", delay: "1s" },
        { left: "70%", color: "#c090b0", dur: "10s", delay: "3s" },
        { left: "85%", color: "#d4a0a0", dur: "7s", delay: "5s" },
        { left: "92%", color: "#e0b0c0", dur: "13s", delay: "0.5s" },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 18,
            height: 18,
            borderRadius: "80% 0 80% 0",
            background: p.color,
            left: p.left,
            top: -40,
            opacity: 0.18,
            animation: `drift ${p.dur} linear ${p.delay} infinite`,
          }}
        />
      ))}

      {/* Error badge */}
      <span
        style={{
          display: "inline-block",
          background: "#fbeaea",
          color: "#c06060",
          border: "1px solid #f0d0d0",
          borderRadius: 6,
          fontSize: "0.7rem",
          padding: "2px 10px",
          letterSpacing: "0.12em",
          marginBottom: "1.2rem",
          fontFamily: "monospace",
        }}
      >
        INVITE · NOT FOUND
      </span>

      {/* Pulsing seal */}
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          border: "2px solid #d4a0a0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.8rem",
          animation: "sealPulse 3s ease-in-out infinite",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "#fbeaea",
            border: "1.5px solid #d4a0a0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
          }}
        >
          🔒
        </div>
      </div>

      {/* Heading */}
      <h1
        className="font-esthetic"
        style={{ fontSize: "2.6rem", color: "#7a3a3a", lineHeight: 1.2, marginBottom: "0.4rem" }}
      >
        Invitation Not Found
      </h1>
      <p
        style={{
          fontStyle: "italic",
          fontSize: "1rem",
          color: "#b07070",
          letterSpacing: "0.08em",
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        This link doesn&apos;t seem to be for you
      </p>

      {/* Divider */}
      <div
        style={{
          width: 80,
          height: 1,
          background: "#d4a0a0",
          margin: "1.2rem auto",
          opacity: 0.5,
          position: "relative",
        }}
      />

      {/* Message card */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #f0d8d8",
          borderRadius: 20,
          padding: "1.5rem 1.75rem",
          maxWidth: 380,
          width: "100%",
          boxShadow: "0 2px 20px rgba(180,100,100,0.06)",
          marginTop: "0.5rem",
        }}
      >
        <p style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "#7a5050", fontWeight: 300, margin: 0 }}>
          This wedding invitation link is{" "}
          <strong style={{ color: "#5a2020", fontWeight: 400 }}>private and personalised</strong>. It seems the link you
          followed is either invalid, expired, or was not meant for you.
        </p>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "1.2rem", textAlign: "left" }}>
          {[
            "Check the link sent to you directly by the family",
            "Make sure the URL was not edited or shortened incorrectly",
            "Contact the family who invited you for a new link",
          ].map((text, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.85rem", color: "#7a5050" }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  minWidth: 20,
                  borderRadius: "50%",
                  //   background: "#fbeaea",
                  border: "1px solid #d4a0a0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  color: "#c06060",
                  fontWeight: 500,
                  marginTop: 1,
                }}
              >
                {i + 1}
              </div>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp button */}
      {/* <a
        href="https://wa.me/3324579326?text=Hello%20family%2C%20I%20seem%20to%20have%20an%20issue%20with%20my%20wedding%20invitation.%20Could%20you%20please%20assist%20me%3F"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginTop: "1.5rem",
          padding: "0.65rem 1.5rem",
          background: "#075e54",
          color: "#fff5f5",
          border: "none",
          borderRadius: 50,
          fontSize: "0.85rem",
          letterSpacing: "0.08em",
          textDecoration: "none",
          boxShadow: "0 4px 14px rgba(120,50,50,0.2)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.5l5.797-1.52A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.008-1.37l-.36-.213-3.44.902.918-3.354-.234-.375A9.818 9.818 0 1112 21.818z" />
        </svg>
        Contact the Family
      </a> */}

      {/* Keyframe styles */}
      <style>{`
        @keyframes drift {
          0%   { transform: translateY(-40px) rotate(0deg);   opacity: 0;    }
          10%  { opacity: 0.18; }
          90%  { opacity: 0.12; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0;    }
        }
        @keyframes sealPulse {
          0%, 100% { box-shadow: 0 0 0 0   rgba(212,160,160,0.35); }
          50%       { box-shadow: 0 0 0 14px rgba(212,160,160,0);    }
        }
      `}</style>
    </main>
  );
}
