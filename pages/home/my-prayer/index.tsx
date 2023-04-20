import React, { useEffect, useState } from "react";
import styles from "@/styles/PrayerPage.module.css";
import { Button } from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { FaPray } from "react-icons/fa";
import Stats from "../../../components/prayer_view/Stats";
import Details from "@/components/prayer_view/Details";
import { useRouter } from "next/router";
import { getPrayers } from "../../../lib/prayerHelper";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { prayerById } from "@/redux/slices/prayerSlice";
import { toast } from "react-toastify";

type Props = {
	objectWithId: {
		name: string;
		title: string;
		message: string;
		prayerNumber: number;
		answered: boolean;
		personal: boolean;
		createdAt: string;
	};
};

export default function MyPrayerView({}: Props) {
	const [selection, setSelection] = useState("Details");
	const { prayer } = useSelector((state: any) => ({
		...state,
	}));
	const router = useRouter();
	const dispatch = useDispatch();
	const { isLoading, isError, data, error }: any = useQuery(
		"prayer",
		getPrayers
	);
	const prayerId = prayer.prayerId;
	// Temporary fix
	// If the prayer ID didn't load
	useEffect(() => {
		if (prayerId === "") {
			toast.error("Prayer Id missing, sending you back to the home page.");
			router.push("/home");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	if (isLoading)
		return <div className={styles.loadingOrError}>Prayers are Loading...</div>;
	if (isError)
		return (
			<div className={styles.loadingOrError}>
				Prayers being loaded error {error}
			</div>
		);

	const objectWithId = data.find(
		(obj: { _id: string }) => obj._id === prayerId
	);

	const componentSelector = (selection: String) => {
		switch (selection) {
			case "Details":
				return <Details detail={objectWithId?.message || ""} />;
			case "Stats":
				return (
					<Stats
						answered={objectWithId?.answered || null}
						personal={objectWithId?.personal || null}
						createdAt={objectWithId?.createdAt || ""}
						prayedFor={objectWithId?.prayedFor || 0}
						name={objectWithId?.name || ""}
					/>
				);
			default:
				console.log("You broke my app, C'mon!");
		}
	};

	const handleBack = async () => {
		// Redux store
		dispatch(
			prayerById({
				prayerId: "",
				uid: "",
			})
		);
		router.back();
	};

	return (
		<main className={styles.prayerMain}>
			{/* Back arrow and pray button */}
			<div className={styles.topBtns}>
				<Button onClick={() => handleBack()} className={styles.backArrowBtn}>
					<ArrowBackOutlinedIcon />
				</Button>
				<Button variant="contained" className={styles.prayBtn}>
					<FaPray className={styles.prayBtnIcon} />
				</Button>
			</div>
			{/* Title */}
			<h1 className={styles.title}>{objectWithId?.title || ""}</h1>
			{/* Content */}
			<section>
				{/* Two buttons and edit */}
				<div className={styles.viewSelectBtnContainer}>
					<div>
						<Button
							onClick={() => setSelection("Details")}
							className={styles.selectBtn}>
							Details
						</Button>
						<Button
							onClick={() => setSelection("Stats")}
							className={styles.selectBtn}>
							Stats
						</Button>
					</div>
					<Button
						onClick={() => router.push("/home/my-prayer/prayer-edit")}
						className={styles.selectBtn}>
						<CreateOutlinedIcon />
					</Button>
				</div>
				{componentSelector(selection)}
			</section>
		</main>
	);
}
