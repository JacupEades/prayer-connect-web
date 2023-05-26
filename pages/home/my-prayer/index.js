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
import { updateUser } from "@/lib/userHelper";
import { getUsers } from "@/lib/userHelper";
import ReplayIcon from "@mui/icons-material/Replay";
import MyPrayerLoading from "@/components/loading/prayer/MyPrayerLoading";
import HomeSectionError from "@/components/loading/home/HomeSectionError";
import HomeSectionUidError from "@/components/loading/home/HomeSectionUidError";

export default function MyPrayerView() {
	const [selection, setSelection] = useState("Details");
	const [prayerCounts, setPrayerCounts] = useState(0);
	const { prayer, user } = useSelector((state) => ({
		...state,
	}));
	const router = useRouter();
	const dispatch = useDispatch();

	const {
		isLoading: prayerLoading,
		isError: prayerIsError,
		data: prayerData,
	} = useQuery("prayers", getPrayers);
	const {
		isLoading: userLoading,
		isError: userIsError,
		data: userData,
		refetch,
	} = useQuery("users", getUsers);

	const userId = user.uid;
	const prayerId = prayer.prayerId;
	const currentDate = new Date().toISOString();
	let displayNum = 0;
	let prayedDate = "";

	useEffect(() => {
		if (prayerId === "" || userId === "") {
			toast.error(
				"Prayer Id or user Id missing, sending you back to the home page."
			);
			router.push("/home");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router]);

	// Data validation loading, error, and redux store uid
	if (prayerLoading || userLoading) return <MyPrayerLoading />;
	if (prayerIsError || userIsError) return <HomeSectionError />;
	if (user.uid === "") return <HomeSectionUidError />;
	if (prayerId === "") return <MyPrayerLoading />;

	const objectWithId = prayerData.find((obj) => obj._id === prayerId);

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

	const currentUserData = userData.filter((obj) => {
		if (obj.uid === user.uid) {
			return obj;
		} else if (obj.email === user.email) {
			return obj;
		} else {
			return;
		}
	});

	const uData = currentUserData;

	const userPrayerCount = () => {
		currentUserData.length > 0
			? currentUserData[0].prayerCounts.filter((userPCObj) => {
					if (userPCObj.prayerId === prayerId) {
						displayNum = userPCObj.count;
					}
			  })
			: (displayNum = 0);
	};

	const userPrayedDate = () => {
		uData[0].prayerCounts.filter((userPCObj) => {
			if (userPCObj.prayerId === prayerId) {
				prayedDate = userPCObj.updated;
			}
		});
	};

	const prayerBtnclicked = async () => {
		if (prayerCounts > 0) {
			console.log("You already prayed for this once.");
			return;
		}
		setPrayerCounts(1);
		const userDBId = `?userId=${uData[0]._id}`;
		const formData = {
			prayerCounts: [{ prayerId: prayerId, count: 1 }],
			addUndo: false,
			updated: currentDate,
			newCommunity: "",
			putType: "prayerCount",
		};
		await updateUser(userDBId, formData);
		refetch();
		userPrayerCount();
		userPrayedDate();
	};

	const undoBtnclicked = async () => {
		setPrayerCounts(0);

		const userDBId = `?userId=${uData[0]._id}`;
		const formData = {
			prayerCounts: [{ prayerId: prayerId, count: 1 }],
			addUndo: true,
			updated: currentDate,
			newCommunity: "",
			putType: "prayerCount",
		};

		await updateUser(userDBId, formData);
		refetch();
		userPrayerCount();
		userPrayedDate();
	};

	const componentSelector = (selection) => {
		switch (selection) {
			case "Details":
				return (
					<Details
						detail={objectWithId?.message.replace(/\\n/g, "<br>") || ""}
					/>
				);
			case "Edit":
				return "";
			case "Stats":
				userPrayerCount();
				userPrayedDate();
				return (
					<Stats
						answered={objectWithId?.answered || null}
						personal={objectWithId?.personal || null}
						createdAt={objectWithId?.createdAt || ""}
						prayedDate={prayedDate}
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
