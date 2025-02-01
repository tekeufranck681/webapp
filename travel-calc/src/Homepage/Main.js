import "./Main.css"
import Usercarousel from "../components/Usercarousel";
import Cta from "../components/Cta";
import Footer from "../components/Footer";
import Form from "../components/Form";

const Main= () => {
return(
  <div>
    <section className="hero">
<div className="hero-content">
  <h1>Plan Your Dream Trip Effortlessly!</h1>
  <p>
    Track expenses, convert currencies, and create shareable travel budgets with ease.
  </p>
  <div className="hero-buttons">
    <a href="#start-planning" className="primary-btn">Start Planning</a>
    <a href="#learn-more" className="secondary-btn">Learn More</a>
  </div>
</div>
</section>
  <section>
<div className="features-section">
  <h2>Our Features</h2>
  <p>
    Discover how Travel-Calc can simplify your trip planning. From tracking expenses to creating shareable plans, we’ve got everything covered.
  </p>
  <div className="features-grid">
    {/* Feature 1 */}
    <div className="feature-card">
      <div className="feature-icon">💰</div>
      <h3 className="feature-title">Expense Planning</h3>
      <p className="feature-description">
        Plan your trip expenses effectively and avoid overspending.
      </p>
    </div>

    {/* Feature 2 */}
    <div className="feature-card">
      <div className="feature-icon">📊</div>
      <h3 className="feature-title">Expense Categorization</h3>
      <p className="feature-description">
        Organize your expenses into categories for better tracking.
      </p>
    </div>

    {/* Feature 3 */}
    <div className="feature-card">
      <div className="feature-icon">💱</div>
      <h3 className="feature-title">Currency Conversion</h3>
      <p className="feature-description">
        Convert currencies on the go with real-time exchange rates.
      </p>
    </div>

    {/* Feature 4 */}
    <div className="feature-card">
      <div className="feature-icon">📑</div>
      <h3 className="feature-title">Budget Summaries</h3>
      <p className="feature-description">
        Get clear and concise summaries of your travel budget.
      </p>
    </div>

    {/* Feature 5 */}
    <div className="feature-card">
      <div className="feature-icon">🔗</div>
      <h3 className="feature-title">Sharable Plans</h3>
      <p className="feature-description">
        Share your travel plans with others for collaboration.
      </p>
    </div>
  </div>
</div>
</section>
<section>
  <Usercarousel/>
</section>

<section>
<Cta/>
</section>

<section>
<Footer/>
</section>
<section>
  <Form/>
</section>
</div>


);

}
export default Main;