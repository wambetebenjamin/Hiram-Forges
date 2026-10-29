export default function Loading() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 18,
        paddingTop: 120,
      }}
      role="status"
      aria-live="polite"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/loading.gif" alt="" width={120} height={120} />
      <p
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: 13,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#57534a",
        }}
      >
        Loading
      </p>
    </div>
  );
}
