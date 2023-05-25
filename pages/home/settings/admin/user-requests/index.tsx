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

export default function UserRequests() {
	const [comName, setComName] = useState("");
	const [abbreviation, setAbbreviation] = useState("");
	const [formData, setFormData] = useState({
		name: comName,
		abbreviation: abbreviation,
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
		});
	}, [comName, abbreviation]);

	const {
		isLoading: communitiesLoading,
		isError: communitiesIsError,
		data: communitiesData,
	} = useQuery("communities", getCommunities);

	if (communitiesLoading) return <HomeSectionLoading />;
	if (communitiesIsError) return <HomeSectionError />;
	if (user.email !== "jwae98@gmail.com") return <HomeSectionUidError />;

	const MyButton = styled(Button)(({ theme }) => ({
		"&.Mui-disabled": {
			color: "var(--sys-light-on-surface-variant)",
			backgroundColor: "var(--disable-light-primary)",
		},
	}));

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
			}
			console.log("Form submit request made:", formData);
		} catch (error) {
			console.log("Error");
		}
	};

	const resetForm = () => {
		setComName("");
		setAbbreviation("");
		setFormData({ name: "", abbreviation: "" });
		console.log("Form reset");
	};

	return (
		<main className={styles.main}>
			<SettingsHeaders title="Pending User Requests" />
			{/* Existing Communities Display */}
			<div className={admin.existMain}>
				<article className={admin.existIndexTitle}>
					<div>Requests</div>
				</article>
				<article className={admin.existIndex}>
					<div className={admin.existIndexL}>Name</div>
					<div className={admin.existIndexM}>Community</div>
					<div className={admin.existIndexR}>Options</div>
				</article>
				{communitiesData.map((obj: any, i: React.Key | null | undefined) => {
					return (
						<article className={admin.existIndex} key={i}>
							<div className={admin.existIndexL}>{obj.name}</div>
							<div className={admin.existIndexM}>{obj.abbreviation}</div>
							<div className={admin.existIndexOptions}>
								<Button className={admin.existIndexBtnA}>A</Button>
								<Button className={admin.existIndexBtnB}>D</Button>
							</div>
						</article>
					);
				})}
			</div>
		</main>
	);
}
