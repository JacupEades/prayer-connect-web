import React, { useState, useEffect } from "react";
import styles from "@/styles/PrayerPage.module.css";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import GroupsIcon from "@mui/icons-material/Groups";
import LockIcon from "@mui/icons-material/Lock";
import { BsIncognito } from "react-icons/bs";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import { addPrayer } from "../../../lib/prayerHelper";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

type Props = {};

export default function NewPrayer({}: Props) {
	const [title, setTitle] = useState("");
	const [detail, setDetail] = useState("");
	const [postIn, setPostIn] = useState(true);
	const [postAs, setPostAs] = useState(false);
	const [prayerStatus, setPrayerStatus] = useState(false);
	const [formData, setFormData] = useState({
		userId: null,
		name: postAs,
		title: title,
		message: detail,
		prayedFor: 0,
		prayerNumber: 0,
		answered: prayerStatus,
		personal: true,
		approved: false,
	});
	const { persistedUserReducer } = useSelector((state: any) => ({
		...state,
	}));

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const userId = () => {
		return persistedUserReducer.uid;
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const displayName = () => {
		if (postAs === true) {
			return persistedUserReducer.name;
		} else {
			return "Anonymous";
		}
	};

	useEffect(() => {
		setFormData({
			userId: userId(),
			name: displayName(),
			title: title,
			message: detail,
			prayedFor: 0,
			prayerNumber: 0,
			answered: prayerStatus,
			personal: true,
			approved: false,
		});
	}, [title, detail, postIn, postAs, prayerStatus, userId, displayName]);
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (detail.length > 2000) {
			return toast.error("Prayer detail is to long.");
		}
		if (userId() && title && detail) {
			await addPrayer(formData);
			toast.success("Prayer submitted");
			router.push("/home");
			console.log(formData);
		} else {
			toast.error("Error in prayer submit");
			console.log(formData);
		}
	};

	const inSelected = (value: boolean) => postIn === value;
	const asSelected = (value: boolean) => postAs === value;
	const statusSelected = (value: boolean) => prayerStatus === value;

	const handleCheckedIn = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.value === "true") {
			setPostIn(true);
		} else {
			setPostIn(false);
		}
	};
	const handleCheckedAs = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.value === "true") {
			setPostAs(true);
		} else {
			setPostAs(false);
		}
	};
	const handleCheckedStatus = (
		e: React.ChangeEvent<HTMLInputElement>
	): void => {
		if (e.target.value === "true") {
			setPrayerStatus(true);
		} else {
			setPrayerStatus(false);
		}
	};

	return (
		<main className={styles.prayerMain}>
			<form onSubmit={handleSubmit} className={styles.editFormContainer}>
				{/* Cancel and Save button */}
				<div className={styles.topBtns}>
					<Button onClick={() => router.back()} className={styles.optionBtn}>
						Cancel
					</Button>
					<Button type="submit" className={styles.optionBtn}>
						Save
					</Button>
				</div>

				{/* Title */}
				<TextField
					multiline
					className={styles.title}
					id="title"
					label="Title"
					onChange={(T) => setTitle(T.target.value)}
				/>
				{/* Prayer */}
				<TextField
					multiline
					className={styles.detailText}
					id="detail"
					label="Detail"
					onChange={(d) => setDetail(d.target.value)}
				/>
				{/* Options */}
				{/* Post in */}
				<div className={styles.optionToggleContainer}>
					<p>Post in</p>
					<div className={styles.radio}>
						<input
							type="radio"
							name="privacy"
							id="privacy1"
							value="true"
							className={styles.radioInput}
							checked={inSelected(true)}
							onChange={handleCheckedIn}
						/>
						<label htmlFor="privacy1" className={styles.radioLabel}>
							{postIn === true ? (
								<CheckIcon className={styles.toggleIcon} />
							) : (
								<GroupsIcon className={styles.toggleIcon} />
							)}
							Community
						</label>
						<input
							type="radio"
							name="privacy"
							id="privacy2"
							value="false"
							className={styles.radioInput}
							checked={inSelected(false)}
							onChange={handleCheckedIn}
						/>
						<label htmlFor="privacy2" className={styles.radioLabel}>
							{postIn === false ? (
								<CheckIcon className={styles.toggleIcon} />
							) : (
								<LockIcon className={styles.toggleIcon} />
							)}
							Private
						</label>
					</div>
				</div>
				{/* Post as */}
				<div className={styles.optionToggleContainer}>
					<p>Post as</p>
					<div className={styles.radio}>
						<input
							type="radio"
							name="postAs"
							id="postAs1"
							value="false"
							className={styles.radioInput}
							checked={asSelected(false)}
							onChange={handleCheckedAs}
						/>
						<label htmlFor="postAs1" className={styles.radioLabel}>
							{postAs === false ? (
								<CheckIcon className={styles.toggleIcon} />
							) : (
								<BsIncognito className={styles.toggleIcon} />
							)}
							Anonymous
						</label>
						<input
							type="radio"
							name="postAs"
							id="postAs2"
							value="true"
							className={styles.radioInput}
							checked={asSelected(true)}
							onChange={handleCheckedAs}
						/>
						<label htmlFor="postAs2" className={styles.radioLabel}>
							{postAs === true ? (
								<CheckIcon className={styles.toggleIcon} />
							) : (
								<PersonIcon className={styles.toggleIcon} />
							)}
							Jacob Eades
						</label>
					</div>
				</div>
				{/* Prayer Status */}
				<div className={styles.optionToggleContainer}>
					<p>Prayer status</p>
					<div className={styles.radio}>
						<input
							type="radio"
							name="status"
							id="status1"
							value="false"
							className={styles.radioInput}
							checked={statusSelected(false)}
							onChange={handleCheckedStatus}
						/>
						<label htmlFor="status1" className={styles.radioLabel}>
							{prayerStatus === false ? (
								<CheckIcon className={styles.toggleIcon} />
							) : (
								<AccessTimeIcon className={styles.toggleIcon} />
							)}
							Unanswered
						</label>
						<input
							type="radio"
							name="status"
							id="status2"
							value="true"
							className={styles.radioInput}
							checked={statusSelected(true)}
							onChange={handleCheckedStatus}
						/>
						<label htmlFor="status2" className={styles.radioLabel}>
							{prayerStatus === true ? (
								<CheckIcon className={styles.toggleIcon} />
							) : (
								<SignLanguageIcon
									style={{ transform: "scaleX(-1)" }}
									className={styles.toggleIcon}
								/>
							)}
							Answered
						</label>
					</div>
				</div>
			</form>
		</main>
	);
}