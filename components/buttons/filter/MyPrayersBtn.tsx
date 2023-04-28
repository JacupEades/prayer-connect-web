import React from "react";
import styles from "@/styles/Header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

type Props = {
	mineChip: any;
	whoValue: string;
};

export default function MyPrayersBtn({ mineChip, whoValue }: Props) {
	return (
		<>
			{whoValue === "mine" ? (
				<div className={styles.btnContainer}>
					<Button
						variant="outlined"
						onClick={() => {
							mineChip();
						}}
						className={styles.headerOptionSelected}>
						<p className={styles.headerOptionText}>My Prayers</p>
						<CloseIcon className={styles.closeIcon} />
					</Button>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
