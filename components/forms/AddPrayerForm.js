// import React from "react";
// // import styles from "../../styles/Community.model.css";
// import { AiOutlineSend } from "react-icons/ai";
// import { getPrayers, addPrayer } from "../../lib/helper";
// import { useQueryClient, useMutation } from "react-query";

// export default function AddPrayerForm({ prayerData, setPrayerData }) {
// 	const queryClient = useQueryClient();
// 	const addMutation = useMutation(addPrayer, {
// 		onSuccess: () => {
// 			queryClient.prefetchQuery("prayers", getPrayers);
// 		},
// 	});

// 	const handleAddSubmit = (e) => {
// 		e.preventDefault();
// 		if (Object.keys(prayerData).length == 0)
// 			return console.log("Dont have any form data.");
// 		let { prayerMessage } = prayerData;
// 		// You can rename and combine information here
// 		const model = {
// 			message: prayerMessage,
// 		};

// 		addMutation.mutate(model);
// 	};

// 	return (
// 		<form onSubmit={handleAddSubmit} className={styles.messageContainer}>
// 			<h3>New</h3>
// 			<input
// 				type="text"
// 				id="addMessage"
// 				name="prayerMessage"
// 				placeholder="Write a prayer here..."
// 				onChange={setPrayerData}
// 				required
// 				className={styles.messageInput}
// 			/>
// 			<button type="submit" className={styles.messageBtn}>
// 				<AiOutlineSend size={42} />
// 			</button>
// 		</form>
// 	);
// }
