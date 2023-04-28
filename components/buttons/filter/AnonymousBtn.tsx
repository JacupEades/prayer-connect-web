import React from "react";
import styles from "@/styles/Header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";

type Props = {
	anonChip: any;
	namedValue: string;
};

export default function AnonymousBtn({ anonChip, namedValue }: Props) {
	return (
		<>
			{namedValue === "anon" ? (
				<div className={styles.btnContainer}>
					<Button
						variant="outlined"
						onClick={() => {
							anonChip();
						}}
						className={styles.headerOptionSelected}>
						<p className={styles.headerOptionText}>Anonymous</p>
						<CloseIcon className={styles.closeIcon} />
					</Button>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
