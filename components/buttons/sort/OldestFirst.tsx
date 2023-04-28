import React from "react";
import styles from "@/styles/Header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

type Props = {
	oldFirst: any;
	sortValue: string;
	sortApplied: boolean;
};

export default function OldestFirst({
	oldFirst,
	sortValue,
	sortApplied,
}: Props) {
	return (
		<>
			{sortApplied === false ||
			(sortApplied === true && sortValue === "oldest") ? (
				<>
					{sortValue === "oldest" ? (
						<div className={styles.btnContainer}>
							<Button
								variant="outlined"
								onClick={() => {
									oldFirst();
								}}
								className={styles.headerOptionSelected}>
								<p className={styles.headerOptionText}>Oldest First</p>
								<CloseIcon className={styles.closeIcon} />
							</Button>
						</div>
					) : (
						<div className={styles.btnContainer}>
							<Button
								variant="outlined"
								onClick={() => {
									oldFirst();
								}}
								className={styles.headerOptionIconContainer}>
								<p className={styles.headerOptionText}>Oldest First</p>
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
