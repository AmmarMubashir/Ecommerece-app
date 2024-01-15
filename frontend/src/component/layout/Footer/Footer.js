import React from "react";
import playStore from "../../../images/playstore.png";
import AppStore from "../../../images/Appstore.png";

import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={AppStore} alt="Appstore" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High quality is our first priority</p>
        <p>Copyrights 2023 &copy; Ammar</p>
      </div>
      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="abc">Instagram</a>
        <a href="abc">Linkedin</a>
        <a href="abc">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
