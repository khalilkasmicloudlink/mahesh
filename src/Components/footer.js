import React from 'react'
import { withRouter } from "react-router-dom";

import { Navbar, Nav } from "react-bootstrap";
 const Footer = () => {
    return (
        <div class="mt-5 pt-5 pb-5 footer" style={{ background: "#007BFF", color: 'white' }}>
<div class="container" >
  <div class="row"  >
    <div class="col-lg-5 col-xs-12">
      <h2>Hapus</h2>
            
    </div>
    <div class="col-lg-3 col-xs-12 links">
      <h4 class="mt-lg-0 mt-sm-3">Links</h4>
         <Nav.Link href="/" style={{ cursor: "pointer", color: "#ffffff" }}>
            About Us
          </Nav.Link>
          <Nav.Link href="/" style={{ cursor: "pointer", color: "#ffffff" }}>
            Terms of Use
          </Nav.Link>
          <Nav.Link href="/" style={{ cursor: "pointer", color: "#ffffff" }}>
            Privacy Policy
          </Nav.Link>
    </div>
    <div class="col-lg-4 col-xs-12 location">
      <h4 class="mt-lg-0 mt-sm-4">Location</h4>
      <p> Address: First Floor, BIEL, COEP campus, shivajinagar, Pune- 411005</p>
      <p class="mb-0">Mobile No: +91-94040 69699</p>
      <p>Email: info@hapus.app</p>
    </div>
  </div>
  <div class="row mt-5">
    <div class="col copyright">
      <p class=""><small className="text-white-50">© 2020. All Rights Reserved.</small></p>
    </div>
  </div>
</div>
</div>
    )
}
export default withRouter(Footer);