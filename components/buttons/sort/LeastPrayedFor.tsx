import React from "react";
import styles from "@/styles/Header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

type Props = {
	leastPrayed: any;
	sortValue: string;
	sortApplied: boolean;
};

export default function LeastPrayedFor({
	leastPrayed,
	sortValue,
	sortApplied,
}: Props) {
	return (
		<>
			{sortApplied === false ||
			(sortApplied === true && sortValue === "leastPrayers") ? (
				<>
					{sortValue === "leastPrayers" ? (
						<div className={styles.btnContainer}>
							<Button
								variant="outlined"
								onClick={() => {
									leastPrayed();
								}}
								className={styles.headerOptionSelected}>
								<p className={styles.headerOptionText}>
									Least Prayed For (by me)
								</p>
								<CloseIcon className={styles.closeIcon} />
							</Button>
						</div>
					) : (
						<div className={styles.btnContainer}>
							<Button
								variant="outlined"
								onClick={() => {
									leastPrayed();
								}}
								className={styles.headerOptionIconContainer}>
								<p className={styles.headerOptionText}>
									Least Prayed For (by me)
								</p>
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
