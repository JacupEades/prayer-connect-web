import React, { useEffect, useState } from "react";
import styles from "@/styles/Settings.module.css";
import formStyle from "@/styles/PrayerPage.module.css";
import admin from "@/styles/AdminPages.module.css";
import router from "next/router";
import { Button, TextField, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SettingsHeaders from "@/components/overlays/SettingsHeaders";
import { addCommunity } from "@/lib/communityHelper";
import { useQuery } from "react-query";
import { getCommunities } from "@/lib/communityHelper";
import HomeSectionLoading from "@/components/loading/home/HomeSectionLoading";
import HomeSectionError from "@/components/loading/home/HomeSectionError";
import HomeSectionUidError from "@/components/loading/home/HomeSectionUidError";
import SettingsNavCard from "@/components/cards/SettingsNavCard";
import AlarmAddIcon from "@mui/icons-material/AlarmAdd";

export default function CommunityManagement() {
	const [comName, setComName] = useState("");
	const [abbreviation, setAbbreviation] = useState("");
	const [description, setDescription] = useState("");
	const [formData, setFormData] = useState({
		name: comName,
		abbreviation: abbreviation,
		description: description,
	});
	const { user } = useSelector((state: any) => ({
		...state,
	}));
	const dispatch = useDispatch();

	useEffect(() => {
		if (user.email !== "jwae98@gmail.com") {
			router.push("/home");
		}
	}, [user]);

	useEffect(() => {
		setFormData({
			name: comName,
			abbreviation: abbreviation,
			description: description,
		});
	}, [comName, abbreviation, description]);

	const {
		isLoading: communitiesLoading,
		isError: communitiesIsError,
		data: communitiesData,
	} = useQuery("communities", getCommunities);

	if (communitiesLoading) return <HomeSectionLoading />;
	if (communitiesIsError) return <HomeSectionError />;
	if (user.email !== "jwae98@gmail.com" || "jacpb.wa.eades@gmail.com") return <HomeSectionUidError />;

	const MyButton = styled(Button)(({ theme }) => ({
		"&.Mui-disabled": {
			color: "var(--sys-light-on-surface-variant)",
			backgroundColor: "var(--disable-light-primary)",
		},
	}));

	const resetForm = () => {
		setComName("");
		setAbbreviation("");
		setDescription("");
		setFormData({ name: "", abbreviation: "", description: "" });
		console.log("Form reset");
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		const nameDupCheck = communitiesData.find(
			(coms: { name: string }) => coms.name === formData.name
		);
		const abbDupCheck = communitiesData.find(
			(coms: { abbreviation: string }) =>
				coms.abbreviation === formData.abbreviation
		);

		console.log("nameDupCheck", nameDupCheck);
		console.log("abbDupCheck", abbDupCheck);

		try {
			if (nameDupCheck || abbDupCheck) {
				console.log("nameDupCheck or abbDupCheck not unique");
			} else {
				addCommunity(formData);
				resetForm();
				console.log("Form submit request success:", formData);
			}
			console.log("Form submit request made:", formData);
		} catch (error) {
			console.log("Error");
		}
	};

	return (
		<main className={styles.main}>
			<SettingsHeaders title="Community Management" />
			{/* Pending user requests */}
			<SettingsNavCard
				icon={<AlarmAddIcon />}
				text={"Pending user requests"}
				route={"/home/settings/admin/user-requests"}
			/>
			{/* Existing Communities Display */}
			<div className={admin.existMain}>
				<article className={admin.existIndexTitle}>
					<div>Existing Communities</div>
				</article>
				<article className={admin.existIndex}>
					<div>Name</div>
					<div>Abbreviation</div>
				</article>
				{communitiesData.map((obj: any, i: React.Key | null | undefined) => {
					return (
						<article className={admin.existIndex} key={i}>
							<div>{obj.name}</div>
							<div>{obj.abbreviation}</div>
						</article>
					);
				})}
			</div>
			{/* New Community Form */}
			<form onSubmit={handleSubmit} className={formStyle.editFormContainer}>
				{/* Title */}
				<h2 className={admin.formTitle}>Add New Community</h2>
				{/* Community Name */}
				<TextField
					multiline
					className={formStyle.title}
					sx={{
						"& .MuiInputLabel-root.Mui-focused": {
							color: "var(--sys-light-primary)",
						},
						"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
							{
								borderColor: "var(--sys-light-primary)",
							},
					}}
					id="comName"
					label="Community Name"
					onChange={(N) => setComName(N.target.value)}
					value={comName}
				/>
				{/* Community Abbreviation */}
				<TextField
					multiline
					className={formStyle.detailText}
					sx={{
						"& .MuiInputLabel-root.Mui-focused": {
							color: "var(--sys-light-primary)",
						},
						"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
							{
								borderColor: "var(--sys-light-primary)",
							},
					}}
					id="abbreviation"
					label="Abbreviation"
					onChange={(A) => setAbbreviation(A.target.value)}
					value={abbreviation}
				/>
				<TextField
					multiline
					className={formStyle.detailText}
					sx={{
						"& .MuiInputLabel-root.Mui-focused": {
							color: "var(--sys-light-primary)",
						},
						"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
							{
								borderColor: "var(--sys-light-primary)",
							},
					}}
					id="description"
					label="Description"
					onChange={(D) => setDescription(D.target.value)}
					value={description}
				/>
				{/* Cancel and Save button */}
				<div className={admin.topBtnsMain}>
					<div className={formStyle.topBtns}>
						<Button onClick={() => resetForm()} className={formStyle.optionBtn}>
							Reset
						</Button>
						<MyButton
							disabled={comName === "" || abbreviation === ""}
							type="submit"
							className={formStyle.optionBtnPublish}>
							Add
						</MyButton>
					</div>
				</div>
			</form>
		</main>
	);
}
