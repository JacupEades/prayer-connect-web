import React, { useEffect, useState } from "react";
import styles from "@/styles/PrayerPage.module.css";
import cardStyles from "@/styles/Components.module.css";
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
import { updateUserPrayerCount } from "@/lib/userHelper";
import { getUsers } from "@/lib/userHelper";
import ReplayIcon from "@mui/icons-material/Replay";

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
	const [prayerCounts, setPrayerCounts] = useState(0);
	const { prayer, user } = useSelector((state: any) => ({
		...state,
	}));
	const router = useRouter();
	const dispatch = useDispatch();
	const { isLoading, isError, data, error }: any = useQuery(
		"prayer",
		getPrayers
	);
	const {
		data: userData,
		isLoading: userLoading,
		isError: userIsError,
		refetch,
	}: any = useQuery("users", getUsers);

	const userId = user.uid;
	const prayerId = prayer.prayerId;
	let displayNum = 0;

	useEffect(() => {
		if (prayerId === "" || userId === "") {
			toast.error(
				"Prayer Id or user Id missing, sending you back to the home page."
			);
			router.push("/home");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	if (isLoading || userLoading)
		return <div className={styles.loadingOrError}>Prayers are Loading...</div>;
	if (isError || userIsError)
		return (
			<div className={styles.loadingOrError}>
				Prayers being loaded error {error}
			</div>
		);
	if (user.uid === "")
		return (
			<div className={styles.loadingOrError}>
				Please log in to view players. {error}
			</div>
		);

	const objectWithId = data.find(
		(obj: { _id: string }) => obj._id === prayerId
	);

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

	const EditButton = () => {
		if (objectWithId?.userId !== userId) {
			return null;
		}
		return (
			<div className={styles.selectBtnContainer}>
				<Button
					onClick={() => {
						router.push("/home/my-prayer/prayer-edit");
						setSelection("Edit");
					}}
					className={styles.selectBtn}>
					<CreateOutlinedIcon />
				</Button>
				<div
					className={
						selection === "Edit" ? styles.block : styles.blockHover
					}></div>
			</div>
		);
	};

	const currentUserData = () =>
		userData.filter((obj: { uid: string }) => {
			// console.log(obj.uid, user.uid);
			if (obj.uid === user.uid) return obj;
		});

	const uData = currentUserData();

	const userPrayerCount = () => {
		uData[0].prayerCounts.filter(
			(userPCObj: { prayerId: string; count: number }) => {
				if (userPCObj.prayerId === prayerId) {
					displayNum = userPCObj.count;
				}
			}
		);
	};

	const prayerBtnclicked = async () => {
		if (prayerCounts > 0) {
			console.log("You already prayed for this once.");
			return;
		}
		setPrayerCounts(1);
		console.log("displayNum", displayNum);
		const userDBId = `?userId=${uData[0]._id}`;
		const formData = {
			prayerCounts: [{ prayerId: prayerId, count: 1 }],
			addUndo: false,
		};
		await updateUserPrayerCount(userDBId, formData);
		refetch();
		userPrayerCount();
	};

	const undoBtnclicked = async () => {
		setPrayerCounts(0);

		const userDBId = `?userId=${uData[0]._id}`;
		const formData = {
			prayerCounts: [{ prayerId: prayerId, count: 1 }],
			addUndo: true,
		};

		await updateUserPrayerCount(userDBId, formData);
		refetch();
		userPrayerCount();
	};

	const componentSelector = (selection: String) => {
		switch (selection) {
			case "Details":
				return <Details detail={objectWithId?.message || ""} />;
			case "Edit":
				return "";
			case "Stats":
				userPrayerCount();
				return (
					<Stats
						answered={objectWithId?.answered || null}
						personal={objectWithId?.personal || null}
						createdAt={objectWithId?.createdAt || ""}
						displayNum={displayNum}
						name={objectWithId?.name || ""}
					/>
				);
			default:
				console.log("You broke my app, C'mon!");
		}
	};

	return (
		<main className={styles.prayerMain}>
			{/* Back arrow and pray button */}
			<div className={styles.topBtns}>
				<Button onClick={() => handleBack()} className={styles.backArrowBtn}>
					<ArrowBackOutlinedIcon />
				</Button>
				{objectWithId?.answered ? (
					<></>
				) : prayerCounts > 0 ? (
					<div className={cardStyles.undoContainer}>
						<p>Prayed!</p>
						<Button
							onClick={undoBtnclicked}
							variant="contained"
							className={cardStyles.undoBtn}>
							<ReplayIcon className={cardStyles.undoBtnIcon} />
						</Button>
					</div>
				) : (
					<Button
						onClick={prayerBtnclicked}
						variant="contained"
						className={cardStyles.prayBtn}>
						<FaPray className={cardStyles.prayBtnIcon} />
					</Button>
				)}
			</div>
			{/* Title */}
			<h1 className={styles.title}>{objectWithId?.title || ""}</h1>
			{/* Content */}
			<section>
				{/* Two buttons and edit */}
				<div className={styles.viewSelectBtnContainer}>
					<div className={styles.leftTwoBtns}>
						<div className={styles.selectBtnContainer}>
							<Button
								onClick={() => setSelection("Details")}
								className={styles.selectBtn}>
								Details
							</Button>
							<div
								className={
									selection === "Details" ? styles.block : styles.blockHover
								}></div>
						</div>
						<div className={styles.selectBtnContainer}>
							<Button
								onClick={() => setSelection("Stats")}
								className={styles.selectBtn}>
								Stats
							</Button>
							<div
								className={
									selection === "Stats" ? styles.block : styles.blockHover
								}></div>
						</div>
					</div>
					{/* {objectWithId?.userId !== userId <><></> : ""} */}
					<EditButton />
				</div>
				{componentSelector(selection)}
			</section>
		</main>
	);
}
