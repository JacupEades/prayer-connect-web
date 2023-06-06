import React, { useEffect, useState } from "react";
import styles from "@/styles/Settings.module.css";
import formStyle from "@/styles/PrayerPage.module.css";
import admin from "@/styles/AdminPages.module.css";
import router from "next/router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button, styled } from "@mui/material";
import { getCommunities } from "@/lib/communityHelper";
import { useDispatch, useSelector } from "react-redux";
import SettingsHeaders from "@/components/overlays/SettingsHeaders";
import { useQuery } from "react-query";
import { addComRequest, getComRequests } from "@/lib/comRequestHelper";
import { getUsers } from "@/lib/userHelper";
import HomeSectionLoading from "@/components/loading/home/HomeSectionLoading";
import HomeSectionError from "@/components/loading/home/HomeSectionError";
import HomeSectionUidError from "@/components/loading/home/HomeSectionUidError";
import settingstyles from "@/styles/Settings.module.css";
import { FormControl, FormControlLabel, RadioGroup } from "@mui/material";
import headerStyles from "@/styles/Header.module.css";
import Radio from "@mui/material/Radio";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import { changeCommunity } from "@/redux/slices/communitySlice";
import ComDetailDrawer from "@/components/forms/ComDetailDrawer";

export default function CommunityRequest() {
	const { selectedCommunity, user } = useSelector((state: any) => ({
		...state,
	}));
	const [newSelection, setNewSelection] = useState(false);
	const [cdMenuOpen, setCdMenuOpen] = useState(false);
	const [comData, setComData] = useState({
		name: "Default",
		abbreviation: "Def",
		comDescription: "Default",
	});
	const [selectedOption, setSelectedOption] = useState(
		selectedCommunity.community
	);
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		setSelectedOption(selectedCommunity.community);
	}, [selectedCommunity.community]);

	useEffect(() => {
		if (selectedOption && newSelection === true) {
			dispatch(changeCommunity({ community: selectedOption }));
			setNewSelection(false);
		}
	}, [selectedOption, newSelection, dispatch]);

	useEffect(() => {
		if (user.uid === "") {
			router.push("/login/existing-user");
		}
	}, [router, user]);

	const {
		isLoading: userLoading,
		isError: userIsError,
		data: userData,
	} = useQuery("users", getUsers);

	const {
		isLoading: comRequestsLoading,
		isError: comRequestsIsError,
		data: comRequestsData,
		refetch,
	} = useQuery("comRequests", getComRequests);
	const {
		isLoading: communitiesLoading,
		isError: communitiesIsError,
		data: communitiesData,
	} = useQuery("communities", getCommunities);

	if (comRequestsLoading || communitiesLoading || userLoading)
		return <HomeSectionLoading />;
	if (comRequestsIsError || communitiesIsError || userIsError)
		return <HomeSectionError />;
	if (user.email === "") return <HomeSectionUidError />;

	const handleSelection = (e: any) => {
		e.preventDefault();
		setNewSelection(true);
	};

	const comDetailMenu = () => {
		setCdMenuOpen(!cdMenuOpen);
	};

	const handleRequestBtn = (request: any) => {
		setComData(request);
		comDetailMenu();
	};

	const handleSubmit = () => {
		console.log("request made");
		if (comData) {
			addComRequest({
				uid: user.uid,
				name: user.name,
				abbreviation: comData.abbreviation,
				comName: comData.name,
			});
			comDetailMenu();
			refetch();
		} else {
			console.log("comData was null");
		}
	};
	const currentUserData = userData.filter((obj: any) => obj.uid === user.uid);

	const UserComMap = () => {
		if (currentUserData.length === 0) {
			return <p style={{ color: "red" }}>User Data Did Not Load Correctly</p>;
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

	const AvailableRequestOption = () => {
		const requestPendingCheck = comRequestsData.filter((comRequest: any) => {
			// Check if any object in communitiesData has the same abbreviation
			return !communitiesData.some(
				(community: any) => community.comName === comRequest.abbreviation
			);
		});

		const availableCommunities = communitiesData.filter((obj: any) => {
			return requestPendingCheck.every((comRequest: any) => {
				return (
					obj._id !== currentUserData[0].approvedCommunities._id &&
					obj.abbreviation !== comRequest.abbreviation
				);
			});
		});

		return (
			<>
				{availableCommunities &&
					availableCommunities
						.filter((obj: any) => {
							if (Array.isArray(currentUserData[0].approvedCommunities)) {
								const userComs = currentUserData[0].approvedCommunities;
								const abbSearch = obj.abbreviation;
								const abbreviationExists = userComs.some(
									(obj: any) => obj.abbreviation === abbSearch
								);
								return (
									obj.abbreviation !== "G" &&
									userData[0] &&
									abbreviationExists === false
								);
							} else {
								return obj.abbreviation !== "G" && userData[0];
							}
						})
						.map((communitiesData: any) => (
							<div
								className={styles.settingsBtnContainer}
								key={communitiesData.abbreviation}>
								<Button
									className={styles.settingsBtn}
									onClick={() => handleRequestBtn(communitiesData)}>
									<div className={styles.settingsBtnLeft}>
										<div className={styles.settingsBtnText}>
											{communitiesData.abbreviation}
										</div>
									</div>
									<NavigateNextIcon />
								</Button>
							</div>
						))}
				{/* Section title */}
				<p className={styles.comHeaderTitle}>Pending Requests</p>
				{requestPendingCheck.length === 0 ? (
					<p style={{ color: "black" }}>No Pending Requests</p>
				) : (
					<></>
				)}
				{requestPendingCheck &&
					requestPendingCheck
						.filter((obj: any) => {
							if (Array.isArray(currentUserData[0].approvedCommunities)) {
								const userComs = currentUserData[0].approvedCommunities;
								const abbSearch = obj.abbreviation;
								const abbreviationExists = userComs.some(
									(obj: any) => obj.abbreviation === abbSearch
								);
								return (
									obj.abbreviation !== "G" &&
									userData[0] &&
									abbreviationExists === false
								);
							} else {
								return obj.abbreviation !== "G" && userData[0];
							}
						})
						.map((communitiesData: any) => (
							<div
								className={styles.settingsBtnContainer}
								key={communitiesData.abbreviation}>
								<Button className={styles.settingsBtn}>
									<div className={styles.settingsBtnLeft}>
										<div className={styles.settingsBtnText}>
											{communitiesData.abbreviation}: {communitiesData.comName}
										</div>
									</div>
								</Button>
							</div>
						))}
			</>
		);
	};

	return (
		<main className={styles.comReqMain}>
			{/* Header */}
			<SettingsHeaders title="Community" />
			{/* Section 1 */}
			<div className={styles.comReqSectionMain}>
				{/* Section title */}
				<p className={styles.comHeaderTitle}>Your Community</p>
				<FormControl className={headerStyles.comFormControl}>
					<RadioGroup
						className={headerStyles.comReqRadioGroup}
						aria-labelledby="Global community"
						value={selectedOption}
						onChange={handleSelection}
						name="communitySelection">
						<UserComMap />
					</RadioGroup>
				</FormControl>
			</div>
			{/* Section 2 */}
			<div className={styles.comReqSectionMain}>
				{/* Section title */}
				<p className={styles.comHeaderTitle}>Request to Join Community</p>
				{/* List of requestables */}
				<AvailableRequestOption />
			</div>
			{/* Section 3 */}
			<div className={styles.comReqSectionMain}>
				{/* Section title */}
				<p className={styles.comHeaderTitle}>Create New Community</p>
				<p className={styles.comBottomP}>
					Please contact the app creator Jacob Eades to create a new community.
				</p>
			</div>
			<ComDetailDrawer
				cdMenuOpen={cdMenuOpen}
				comDetailMenu={comDetailMenu}
				comData={comData}
				handleSubmit={handleSubmit}
			/>
		</main>
	);
}
