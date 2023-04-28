import React from "react";
import styles from "@/styles/Header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

type Props = {
	mostPrayed: any;
	sortValue: string;
};

export default function MostPrayedFor({ mostPrayed, sortValue }: Props) {
	return (
		<>
			{sortValue === "mostPrayers" ? (
				<div className={styles.btnContainer}>
					<Button
						variant="outlined"
						onClick={() => {
							mostPrayed();
						}}
						className={styles.headerOptionSelected}>
						<p className={styles.headerOptionText}>Most Prayed For</p>
						<CloseIcon className={styles.closeIcon} />
					</Button>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
