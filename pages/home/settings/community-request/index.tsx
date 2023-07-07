import React, { useEffect, useState } from "react";
import styles from "@/styles/Settings.module.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button } from "@mui/material";
import { getCommunities } from "@/lib/communityHelper";
import { useDispatch, useSelector } from "react-redux";
import SettingsHeaders from "@/components/overlays/SettingsHeaders";
import { useQuery } from "react-query";
import {
	addComRequest,
	deleteComRequest,
	getComRequests,
} from "@/lib/comRequestHelper";
import { getUsers, updateUser } from "@/lib/userHelper";
import HomeSectionLoading from "@/components/loading/home/HomeSectionLoading";
import HomeSectionError from "@/components/loading/home/HomeSectionError";
import { FormControl, FormControlLabel, RadioGroup } from "@mui/material";
import headerStyles from "@/styles/Header.module.css";
import Radio from "@mui/material/Radio";
import { useRouter } from "next/router";
import { changeCommunity } from "@/redux/slices/communitySlice";
import ComDetailDrawer from "@/components/forms/ComDetailDrawer";
import CloseIcon from "@mui/icons-material/Close";

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedOption]);

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

	const handleSubmit = async () => {
		if (comData) {
			await addComRequest({
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

	const handleDecline = async (comReqId: string) => {
		await deleteComRequest(comReqId);
		refetch();
	};

	const UserComMap = () => {
		if (currentUserData.length === 0) {
			return <p style={{ color: "red" }}>User Data Did Not Load Correctly</p>;
		} else {
			return (
				currentUserData[0] &&
				currentUserData[0]?.approvedCommunities?.map((communitiesData: any) => {
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
			return communitiesData.some((community: any) => {
				return community.abbreviation === comRequest.abbreviation;
			});
		});

		const availableCommunities = communitiesData.filter((obj: any) => {
			return requestPendingCheck.every((comRequest: any) => {
				return (
					obj._id !== currentUserData[0]?.approvedCommunities[0]?._id &&
					obj.abbreviation !== comRequest.abbreviation
				);
			});
		});

		const requestPendingCheckByUser = requestPendingCheck.filter(
			(comRequest: any) => {
				// Check if any object in communitiesData has the same abbreviation
				return comRequest.uid === user.uid;
			}
		);
		const reqLength = availableCommunities.filter((obj: any) => {
			const hasMatchingAbbreviation =
				currentUserData[0]?.approvedCommunities?.some(
					(community: any) => community.abbreviation === obj.abbreviation
				);
			return obj.abbreviation !== "G" && !hasMatchingAbbreviation;
		});
		const pendingLength = requestPendingCheckByUser.filter((obj: any) => {
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
		});

		return (
			<>
				{reqLength.length === 0 ? (
					<></>
				) : (
					<p className={styles.comHeaderTitle}>Request to Join Community</p>
				)}
				{availableCommunities &&
					availableCommunities
						.filter((obj: any) => {
							const hasMatchingAbbreviation =
								currentUserData[0]?.approvedCommunities?.some(
									(community: any) =>
										community.abbreviation === obj.abbreviation
								);
							return obj.abbreviation !== "G" && !hasMatchingAbbreviation;
						})
						.map((communitiesData: any) => {
							return (
								<div
									className={styles.settingsBtnContainer}
									key={communitiesData.abbreviation}>
									<Button
										className={styles.settingsBtn}
										onClick={() => handleRequestBtn(communitiesData)}>
										<div className={styles.settingsBtnLeft}>
											<div className={styles.settingsBtnText}>
												{communitiesData.name}
											</div>
										</div>
										<NavigateNextIcon />
									</Button>
								</div>
							);
						})}
				{/* New Section */}
				{pendingLength.length === 0 ? (
					<></>
				) : (
					<p
						className={styles.comHeaderTitle}
						style={{ paddingTop: "1.25rem" }}>
						Pending Requests
					</p>
				)}
				{requestPendingCheckByUser &&
					requestPendingCheckByUser
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
							<div key={communitiesData.abbreviation}>
								<div className={styles.settingsBtnContainer}>
									<Button
										className={styles.settingsBtn}
										onClick={() => handleDecline(communitiesData._id)}>
										<div className={styles.settingsBtnLeft}>
											<div className={styles.settingsBtnText}>
												{communitiesData.comName}
											</div>
										</div>
										<CloseIcon />
									</Button>
								</div>
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
