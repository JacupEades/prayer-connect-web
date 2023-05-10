import React, { useEffect } from "react";
import styles from "@/styles/Components.module.css";
import { Button } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

export default function DeleteConfirm({
	deletePopup,
	setDeletePopup,
	deleteConfirmed,
	deleteWhat,
}) {
	// Removes scrolling when modal is open
	useEffect(() => {
		window.scrollTo(0, 0);
		const handleScroll = () => {
			if (deletePopup) {
				window.scrollTo(0, 0);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [deletePopup]);

	return (
		<div className={styles.overlayBG}>
			<article className={styles.deleteOverlay}>
				<WarningIcon className={styles.warningIcon} />
				<h3>
					Permanently <br />
					Delete {deleteWhat === "Prayer" ? "Prayer" : "Account"}?
				</h3>
				<p>This action is irreversible</p>
				<div className={styles.deleteBtns}>
					<Button
						onClick={() => setDeletePopup(false)}
						className={styles.noBtn}>
						Cancel
					</Button>
					<Button onClick={() => deleteConfirmed()} className={styles.yesBtn}>
						Delete
					</Button>
				</div>
			</article>
		</div>
	);
}
