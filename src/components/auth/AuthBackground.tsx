export default function AuthBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background: "#f5f7f6",
      }}
    >
      {/* Soft ambient circles */}
      <div
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "rgba(23, 107, 77, 0.07)",
          top: "-180px",
          left: "-100px",
          animation: "canteenOrbOne 12s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(23, 107, 77, 0.045)",
          top: "80px",
          right: "15%",
          animation: "canteenOrbTwo 15s ease-in-out infinite",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(23, 107, 77, 0.055)",
          right: "-220px",
          bottom: "-240px",
          animation: "canteenOrbThree 18s ease-in-out infinite",
        }}
      />

      {/* Subtle diagonal lines */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.22,
        }}
      >
        <path
          d="M-100 500 C300 300 600 250 1000 420 S1500 650 1750 500"
          fill="none"
          stroke="#176b4d"
          strokeWidth="1"
          opacity="0.12"
        />

        <path
          d="M-100 650 C300 450 650 430 1000 570 S1500 780 1750 650"
          fill="none"
          stroke="#176b4d"
          strokeWidth="1"
          opacity="0.08"
        />

        <path
          d="M100 100 C450 250 650 180 900 80 S1350 20 1650 180"
          fill="none"
          stroke="#176b4d"
          strokeWidth="1"
          opacity="0.08"
        />
      </svg>

      {/* CSS animation definitions */}
      <style>
        {`
          @keyframes canteenOrbOne {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
            }
            50% {
              transform: translate3d(35px, 25px, 0) scale(1.05);
            }
          }

          @keyframes canteenOrbTwo {
            0%, 100% {
              transform: translate3d(0, 0, 0);
            }
            50% {
              transform: translate3d(-25px, 35px, 0);
            }
          }

          @keyframes canteenOrbThree {
            0%, 100% {
              transform: translate3d(0, 0, 0) scale(1);
            }
            50% {
              transform: translate3d(-30px, -25px, 0) scale(1.04);
            }
          }
        `}
      </style>
    </div>
  );
}