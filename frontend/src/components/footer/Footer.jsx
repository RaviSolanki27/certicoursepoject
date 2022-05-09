import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <div className="d-flex justify-content-between py-4 my-4 border-top">
        <p style={{color:'#fff'}} >&copy; 2022 CERTICOURSE, Inc. All rights reserved.</p>
        <ul className="list-unstyled d-flex">
          <li className="ms-3">
            <Link className="link-dark" to="#">
              <svg className="bi" width="24" height="24">
              </svg>
            </Link>
          </li>
          <li className="ms-3">
            <Link className="link-dark" to="#">
              <svg className="bi" width="24" height="24">
              </svg>
            </Link>
          </li>
          <li className="ms-3">
            <Link className="link-dark" to="#">
              <svg className="bi" width="24" height="24">
              </svg>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
