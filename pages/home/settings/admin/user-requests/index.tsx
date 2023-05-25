import React, { useEffect, useState } from "react";
import styles from "@/styles/Settings.module.css";
import admin from "@/styles/AdminPages.module.css";
import router from "next/router";
import { Button, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SettingsHeaders from "@/components/overlays/SettingsHeaders";
import { addCommunity } from "@/lib/communityHelper";
import { useQuery } from "react-query";
import HomeSectionLoading from "@/components/loading/home/HomeSectionLoading";
import HomeSectionError from "@/components/loading/home/HomeSectionError";
import HomeSectionUidError from "@/components/loading/home/HomeSectionUidError";
import { getComRequests } from "@/lib/comRequestHelper";

export default function UserRequests() {
	const { user } = useSelector((state: any) => ({
		...state,
	}));
	const dispatch = useDispatch();

	useEffect(() => {
		if (user.email !== "jwae98@gmail.com") {
			router.push("/home");
		}
	}, [user]);

	const {
		isLoading: comRequestsLoading,
		isError: comRequestsIsError,
		data: comRequestsData,
		refetch,
	} = useQuery("comRequests", getComRequests);

	if (comRequestsLoading) return <HomeSectionLoading />;
	if (comRequestsIsError) return <HomeSectionError />;
	if (user.email !== "jwae98@gmail.com") return <HomeSectionUidError />;

	const handleAccept = () => {
		console.log("btn pressed");
	};
	const handleDecline = () => {
		console.log("btn pressed");
	};

	return (
		<main className={styles.main}>
			<SettingsHeaders title="Pending User Requests" />
			{/* Existing Communities Display */}
			<div className={admin.existMain}>
				<article className={admin.existIndexTitle}>
					<div>Requests</div>
				</article>
				<article className={admin.existIndexU}>
					<div className={admin.existIndexL}>Name</div>
					<div className={admin.existIndexM}>Community</div>
					<div className={admin.existIndexR}>Options</div>
				</article>
				{comRequestsData.map((obj: any, i: React.Key | null | undefined) => {
					return (
						<article className={admin.existIndexU} key={i}>
							<div className={admin.existIndexL}>{obj.name}</div>
							<div className={admin.existIndexM}>{obj.abbreviation}</div>
							<div className={admin.existIndexOptions}>
								<Button onClick={handleAccept} className={admin.existIndexBtnA}>
									Accept
								</Button>
								<Button
									onClick={handleDecline}
									className={admin.existIndexBtnB}>
									Decline
								</Button>
							</div>
						</article>
					);
				})}
			</div>
		</main>
	);
}
