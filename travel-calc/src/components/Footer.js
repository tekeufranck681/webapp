import React from "react";
import {FaWhatsapp,FaFacebook,FaInstagram} from "react-icons/fa"
import {SiTiktok} from 'react-icons/si'

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        color: "#000",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <div id="contact" className="footer-content" style={{ maxWidth: "1200px", margin: "auto" }}>
        {/* Footer Links */}
        <div
          className="footer-links"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "30px",
            marginBottom: "30px",
          }}
        >
          <div>
            <h4 style={{ marginBottom: "10px", fontSize: "1.2rem" }}>Quick Links</h4>
            <ul style={{ listStyleType: "none", padding: 0, lineHeight: "2" }}>
              <li><a href="/" style={{ color: "#000", textDecoration: "none" }}>Home</a></li>
              <li><a href="/features" style={{ color: "#000", textDecoration: "none" }}>Expenses</a></li>
              <li><a href="/plan-trip" style={{ color: "#000", textDecoration: "none" }}>Plan Trip</a></li>
              <li><a href="/contact" style={{ color: "#000", textDecoration: "none" }}>Bugdet</a></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: "10px", fontSize: "1.2rem" }}>Contact Us</h4>
            <p>IUC Logbessou, Douala Cameroon</p>
            <p>Email: support@travelcalc.com</p>
            <p>Phone: (+237)681-464-222</p>
          </div>
          <div>
            <h4 style={{ marginBottom: "10px", fontSize: "1.2rem" }}>Follow Us</h4>
            <div style={{ display: "flex", flexDirection:"column", gap: "20px", justifyContent: "center", padding: "20px"}}>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: "#000" }}
                
              >
              <SiTiktok />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: "#000" }}
              >
                <FaInstagram/>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: "#000" }}
              >
               <FaFacebook/>
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none", color: "#000" }}
              >
              <FaWhatsapp/>
              </a>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div
          style={{
            borderTop: "1px solid #ddd",
            paddingTop: "20px",
            fontSize: "0.9rem",
          }}
        >
          <p>&copy; 2025 Travel-Calc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
