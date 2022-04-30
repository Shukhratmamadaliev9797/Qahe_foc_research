import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className=" my- footer">
      <footer className="text-center text-lg-start  mt-xl-5 pt-4">
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h5 className="text-uppercase mb-4 text-white">OUR WORLD</h5>

              <ul className="list-unstyled mb-4">
                <li>
                  <Link to="/about-us" className="text-white">
                    About us
                  </Link>
                </li>
                <li>
                  <Link to="/upcoming-events" className="text-white">
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/articles" className="text-white">
                    Articles
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h5 className="text-uppercase mb-4 text-white">Assistance</h5>

              <ul className="list-unstyled">
                <li>
                  <Link to="/contact" className="text-white">
                    Contact us
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-white">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h5 className="text-uppercase mb-4 text-white">Information</h5>

              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/private/login" className="text-white">
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h5 className="text-uppercase mb-4 text-white">
                Sign up to our newsletter
              </h5>

              <div className="form-outline form-white mb-4">
                <input
                  type="email"
                  id="form5Example2"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                className="btn btn-outline-white text-black bg-white"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="text-center p-3 border-top border-white text-white">
          All right reserved 2022
        </div>
      </footer>
    </div>
  );
}
