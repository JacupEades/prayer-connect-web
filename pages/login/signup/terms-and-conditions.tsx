import React from "react";
import styles from "@/styles/Login.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

type Props = {};

export default function TermsAndConditions({}: Props) {
	const router = useRouter();
	return (
		<main className={styles.mainTAC}>
			{/* Header */}
			<div className={styles.tacHeader}>
				<Button
					className={styles.tacBack}
					onClick={() => {
						router.push("/login/signup");
					}}>
					<CloseIcon />
				</Button>
				<h2 className={styles.h2}>Terms and Conditions</h2>
				<CloseIcon style={{ color: "var(--sys-light-surface)" }} />
			</div>
			{/* Content */}
			<div className={styles.content}>
				<div className={styles.tACcontainer}>
					<h3 className={styles.h3}>1. Acceptance of Terms</h3>
					<p className={styles.tacP}>
						By using the Prayer Connect application (&quot;App&quot;), you agree
						to be bound by these Terms and Conditions (&quot;Terms&quot;). If
						you do not agree to these Terms, you must not use the App. Your
						continued use of the App constitutes your acceptance of any changes
						to these Terms.
					</p>
				</div>
				<div className={styles.tACcontainer}>
					<h3 className={styles.h3}>2. Eligibility and User Conduct</h3>
					<p className={styles.tacP}>
						The App is open to users of all ages. However, you agree to not post
						any profane language or offensive content on the App. The App
						creator, Jacob Eades, reserves the right to remove any posts deemed
						inappropriate. Users must comply with these policies and guidelines
						in order to use the App.
					</p>
				</div>
				<div className={styles.tACcontainer}>
					<h3 className={styles.h3}>3. Privacy</h3>
					<p className={styles.tacP}>
						When you sign up for the App, you provide your name and email
						address. Jacob Eades will take reasonable measures to ensure the
						security and privacy of your data, such as using secure servers and
						encryption protocols to protect your data from unauthorized access
						or disclosure. Analytic tools may be used to gather non-personal
						information, such as page views, user location, operating system,
						and browser. Jacob Eades will not share any user data with third
						parties for marketing or research purposes.
					</p>
				</div>
				<div className={styles.tACcontainer}>
					<h3 className={styles.h3}>4. Content and Features</h3>
					<p className={styles.tacP}>
						The App allows users to post public or anonymous prayers, track
						prayer numbers, receive notifications, and mark prayers as answered.
						Users can also permanently delete their prayer requests or any other
						content they have posted on the App.
					</p>
				</div>
				<div className={styles.tACcontainer}>
					<h3 className={styles.h3}>
						5. Disclaimer of Warranties and Limitation of Liability
					</h3>
					<p className={styles.tacP}>
						Jacob Eades makes no warranties, express or implied, regarding the
						accuracy or reliability of the content or features of the App. You
						assume all responsibility and risk for your use of the App. Jacob
						Eades will not be liable for any damages arising from the use of the
						App, including, but not limited to, indirect, incidental, or
						consequential damages.
					</p>
				</div>
				<div className={styles.tACcontainer}>
					<h3 className={styles.h3}>6. Modification and Termination</h3>
					<p className={styles.tacP}>
						Jacob Eades reserves the right to modify or terminate the App at any
						time without prior notice.
					</p>
				</div>
				<div className={styles.tACcontainer}>
					<h3 className={styles.h3}>7. Support and Contact</h3>
					<p className={styles.tacP}>
						Users can contact Jacob Eades via email for support or customer
						service.
					</p>
				</div>
				<div className={styles.tACcontainer}>
					<h3 className={styles.h3}>8. Governing Law</h3>
					<p className={styles.tacP}>
						These Terms shall be governed by and construed in accordance with
						the laws of the jurisdiction in which the App is operated. Any
						disputes arising out of or in connection with these Terms shall be
						subject to the exclusive jurisdiction of the courts of that
						jurisdiction.
					</p>
				</div>
				<div className={styles.tACcontainer}>
					<h3 className={styles.h3}>9. Entire Agreement</h3>
					<p className={styles.tacP}>
						These Terms constitute the entire agreement between you and Jacob
						Eades and supersede any prior understandings or agreements, whether
						written or oral, regarding the subject matter herein. If any
						provision of these Terms is held invalid or unenforceable, that
						provision shall be construed in a manner consistent with applicable
						law, and the remaining provisions shall remain in full force and
						effect.
					</p>
				</div>
			</div>
		</main>
	);
}
