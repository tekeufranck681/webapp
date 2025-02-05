import React from "react";
import "./LearnMore.css";

const LearnMore = () => {
  return (
    <div className="learn-more-wrapper">
      <div className="learn-more-container">
        <h1>Learn More About Our Travel Budget Calculator</h1>

        <section>
          <h2>Our Purpose</h2>
          <p>
            Traveling can be stressful, especially when trying to stick to a
            budget. Our goal is to provide you with a tool that makes planning
            your expenses easy and enjoyable. With our Travel Budget Calculator,
            you can manage your spending while ensuring you get the most out of
            your trip. Whether it's transportation, accommodation, food, or
            activities, we've got you covered.
          </p>
        </section>

        <section>
          <h2>Key Features</h2>
          <ul>
            <li><strong>Plan your travel expenses</strong> with detailed insights and allocate funds to each category for better control.</li>
            <li><strong>Categorize expenses</strong> for better management—easily track how much you’re spending on transport, lodging, meals, and entertainment.</li>
            <li><strong>Get real-time currency conversions</strong> to avoid surprises while traveling internationally.</li>
            <li><strong>View budget summaries</strong> that show you where your money is going, so you can adjust as needed to stay within your financial limits.</li>
            <li><strong>Share your budget plan</strong> with friends or co-travelers so everyone is on the same page and can contribute to the travel fund.</li>
          </ul>
        </section>

        <section className="get-started">
          <p>Ready to take control of your travel budget and experience a stress-free trip?</p>
          <button className="signup-btn">Start Now</button>
        </section>
      </div>
    </div>
  );
};

export default LearnMore;
