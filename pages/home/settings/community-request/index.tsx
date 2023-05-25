import React, { useEffect, useState } from "react";
import styles from "@/styles/Settings.module.css";
import formStyle from "@/styles/PrayerPage.module.css";
import admin from "@/styles/AdminPages.module.css";
import router from "next/router";
import { Button, styled } from "@mui/material";
import { getCommunities } from "@/lib/communityHelper";
import { useDispatch, useSelector } from "react-redux";
import SettingsHeaders from "@/components/overlays/SettingsHeaders";
import { useQuery } from "react-query";
import { addComRequest, getComRequests } from "@/lib/comRequestHelper";
import HomeSectionLoading from "@/components/loading/home/HomeSectionLoading";
import HomeSectionError from "@/components/loading/home/HomeSectionError";
import HomeSectionUidError from "@/components/loading/home/HomeSectionUidError";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function CommunityRequest() {
	const { user } = useSelector((state: any) => ({
		...state,
	}));
	const defaultOption = {
		value: "",
		label: "Select Community",
	};
	const [selectedOption, setSelectedOption] = useState(defaultOption);
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState({
		uid: user.uid,
		name: user.name,
		abbreviation: selectedOption.value,
	});
	const dispatch = useDispatch();

	useEffect(() => {
		if (user.uid === "") {
			router.push("/login/existing-user");
		}
	}, [user]);

	useEffect(() => {
		setFormData({
			uid: user.uid,
			name: user.name,
			abbreviation: selectedOption.value,
		});
	}, [selectedOption.value, user.name, user.uid]);
	const iconStyles = {
		transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
		transition: "transform 0.25s ease-in-out",
	};

	const handleOptionSelect = (option: any) => {
		const dbComName = option.name;
		const dbComAbbreviation = option.abbreviation;
		setSelectedOption({ value: dbComAbbreviation, label: dbComName });
		setIsOpen(false);
	};

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

	if (comRequestsLoading || communitiesLoading) return <HomeSectionLoading />;
	if (comRequestsIsError || communitiesIsError) return <HomeSectionError />;
	if (user.email !== "jwae98@gmail.com") return <HomeSectionUidError />;

	const dropdownStyles = {
		maxHeight: isOpen ? `${communitiesData.length * 40}px` : "0",
		transition: "max-height 0.3s ease",
		overflow: "hidden",
	};
	const MyButton = styled(Button)(({ theme }) => ({
		"&.Mui-disabled": {
			color: "var(--sys-light-on-surface-variant)",
			backgroundColor: "var(--disable-light-primary)",
		},
	}));

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		try {
			if (user.uid === "") {
				console.log("nameDupCheck or abbDupCheck not unique");
			} else {
				addComRequest(formData);
				refetch();
			}
		} catch (error) {
			console.log("Error");
		}
	};

	const resetForm = () => {
		setSelectedOption(defaultOption);
		setFormData({ uid: user.uid, name: user.name, abbreviation: "" });
		console.log("Form reset");
	};

	return (
		<main className={styles.main}>
			<SettingsHeaders title="Community Requests" />
			{/* Existing Communities Display */}
			<div className={admin.existMain}>
				<article className={admin.existIndexTitle}>
					<div>Outgoing Requests</div>
				</article>
				<article className={admin.existIndex}>
					<div className={admin.existIndexL}>User</div>
					<div className={admin.existIndexR}>Community</div>
				</article>
				{comRequestsData
					.filter((obj: any) => {
						if (obj.uid === user.uid) {
							return obj;
						}
					})
					.map((obj: any, i: React.Key | null | undefined) => {
						return (
							<article className={admin.existIndex} key={i}>
								<div className={admin.existIndexL}>{obj.name}</div>
								<div className={admin.existIndexR}>{obj.abbreviation}</div>
							</article>
						);
					})}
			</div>
			{/* New Community Form */}
			<form onSubmit={handleSubmit} className={formStyle.editFormContainer}>
				{/* Title */}
				<div>
					<h2 className={admin.formTitle}>Community Request Form</h2>
					<p className={admin.formInstro}>
						Select the Community by thier Abbreviation to send a request.
					</p>
				</div>
				{/* Display Name sending Request */}
				<p className={admin.formUserName}>
					Name in Request: <span>{user.name}</span>
				</p>
				{/* Community Abbreviation */}
				<div className={styles.dropdownMain}>
					<button
						className={styles.dropdownToggle}
						onClick={(e: any) => {
							e.preventDefault(), setIsOpen(!isOpen);
						}}>
						{selectedOption.label}
						<KeyboardArrowDownIcon style={iconStyles} />
					</button>
					<ul style={dropdownStyles}>
						{communitiesData.map((communitiesData: any) => (
							<li
								key={communitiesData.abbreviation}
								onClick={() => handleOptionSelect(communitiesData)}>
								{communitiesData.abbreviation}: {communitiesData.name}
							</li>
						))}
					</ul>
				</div>
				{/* Cancel and Save button */}
				<div className={admin.topBtnsMain}>
					<div className={formStyle.topBtns}>
						<Button onClick={() => resetForm()} className={formStyle.optionBtn}>
							Reset
						</Button>
						<MyButton
							disabled={formData.abbreviation === ""}
							type="submit"
							className={formStyle.optionBtnPublish}>
							Send Request
						</MyButton>
					</div>
				</div>
			</form>
		</main>
	);
}
