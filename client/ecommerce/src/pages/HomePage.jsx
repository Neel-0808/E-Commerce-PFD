import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            E-Commerce
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link btn btn-outline-light me-2"
                  href="/login"
                >
                  Sign In
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link btn btn-primary" href="/register">
                  Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1>Welcome to Our E-Commerce Store</h1>
          <p className="lead">Shop the best products at the best prices</p>
          <a href="/login" className="btn btn-light btn-lg">
            Start Shopping
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section className="container py-5">
        <div className="row text-center">
          <div className="col-md-4">
            <h3>Wide Variety</h3>
            <p>Explore a huge range of categories and brands.</p>
          </div>
          <div className="col-md-4">
            <h3>Best Prices</h3>
            <p>Get amazing discounts and deals.</p>
          </div>
          <div className="col-md-4">
            <h3>Fast Delivery</h3>
            <p>Quick and reliable shipping on all orders.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
