import React from "react";
import styles from "@/styles/Components.module.css";
import { Button } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

export default function DeleteConfirm({ setDeletePopup, deleteConfirmed }) {
	return (
		<div className={styles.overlayBG}>
			<article className={styles.deleteOverlay}>
				<WarningIcon className={styles.warningIcon} />
				<h3>
					Permanently <br />
					Delete Prayer?
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
