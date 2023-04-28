import React from "react";
import styles from "@/styles/Header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

type Props = {
	otherChip: any;
	whoValue: string;
};

export default function MyPrayersBtn({ otherChip, whoValue }: Props) {
	return (
		<>
			{whoValue === "other" ? (
				<div className={styles.btnContainer}>
					<Button
						variant="outlined"
						onClick={() => {
							otherChip();
						}}
						className={styles.headerOptionSelected}>
						<p className={styles.headerOptionText}>Others&#39; Prayers</p>
						<CloseIcon className={styles.closeIcon} />
					</Button>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
