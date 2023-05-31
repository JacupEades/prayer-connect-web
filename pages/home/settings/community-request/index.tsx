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
import { getUsers } from "@/lib/userHelper";
import HomeSectionLoading from "@/components/loading/home/HomeSectionLoading";
import HomeSectionError from "@/components/loading/home/HomeSectionError";
import HomeSectionUidError from "@/components/loading/home/HomeSectionUidError";

export default function CommunityRequest() {
	const { user } = useSelector((state: any) => ({
		...state,
	}));
	const defaultOption = {
		value: "",
		label: "Select Community",
	};
	const [selectedOption, setSelectedOption] = useState(defaultOption);
	const [formData, setFormData] = useState({
		uid: user.uid,
		name: user.name,
		abbreviation: selectedOption.value,
		comName: selectedOption.label,
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
			comName: selectedOption.label,
		});
	}, [selectedOption.label, selectedOption.value, user.name, user.uid]);

	const {
		isLoading: userLoading,
		isError: userIsError,
		data: userData,
	} = useQuery("users", getUsers);

	const handleOptionSelect = (option: any) => {
		const dbComName = option.name;
		const dbComAbbreviation = option.abbreviation;
		setSelectedOption({ value: dbComAbbreviation, label: dbComName });
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

	if (comRequestsLoading || communitiesLoading || userLoading)
		return <HomeSectionLoading />;
	if (comRequestsIsError || communitiesIsError || userIsError)
		return <HomeSectionError />;
	if (user.email !== "jwae98@gmail.com") return <HomeSectionUidError />;

	const listStyle = (abb: string) => {
		return {
			backgroundColor:
				formData.abbreviation === abb ? "var(--sys-light-primary)" : "",
			color: formData.abbreviation === abb ? "var(--sys-light-on-primary)" : "",
		};
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
		setFormData({
			uid: user.uid,
			name: user.name,
			abbreviation: "",
			comName: "",
		});
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
				<div className={styles.requestFormMain}>
					{communitiesData
						.filter((obj: any) => obj.abbreviation !== "G" && userData[0])
						.map((communitiesData: any) => (
							<div
								className={styles.requestForm}
								style={listStyle(communitiesData.abbreviation)}
								key={communitiesData.abbreviation}
								onClick={() => handleOptionSelect(communitiesData)}>
								{communitiesData.abbreviation}: {communitiesData.name}
							</div>
						))}
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
							Request {formData.abbreviation}
						</MyButton>
					</div>
				</div>
			</form>
		</main>
	);
}
