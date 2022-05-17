import React from 'react';
import { BsDiscord } from "react-icons/bs";
import { FaAngleRight, FaRegEnvelopeOpen, FaLinkedinIn, FaTwitter, FaTelegramPlane, FaRegFileAlt, FaRegUserCircle, FaFileAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <hr />
      <div className="" style={{ paddingTop: "60px" }}>
        <div className="container">
          <div className="d-md-flex justify-content-between">
            <div className="text-center text-md-start" style={{flex: "1"}}>
              <div className="fw-700 fs-1p5 cod-gray mb-3 ">Contact</div>
              <div className="align-items-center d-flex gap-2 align-content-center justify-content-center justify-content-md-start">
                <FaRegEnvelopeOpen className="" />
                <a target="_blank" rel="noreferrer" href="mailto:info@proof-of-identity.com" className="decoration-none">Email</a>
              </div>
              <div className="align-items-center d-flex gap-2 mt-2 align-content-center justify-content-center justify-content-md-start">
                <FaLinkedinIn />
                <a target="_blank" rel="noreferrer" href="https://discord.gg/tna5288W" className="decoration-none">Linkedin</a>
              </div>
              <div className="align-items-center d-flex gap-2 mt-2 align-content-center justify-content-center justify-content-md-start">
                <FaTwitter  />
                <a target="_blank" rel="noreferrer" href="https://discord.gg/tna5288W" className="decoration-none">Twitter</a>
              </div>
              <div className="align-items-center d-flex gap-2 mt-2 align-content-center justify-content-center justify-content-md-start">
                <FaTelegramPlane />
                <a target="_blank" rel="noreferrer" href="https://discord.gg/tna5288W" className="decoration-none">Telegram</a>
              </div>
              <div className="align-items-center d-flex gap-2 mt-2 align-content-center justify-content-center justify-content-md-start">
                <BsDiscord />
                <a target="_blank" rel="noreferrer" href="https://discord.gg/tna5288W" className="decoration-none">Discord</a>
              </div>
            </div>
            <div className="text-center  text-md-start mt-4 mt-md-0 d-flex flex-column gap-1" style={{flex: "1"}}>
              <div className="fw-700 fs-1p5 cod-gray mb-3">Policies</div>
              <span><FaRegFileAlt style={{marginRight: "15px"}} /><a target="_blank" rel="noreferrer" href="https://proof-of-identity.com/ico-terms-of-sale" className="decoration-none">ICO - Terms of sale</a></span>
              <span><FaRegUserCircle style={{marginRight: "15px"}} /><a target="_blank" rel="noreferrer" href="https://proof-of-identity.com/privacy-policy" className="decoration-none">Privacy Policy</a></span>
              <span><FaFileAlt style={{marginRight: "15px"}} /><a target="_blank" rel="noreferrer" href="https://proof-of-identity.com/terms-and-conditions" className="decoration-none">Terms and Conditions</a></span>
            </div>
            <div className="text-center  text-md-start d-flex flex-column gap-1 mt-4 mt-md-0" style={{flex: "1"}}>
              <div className="fw-700 fs-1p5 cod-gray mb-3">ICO</div>
              <span><FaAngleRight style={{marginRight: "15px"}}/><a target="_blank" rel="noreferrer" href="https://token-sale.proof-of-identity.com/" className="decoration-none">ICO Token Sale</a></span>
              <span><FaAngleRight style={{marginRight: "15px"}}/><a target="_blank" rel="noreferrer" href="https://proof-of-identity.com/ico-human-income-coin" className="decoration-none">Our Team</a></span>
              <span><FaAngleRight style={{marginRight: "15px"}}/><a target="_blank" rel="noreferrer" href="https://proof-of-identity.com/ico-human-income-coin" className="decoration-none">ICO - Presentation page</a></span>
              <span><FaAngleRight style={{marginRight: "15px"}}/><a target="_blank" rel="noreferrer" href="https://proof-of-identity.com/pre-ico" className="decoration-none">Pre-ICO</a></span>
              <span><FaAngleRight style={{marginRight: "15px"}}/><a target="_blank" rel="noreferrer" target="_blank" rel="noreferrer" target="_blank" rel="noreferrer" href="https://proof-of-identity.com/bounty-program" className="decoration-none">Bounty program</a></span>
            </div>
          </div>
          <div class="m-4 text-center" style={{color: "#8e8e8e"}}><p>© 2021 Proof of Identity | All Rights Reserved.</p>
            </div>
        </div>
      </div>
    </>
  );
};

export default Footer;