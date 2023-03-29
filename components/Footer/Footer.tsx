import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaStripe, FaCcMastercard } from "react-icons/fa";
import {  RiMastercardFill, RiVisaFill } from "react-icons/ri";
import {  BsPaypal } from "react-icons/bs";
import s from './Footer.module.css'
import Link from "next/link";

const Footer:React.FC = () => {
  return (
    <footer className={s.root}>
		<div className={s.container}>
			<div className={s.infoPart}>
				<div className={s.helpSection}>
					<h4 className={s.sectionTitle}>
						Help
					</h4>
					<ul>
						<li className="pb-2">
							<Link href="#" className={s.helpSection_link}>
								Track Order
							</Link>
						</li>

						<li className="pb-2">
							<Link href="#" className={s.helpSection_link}>
								Returns
							</Link>
						</li>

						<li className="pb-2">
							<Link href="#" className={s.helpSection_link}>
								Shipping
							</Link>
						</li>

						<li className="pb-2">
							<Link href="#" className={s.helpSection_link}>
								FAQs
							</Link>
						</li>
					</ul>
				</div>

				<div className={s.getInTouchSection}>
					<h4 className={s.sectionTitle}>
						GET IN TOUCH
					</h4>

					<p className={s.getInTouchSection_body}>
						Any questions? Let us know in store at 8th floor, 389 Hudson St, New York, NY 10018 or call us on (+1) 96 716 6879
					</p>

					<div className={s.socialContainer}>
						<Link href="https://facebook.com" target={'_blank'} className={s.socialLink}>
							<FaFacebook />
						</Link>

						<Link href="https://twitter.com" target={'_blank'} className={s.socialLink}>
							<FaTwitter />
						</Link>

						<Link href="https://instagram.com" target={'_blank'} className={s.socialLink}>
							<FaInstagram />
						</Link>
					</div>
				</div>

				<div className={s.newsletterSection}>
					<h4 className={s.sectionTitle}>
						Newsletter
					</h4>

					<form>
						<div className={s.newsletterSection_inputWrapper}>
							<input className={s.newsletterSection_input} type="text" name="email" placeholder="email@example.com" />
							<div className={s.newsletterSection_inputLine}></div>
						</div>

						<div className="pt-4">
							<button className={s.newsletterSection_button}>
								Subscribe
							</button>
						</div>
					</form>
				</div>
			</div>

      <div className={s.paymentMethodsPart}>
          <RiVisaFill className={s.paymentIcon} />
          <BsPaypal className={s.paymentIcon}/>
          <FaStripe className={s.paymentIcon}/>
          <FaCcMastercard className={s.paymentIcon}/>
          <RiMastercardFill className={s.paymentIcon}/>
      </div>
        
      <div className={s.rightsPart}>
        <p>
          &copy; 2023 Sana Shop. All rights reserved.
        </p>
      </div>
		</div>
	  </footer>
  );
};

export default Footer;
