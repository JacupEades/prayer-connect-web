import React from "react";
import styles from "@/styles/Header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

type Props = {
	unansweredChip: any;
	answeredValue: string;
	sortApplied: boolean;
	selection: string;
};

export default function UnansweredBtn({
	unansweredChip,
	answeredValue,
	sortApplied,
	selection,
}: Props) {
	return (
		<>
			{selection === "Private Prayers" ||
			(sortApplied === true && answeredValue === "no filter") ? (
				<>
					{answeredValue === "unanswered" ? (
						<div className={styles.btnContainer}>
							<Button
								variant="outlined"
								onClick={() => {
									unansweredChip();
								}}
								className={styles.headerOptionSelected}>
								<p className={styles.headerOptionText}>Unanswered</p>
								<CloseIcon className={styles.closeIcon} />
							</Button>
						</div>
					) : (
						<div className={styles.btnContainer}>
							<Button
								variant="outlined"
								onClick={() => {
									unansweredChip();
								}}
								className={styles.headerOptionIconContainer}>
								<p className={styles.headerOptionText}>Unanswered</p>
							</Button>
						</div>
					)}
				</>
			) : (
				<></>
			)}
		</>
	);
}
