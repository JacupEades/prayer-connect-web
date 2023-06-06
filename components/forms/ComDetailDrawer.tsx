import React from "react";
import { Button, SwipeableDrawer } from "@mui/material";
import headerStyles from "@/styles/Header.module.css";
import loginstyles from "@/styles/Login.module.css";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
	cdMenuOpen: boolean;
	comDetailMenu: any;
	comData: any;
	handleSubmit: any;
};

export default function ComDetailDrawer({
	cdMenuOpen,
	comDetailMenu,
	comData,
	handleSubmit,
}: Props) {
	return (
		<>
			<SwipeableDrawer
				sx={{
					"& .MuiDrawer-paper": {
						boxShadow: "none",
						bgcolor: "transparent",
					},
				}}
				anchor="bottom"
				open={cdMenuOpen}
				onOpen={() => comDetailMenu()}
				onClose={() => comDetailMenu()}>
				<div className={headerStyles.comDetailDrawerMain}>
					{/* Title */}
					<div className={headerStyles.comDetailDrawerTop}>
						<div className={headerStyles.comDrawerTitleBlock}></div>
						<h2 className={headerStyles.comDrawerTitle}>Community Details</h2>
						<Button
							onClick={() => comDetailMenu()}
							className={headerStyles.comDetailDrawerClose}>
							<CloseIcon className={headerStyles.comDetailDrawerCloseIcon} />
						</Button>
					</div>
					{/* Detail card */}
					<div className={headerStyles.comDetailDrawerDetailMain}>
						<h3 className={headerStyles.comDetailDrawerDetailH3}>
							{comData.name}
						</h3>
						<p className={headerStyles.comDetailDrawerDetailP}>
							{comData.comDescription}
						</p>
					</div>
					{/* disclaimer */}
					<p className={headerStyles.comDetailDrawerDisclaimer}>
						The admin (Jacob Eades) must approve your request. You will receive
						an email notification once approved.
					</p>
					{/* Sumbit request */}
					<Button
						onClick={() => handleSubmit()}
						style={{ width: "100%" }}
						className={loginstyles.startBtn}>
						Request to Join
					</Button>
				</div>
			</SwipeableDrawer>
		</>
	);
}
