import React from "react";
import styles from "@/styles/Header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

type Props = {
	publicChip: any;
	namedValue: string;
};

export default function PublicBtn({ publicChip, namedValue }: Props) {
	return (
		<>
			{namedValue === "public" ? (
				<div className={styles.btnContainer}>
					<Button
						variant="outlined"
						onClick={() => {
							publicChip();
						}}
						className={styles.headerOptionSelected}>
						<p className={styles.headerOptionText}>Public</p>
						<CloseIcon className={styles.closeIcon} />
					</Button>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
