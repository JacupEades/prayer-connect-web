import React, { useReducer } from "react";
import styles from "@/styles/Community.module.css";
import { AiOutlineSend } from "react-icons/ai";
import PrayerCard from "@/components/PrayerCard";
import { getPrayers, addPrayer } from "../../lib/helper";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { toggleChangeAction } from "@/redux/reducer";
import AddPrayerForm from "./AddPrayerForm";
import UpdatePrayerForm from "./UpdatePrayerForm";

const formReducer = (state, event) => {
	return {
		// this spread helps override the previous state data
		...state,
		[event.target.name]: event.target.value,
	};
};

export default function PrayerForms() {
	const formId = useSelector((state) => state.app.client.formId);
	const [prayerData, setPrayerData] = useReducer(formReducer, {});

	return (
		<>
			{formId
				? UpdatePrayerForm({ formId, prayerData, setPrayerData })
				: AddPrayerForm({ prayerData, setPrayerData })}
		</>
	);
}
