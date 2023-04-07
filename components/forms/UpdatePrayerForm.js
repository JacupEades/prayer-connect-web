import React from "react";
import styles from "@/styles/Community.module.css";
import { AiOutlineSend } from "react-icons/ai";
import { getPrayer, updatePrayer, getPrayers } from "../../lib/helper";
import { useQuery, useQueryClient, useMutation } from "react-query";

export default function UpdatePrayerForm({
	formId,
	prayerData,
	setPrayerData,
}) {
	const { isLoading, isError, data, error } = useQuery(["prayes", formId], () =>
		getPrayer(formId)
	);
	const queryClient = useQueryClient();
	const UpdateMutation = useMutation(
		(newData) => updatePrayer(formId, newData),
		{
			onSuccess: async () => {
				queryClient.prefetchQuery("prayers", getPrayers);
			},
		}
	);
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Got Error With UpdatePrayerForm</div>;
	const { message } = data;

	const handleUpdateSubmit = async (e) => {
		e.preventDefault();
		let { prayerMessage } = prayerData;
		const model = { message: prayerMessage };
		let updated = Object.assign({}, data, model);
		await UpdateMutation.mutate(updated);
		console.log(updated);
	};

	return (
		<form onSubmit={handleUpdateSubmit} className={styles.messageContainer}>
			<h3>Update</h3>
			<input
				type="text"
				id="updateMessage"
				name="prayerMessage"
				defaultValue={message}
				onChange={setPrayerData}
				required
				className={styles.messageInput}
			/>
			<button type="submit" className={styles.messageBtn}>
				<AiOutlineSend size={42} />
			</button>
		</form>
	);
}
