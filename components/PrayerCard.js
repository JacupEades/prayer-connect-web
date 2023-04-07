import React from "react";
import styles from "@/styles/Components.module.css";
import { FaPray } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
	toggleChangeAction,
	updateAction,
	deleteAction,
} from "@/redux/reducer";
import { deletePrayer, getPrayers } from "@/lib/helper";
import { useQueryClient } from "react-query";
import { Button } from "@mui/material";

export default function PrayerCard({
	prayerNumber,
	_id,
	title,
	answered,
	approved,
	createdAt,
	message,
	name,
	prayedFor,
	personal,
}) {
	const formId = useSelector((state) => state.app.client.formId);
	const visible = useSelector((state) => state.app.client.toggleFormVisible);
	const deleteId = useSelector((state) => state.app.client.deleteId);
	const queryClient = useQueryClient();
	const dispatch = useDispatch();

	const onDelete = async () => {
		if (!visible) {
			await dispatch(deleteAction(_id));
			await deletePrayer(deleteId);
			console.log("deleteId in PrayerCard: ", deleteId);
			await queryClient.prefetchQuery("prayers", getPrayers);
			// await dispatch(deleteAction(null));
		}
	};

	const onUpdate = () => {
		// dispatch(toggleChangeAction(_id));
		// if (visible) {
		// 	dispatch(updateAction(_id));
		// }
		if (visible && formId === undefined) {
			dispatch(updateAction(_id));
			dispatch(toggleChangeAction());
		} else if (visible && formId === _id) {
			dispatch(toggleChangeAction());
		} else if (!visible && formId !== _id) {
			dispatch(updateAction(_id));
			dispatch(toggleChangeAction());
		} else if (visible || (visible && formId !== _id)) {
			dispatch(updateAction(_id));
		} else {
			dispatch(toggleChangeAction());
		}
	};

	return (
		<article className={styles.prayerCardContainer}>
			{/* Name */}
			<div className={styles.cardName}>{name}</div>
			{/* Title and Message */}
			<div className={styles.cardTextContainer}>
				<h2>{title}</h2>
				<p>{message}</p>
			</div>
			{/* Count and pray Btn */}
			<div className={styles.cardPrayContainer}>
				<div className={styles.cardPrayedForContainer}>
					<FaPray className={styles.prayCountIcon} />
					<p className={styles.prayCountNumber}>{prayedFor}</p>
				</div>
				<Button variant="contained" className={styles.prayBtn}>
					<FaPray className={styles.prayBtnIcon} />
				</Button>
			</div>
			{/* prayer */}
			{/* <div className={styles.PrayerCardText}>
				<p>
					{name} prayer #{prayerNumber}
				</p>
				<p>{message}</p>
				<p>{answered === true ? "Answered" : "Ongoing"}</p>
				<p>{prayedFor}</p>
				<p>{createdAt}</p>
			</div> */}
			{/* Buttons */}
			{/* <div className={styles.PrayerCardBtncontainer}>
				<button onClick={onUpdate} className={styles.PrayerCardBtn}>
					<AiOutlineEdit size={32} />
				</button>
				<button onClick={onDelete} className={styles.PrayerCardBtn}>
					<AiOutlineDelete size={32} />
				</button>
			</div> */}
		</article>
	);
}
