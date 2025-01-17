import React from "react";

const Cta = () => {
  return (
    <div
      className="cta-section"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "50px 20px",
        backgroundImage:
          "linear-gradient(135deg, #a8edea, #fed6e3)", // Add a gradient background
        color: "#000",
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Ready to Simplify Your Travel Planning?
      </h2>
      <p
        style={{
          fontSize: "1.2rem",
          marginBottom: "30px",
          maxWidth: "600px",
          lineHeight: "1.6",
        }}
      >
        Start managing your travel expenses efficiently with Travel-Calc. Join
        our growing community of travelers today!
      </p>
      <div className="cta-buttons" style={{ display: "flex", gap: "20px" }}>
        <button
          className="cta-primary"
          style={{
            padding: "15px 30px",
            backgroundColor: "#008000", // Green primary button
            color: "#fff",
            border: "none",
            borderRadius: "30px",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Get Started
        </button>
        <button
          className="cta-secondary"
          style={{
            padding: "15px 30px",
            backgroundColor: "#fff",
            color: "#008000", // Green text for secondary button
            border: "2px solid #008000",
            borderRadius: "30px",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Cta;
