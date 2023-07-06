import React, { useEffect, useState } from "react";
import settingstyles from "@/styles/Settings.module.css";
import {
	Button,
	FormControl,
	FormControlLabel,
	RadioGroup,
	SwipeableDrawer,
} from "@mui/material";
import headerStyles from "@/styles/Header.module.css";
import Radio from "@mui/material/Radio";
import styles from "@/styles/Header.module.css";
import { useSelector } from "react-redux";
import { getUsers, updateUser } from "@/lib/userHelper";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import { changeCommunity } from "@/redux/slices/communitySlice";

type Props = {
	cMenuOpen: boolean;
	communityMenu: any;
};

export default function CommunityDrawer({ cMenuOpen, communityMenu }: Props) {
	const { selectedCommunity, user } = useSelector((state: any) => ({
		...state,
	}));
	const [newSelection, setNewSelection] = useState(false);
	const [selectedOption, setSelectedOption] = useState("");
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		setSelectedOption(selectedCommunity.community);
	}, [selectedCommunity.community, dispatch]);

	useEffect(() => {
		if (selectedOption && newSelection === true) {
			dispatch(changeCommunity({ community: selectedOption }));
			setNewSelection(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOption, newSelection]);

	const {
		isLoading: userLoading,
		isError: userIsError,
		data: userData,
	} = useQuery("users", getUsers);

	useEffect(() => {
		if (userData) {
			const currentUserData = userData.filter(
				(obj: any) => obj.uid === user.uid
			);
			if (currentUserData) {
				// get the comName for the DB formData
				const comObj = currentUserData[0]?.approvedCommunities.filter(
					(obj: any) => obj.abbreviation === selectedOption
				);
				if (comObj) {
					const userDBId = `?userId=${currentUserData[0]?._id}`;
					const formData = {
						putType: "selectCommunity",
						selectCommunity: {
							abbreviation: selectedOption,
							comName: comObj[0]?.comName,
						},
					};
					updateUser(userDBId, formData);
				}
			}
		}
	}, [selectedOption, user.uid, userData]);

	// Data validation loading, error, and redux store uid
	if (userLoading) return <div>loading</div>;
	if (userIsError) return <div>error</div>;
	if (user.uid === "") return <></>;

	const currentUserData = userData.filter((obj: any) => obj.uid === user.uid);

	const handleSelection = (e: any) => {
		e.preventDefault();
		communityMenu();
		setNewSelection(true);
	};

	const UserComMap = () => {
		if (!currentUserData) {
			return (
				<FormControlLabel
					key={1}
					className={headerStyles.comLabel}
					value={"Global"}
					control={
						<Radio
							sx={{
								width: "24px",
								height: "24px",
								color: "var(--sys-light-on-surface-variant)",
								"&.Mui-checked": {
									color: "var(--sys-light-primary)",
								},
							}}
						/>
					}
					label={"Global"}
				/>
			);
		} else {
			return (
				currentUserData[0] &&
				currentUserData[0].approvedCommunities.map((communitiesData: any) => {
					return (
						<FormControlLabel
							key={communitiesData.abbreviation}
							className={headerStyles.comLabel}
							value={communitiesData.abbreviation}
							onChange={() => setSelectedOption(communitiesData.abbreviation)}
							control={
								<Radio
									sx={{
										width: "24px",
										height: "24px",
										color: "var(--sys-light-on-surface-variant)",
										"&.Mui-checked": {
											color: "var(--sys-light-primary)",
										},
									}}
								/>
							}
							label={communitiesData.comName}
						/>
					);
				})
			);
		}
	};

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
				open={cMenuOpen}
				onOpen={() => communityMenu()}
				onClose={() => communityMenu()}>
				<div className={headerStyles.comDrawerMain}>
					{/* Title */}
					<h2 className={headerStyles.comDrawerTitle}>Switch Community</h2>
					{/* Your communities */}
					<div className={headerStyles.comDrawerMidMain}>
						<div className={styles.settingsBtnContainer}>
							<FormControl className={headerStyles.comFormControl}>
								<RadioGroup
									className={headerStyles.comRadioGroup}
									aria-labelledby="Global community"
									value={selectedCommunity.community}
									onChange={handleSelection}
									name="communitySelection">
									<UserComMap />
								</RadioGroup>
							</FormControl>
						</div>
					</div>
					<div style={{ padding: "0 1rem", width: "100%" }}>
						<div
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: "0",
								margin: "0",
								padding: "0",
							}}
							className={settingstyles.settingsBtnContainer}>
							<Button
								className={settingstyles.settingsBtn}
								onClick={() => {
									router.push("/home/settings/community-request");
								}}>
								<div className={settingstyles.settingsBtnLeft}>
									<AddIcon className={headerStyles.addIcon} />
									<div
										style={{
											fontFamily: "Roboto",
										}}
										className={settingstyles.settingsBtnText}>
										Join New Community
									</div>
								</div>
							</Button>
						</div>
					</div>
				</div>
			</SwipeableDrawer>
		</>
	);
}
