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

type Props = {};

export default function MyPrayerEdit({}: Props) {
	const [title, setTitle] = useState("");
	const [detail, setDetail] = useState("");
	const [formData, setFormData] = useState({ title, detail });

	useEffect(() => {
		setFormData({ title: title, detail: detail });
	}, [title, detail]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		console.log(formData);
	};

	const router = useRouter();
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
					defaultValue={"Prayer TransitionPrayer TransitionPrayer Transition"}
				/>
				{/* Prayer */}
				<TextField
					multiline
					className={styles.detailText}
					id="detail"
					label="Detail"
					onChange={(d) => setDetail(d.target.value)}
					defaultValue={
						"Lorem ipsum dolor sit amet consectetur. Egestas tincidunt lectus eu placerat cursus erat et. Pharetra congue tellus tortor turpis scelerisque lectus mi. Vel gravida in diam pellentesque leo purus. Nunc at dui ut elementum. Id id ultrices dui faucibus"
					}
				/>
				{/* Options */}
				{/* Post in */}
				<div className={styles.optionToggleContainer}>
					<p>Post in</p>
					<div className={styles.toggleContainer}>
						<Button className={styles.optionToggleBtnLeft}>
							<GroupsIcon className={styles.toggleIcon} />
							Community
						</Button>
						<Button className={styles.optionToggleBtnRight}>
							<LockIcon className={styles.toggleIcon} />
							Private
						</Button>
					</div>
				</div>
				{/* Post as */}
				<div className={styles.optionToggleContainer}>
					<p>Post as</p>
					<div className={styles.toggleContainer}>
						<Button className={styles.optionToggleBtnLeft}>
							<BsIncognito className={styles.toggleIcon} />
							Anonymous
						</Button>
						<Button className={styles.optionToggleBtnRight}>
							<PersonIcon className={styles.toggleIcon} />
							Jacob Eades
						</Button>
					</div>
				</div>
				{/* Prayer Status */}
				<div className={styles.optionToggleContainer}>
					<p>Prayer Status</p>
					<div className={styles.toggleContainer}>
						<Button className={styles.optionToggleBtnLeft}>
							<AccessTimeIcon className={styles.toggleIcon} />
							Unanswered
						</Button>
						<Button className={styles.optionToggleBtnRight}>
							<SignLanguageIcon className={styles.toggleIcon} />
							Answered
						</Button>
					</div>
				</div>
			</form>
			<Button className={styles.deleteBtn}>Delete Prayer</Button>
		</main>
	);
}
