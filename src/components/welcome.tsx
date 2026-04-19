import { useParams, usePathname } from "next/navigation";
import { IPhase } from "../constants/interfaces";
import { useWedding } from "../hooks/use-wedding";

import { data } from "../constants/config";

export const Welcome = ({ phase, setPhase }: { phase: IPhase; setPhase: (phase: IPhase) => void }) => {
  const params = useParams<{ inviteId: string }>();
  const { heroImage, weddingDetails } = data;
  const { groom, bride } = weddingDetails[params.inviteId as keyof typeof weddingDetails];
  const { startAudio, fireOpenAnimation } = useWedding();

  const openInvitation = () => {
    setPhase("main");
    window.scrollTo(0, 0);
    // Start confetti
    fireOpenAnimation(15);
    // Start audio
    startAudio();
  };

  return (
    <div className={`welcome-page ${phase === "main" ? "hidden" : ""}`}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h2 className="font-esthetic" style={{ fontSize: "2.25rem", marginBottom: "1.5rem" }}>
          The Wedding Of
        </h2>
        <img
          src={heroImage}
          alt="couple"
          className="img-center-crop"
          style={{
            borderRadius: "50%",
            border: "3px solid #dee2e6",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            marginBottom: "1.5rem",
          }}
        />
        <h2 className="font-esthetic" style={{ fontSize: "2.25rem", marginBottom: "1rem" }}>
          {groom.name} &amp; {bride.name}
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
          To Dear Sir/Madam/Brother/Sister
        </p>
        <button className="btn-light-auto" onClick={openInvitation}>
          <i className="fa-solid fa-envelope-open fa-bounce" />
          Open Invitation
        </button>
      </div>
    </div>
  );
};
