import React from "react";
import styles from "@/styles/Header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

type Props = {
	answeredChip: any;
	answeredValue: string;
	sortApplied: boolean;
	selection: string;
};

export default function AnsweredBtn({
	answeredChip,
	answeredValue,
	sortApplied,
	selection,
}: Props) {
	return (
		<>
			{selection === "Private Prayers" ||
			(sortApplied === true && answeredValue === "no filter") ? (
				<>
					{answeredValue === "answered" ? (
						<div className={styles.btnContainer}>
							<Button
								variant="outlined"
								onClick={() => {
									answeredChip();
								}}
								className={styles.headerOptionSelected}>
								<p className={styles.headerOptionText}>Answered</p>
								<CloseIcon className={styles.closeIcon} />
							</Button>
						</div>
					) : (
						<div className={styles.btnContainer}>
							<Button
								variant="outlined"
								onClick={() => {
									answeredChip();
								}}
								className={styles.headerOptionIconContainer}>
								<p className={styles.headerOptionText}>Answered</p>
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
