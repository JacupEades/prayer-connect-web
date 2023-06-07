import React, { useEffect } from "react";
import styles from "@/styles/Settings.module.css";
import admin from "@/styles/AdminPages.module.css";
import router from "next/router";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import SettingsHeaders from "@/components/overlays/SettingsHeaders";
import { useQuery } from "react-query";
import HomeSectionLoading from "@/components/loading/home/HomeSectionLoading";
import HomeSectionError from "@/components/loading/home/HomeSectionError";
import HomeSectionUidError from "@/components/loading/home/HomeSectionUidError";
import { deleteComRequest, getComRequests } from "@/lib/comRequestHelper";
import { getUsers, updateUser } from "@/lib/userHelper";

export default function UserRequests() {
	const { user } = useSelector((state: any) => ({
		...state,
	}));

	useEffect(() => {
		console.log(
			"user.email",
			user.email === "jwae98@gmail.com" ||
				user.email === "jacob.wa.eades@gmail.com"
		);
		if (
			user.email === "jwae98@gmail.com" ||
			user.email === "jacob.wa.eades@gmail.com"
		) {
			console.log("welcome");
		} else {
			router.push("/home");
		}
	}, [user]);

	const {
		isLoading: comRequestsLoading,
		isError: comRequestsIsError,
		data: comRequestsData,
		refetch,
	} = useQuery("comRequests", getComRequests);

	const {
		isLoading: userLoading,
		isError: userIsError,
		data: userData,
	} = useQuery("users", getUsers);

	if (comRequestsLoading || userLoading) return <HomeSectionLoading />;
	if (comRequestsIsError || userIsError) return <HomeSectionError />;
	if (
		user.email === "jwae98@gmail.com" ||
		user.email === "jacob.wa.eades@gmail.com"
	) {
		console.log("welcome");
	} else {
		return <HomeSectionUidError />;
	}

	const handleAccept = async (currentReq: any) => {
		const { _id, uid, abbreviation, comName } = currentReq;
		const currentUserData = await userData.filter((obj: any) => {
			if (obj.uid === uid) {
				return obj;
			} else {
				return;
			}
		});
		const emailLink = `mailto:${currentUserData[0].email}`;
		window.location.href = emailLink;

		// update Database
		const userRequestingID = `?userId=${currentUserData[0]._id}`;
		const formData = {
			prayerCounts: [{ prayerId: "", count: 0 }],
			addUndo: false,
			updated: "",
			newCommunity: { abbreviation, comName },
			newDisplayName: "",
			putType: "newCommunity",
		};

		await updateUser(userRequestingID, formData);

		refetch();
		handleDecline(_id);
	};
	const handleDecline = (comReqId: string) => {
		deleteComRequest(comReqId);
		refetch();
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
								<Button
									onClick={() => handleAccept(obj)}
									className={admin.existIndexBtnA}>
									Accept
								</Button>
								<Button
									onClick={() => handleDecline(obj._id)}
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
