import { Button, Link } from "@mui/material";
import styles from "@/styles/Settings.module.css";
import SettingsHeaders from "@/components/overlays/SettingsHeaders";

type Props = {};

export default function Support({}: Props) {
	return (
		<main className={styles.supportMain}>
			<SettingsHeaders title="Help & Info" />
			<div className={styles.support}>
				{/* Top */}
				<section className={styles.topSection}>
					<h3>Need Help?</h3>
					<p>
						If you come across any issues, have suggestions or questions, please
						don&apos;t hesitate to contact the app creator, Jacob Eades.
					</p>
					<Button
						href="mailto:jacob.wa.eades@gmail.com"
						className={styles.supportBtn}>
						Open Email
					</Button>
				</section>
				{/* Divider */}
				<div className={styles.greyBlock} />
				{/* Middle */}
				<section className={styles.midSection}>
					<h3>Our Story</h3>
					<p>
						Jacob Eades developed Prayer Connect for his software engineer
						portfolio to practice coding and to bring the Lynchburg Chinese
						Christian Church (LCCC) community closer. A big shout-out to
						everyone who shared their ideas and feedback! <br />
						While Jacob initially aimed to create a native app, technical
						challenges led to the birth of this web app instead. This is just
						the beginning! We&apos;re excited to roll out future updates with
						features like notifications, group visibility, prayer chains, and
						Chinese translations, as time and technical constraints allow.
					</p>
				</section>
				{/* Divider */}
				<div className={styles.greyBlock} />
				{/* Bottom */}
				<section className={styles.botSection}>
					<p>Beta v1.0.0</p>
					<Link
						href={"/login/signup/terms-and-conditions"}
						className={styles.termsLink}>
						Terms and Conditions
					</Link>
				</section>
			</div>
		</main>
	);
}
