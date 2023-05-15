import React, { useState, useEffect } from "react";
import styles from "@/styles/PrayerPage.module.css";
import { Button, TextField, styled } from "@mui/material";
import { useRouter } from "next/router";
import GroupsIcon from "@mui/icons-material/Groups";
import LockIcon from "@mui/icons-material/Lock";
import { BsIncognito } from "react-icons/bs";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckIcon from "@mui/icons-material/Check";
import {
	updatePrayer,
	getPrayer,
	deletePrayer,
} from "../../../lib/prayerHelper";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import DeleteConfirm from "../../../components/overlays/DeleteConfirm";

type Props = {};

export default function NewPrayer({}: Props) {
	const [deletePopup, setDeletePopup] = useState(false);
	const [titleState, setTitleState] = useState("");
	const [detail, setDetail] = useState("");
	const [postIn, setPostIn] = useState(true);
	const [postAs, setPostAs] = useState(false);
	const [displayName, setDisplayName] = useState("");
	const [prayerStatus, setPrayerStatus] = useState(false);
	const [formData, setFormData] = useState({
		title: titleState,
		message: detail,
		name: "",
		personal: false,
		answered: prayerStatus,
	});
	const { user } = useSelector((state: any) => ({
		...state,
	}));
	const { prayer } = useSelector((state: any) => ({
		...state,
	}));
	const router = useRouter();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleDisplayName = () => {
		if (postAs === true) {
			return user.name;
		} else {
			return "Anonymous";
		}
	};
	// Validate Logged in
	const currentUserId = user.uid;
	// Getting the selected prayer
	const prayerId = prayer.prayerId;

	// Getting thefull prayerlist
	const { isLoading, isError, data, error }: any = useQuery(
		["prayers", prayerId],
		() => getPrayer(prayerId)
	);

	useEffect(() => {
		const postAsCheck = data?.name === "Anonymous" ? false : true;
		setTitleState(data?.title);
		setDetail(data?.message);
		setPostIn(data?.personal);
		setPostAs(postAsCheck);
		setDisplayName(data?.name);
		setPrayerStatus(data?.answered);
	}, [data]);

	useEffect(() => {
		const postAsName = handleDisplayName();
		setDisplayName(postAsName);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [postAs, displayName]);

	useEffect(() => {
		setFormData({
			title: titleState,
			message: detail,
			name: displayName,
			personal: postIn,
			answered: prayerStatus,
		});
	}, [detail, displayName, postIn, prayerStatus, titleState]);

	if (isLoading)
		return <div className={styles.loadingOrError}>Prayers are Loading...</div>;
	if (isError)
		return (
			<div className={styles.loadingOrError}>
				Prayers being loaded error {error}
			</div>
		);
	const { title, message, personal, name, answered, userId } = data;
	// Update Form submit
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		// console.log(formData);
		if (userId !== currentUserId) {
			return toast.error("User trying to edit did not make this post!");
		}
		if (detail.length > 2000) {
			return toast.error("Prayer detail is to long.");
		}
		if (userId === currentUserId && titleState && detail) {
			await updatePrayer(prayerId, formData);
			toast.success("Prayer updated");
			router.back();
			// window.location.href = "/home";
			// console.log(formData);
		} else {
			toast.error("Error in prayer submit");
			console.log(formData);
		}
	};
	// Radio button, Toggle switches
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
	// Delete prayer
	const handleDelete = () => {
		setDeletePopup(true);
	};
	const deleteConfirmed = async () => {
		try {
			if (userId === currentUserId) {
				deletePrayer(prayerId);
				toast.success("Prayer was deleted");
				router.push("/home");
			} else {
				toast.error("You did not make this prayer so you can not delete.");
			}
		} catch {
			toast.error("Prayer was not deleted");
		}
	};
	const MyButton = styled(Button)(({ theme }) => ({
		"&.Mui-disabled": {
			color: "var(--sys-light-on-surface-variant)",
			backgroundColor: "var(--disable-light-primary)",
		},
	}));

	return (
		<main className={styles.prayerMainForm}>
			{deletePopup ? (
				<DeleteConfirm
					deletePopup={deletePopup}
					deleteConfirmed={deleteConfirmed}
					setDeletePopup={setDeletePopup}
					deleteWhat="Prayer"
				/>
			) : (
				""
			)}
			<form onSubmit={handleSubmit} className={styles.editFormContainer}>
				{/* Cancel and Save button */}
				<div className={styles.topBtnsMain}>
					<div className={styles.topBtns}>
						<Button onClick={() => router.back()} className={styles.optionBtn}>
							Cancel
						</Button>
						<MyButton
							disabled={!title || !detail}
							type="submit"
							className={styles.optionBtnPublish}>
							Save
						</MyButton>
					</div>
				</div>

				{/* Title */}
				<TextField
					multiline
					className={styles.title}
					sx={{
						"& .MuiInputLabel-root.Mui-focused": {
							color: "var(--sys-light-primary)",
						},
						"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
							{
								borderColor: "var(--sys-light-primary)",
							},
					}}
					id="title"
					label="Title"
					onChange={(T) => setTitleState(T.target.value)}
					defaultValue={title}
				/>
				{/* Prayer */}
				<TextField
					multiline
					className={styles.detailText}
					sx={{
						"& .MuiInputLabel-root.Mui-focused": {
							color: "var(--sys-light-primary)",
						},
						"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
							{
								borderColor: "var(--sys-light-primary)",
							},
					}}
					id="detail"
					label="Detail"
					onChange={(d) => setDetail(d.target.value)}
					defaultValue={message}
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
							value="false"
							className={styles.radioInput}
							checked={inSelected(false)}
							onChange={handleCheckedIn}
						/>
						<label htmlFor="privacy1" className={styles.radioLabel}>
							{postIn === false ? (
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
							value="true"
							className={styles.radioInput}
							checked={inSelected(true)}
							onChange={handleCheckedIn}
						/>
						<label htmlFor="privacy2" className={styles.radioLabel}>
							{postIn === true ? (
								<CheckIcon className={styles.toggleIcon} />
							) : (
								<LockIcon className={styles.toggleIcon} />
							)}
							Private
						</label>
					</div>
				</div>
				{/* Post as */}
				{postIn === true ? (
					<></>
				) : (
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
								{user.name}
							</label>
						</div>
					</div>
				)}

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
			<Button onClick={handleDelete} className={styles.deleteBtn}>
				Delete Prayer
			</Button>
		</main>
	);
}
