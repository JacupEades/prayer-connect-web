import React, { useEffect } from "react";
import PrivatePrayers from "./PrivatePrayers";
import Answered from "./Answered";
import Settings from "./Settings";
import Community from "./Community";
import { useDispatch, useSelector } from "react-redux";
import { getPrayers } from "@/lib/prayerHelper";
import { getUsers } from "@/lib/userHelper";
import { useQuery } from "react-query";
import HomeSectionLoading from "../loading/home/HomeSectionLoading";
import HomeSectionError from "../loading/home/HomeSectionError";
import HomeSectionUidError from "../loading/home/HomeSectionUidError";
import { useRouter } from "next/router";
import { changeCommunity } from "@/redux/slices/communitySlice";

type Props = {
	selection: string;
	setSelection: any;
	sortValue: string;
	whoValue: string;
	namedValue: string;
	answeredValue: string;
};

export default function HomeContent({
	selection,
	setSelection,
	sortValue,
	whoValue,
	namedValue,
	answeredValue,
}: Props) {
	// Redux Users/ Prayers
	const { user, selectedCommunity } = useSelector((state: any) => ({
		...state,
	}));
	const dispatch = useDispatch();
	const router = useRouter();
	const selectedCom = selectedCommunity.community;

	useEffect(() => {
		if (user.uid === "") router.push("/login/existing-user");
	}, [router, user]);

	// Paryer Data from DB
	const {
		isLoading: prayerLoading,
		isError: prayerIsError,
		data: prayerData,
	} = useQuery("prayers", getPrayers, {
		refetchOnMount: "always",
	});
	const {
		isLoading: userLoading,
		isError: userIsError,
		data: userData,
		refetch,
	} = useQuery("users", getUsers);

	useEffect(() => {
		if (userData) {
			const currentuserData = userData.filter(
				(obj: any) => obj.uid === user.uid
			);
			if (currentuserData) {
				dispatch(
					changeCommunity({
						community: currentuserData[0]?.selectedCommunity.abbreviation,
					})
				);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData]);

	// Data validation loading, error, and redux store uid
	if (prayerLoading || userLoading) return <HomeSectionLoading />;
	if (prayerIsError || userIsError) return <HomeSectionError />;

	const componentSelector = () => {
		switch (selection) {
			case "Community Prayers":
				return (
					<Community
						user={user}
						userData={userData}
						selectedCom={selectedCom}
						prayerData={prayerData}
						refetch={refetch}
						sortValue={sortValue}
						whoValue={whoValue}
						namedValue={namedValue}
					/>
				);
			case "Private Prayers":
				return (
					<PrivatePrayers
						user={user}
						userData={userData}
						prayerData={prayerData}
						refetch={refetch}
						sortValue={sortValue}
						answeredValue={answeredValue}
					/>
				);
			case "Answered Prayers":
				return (
					<Answered
						user={user}
						userData={userData}
						selectedCom={selectedCom}
						prayerData={prayerData}
						sortValue={sortValue}
						whoValue={whoValue}
						namedValue={namedValue}
					/>
				);
			case "Settings":
				return <Settings />;
			default:
				setSelection("Community Prayers");
				console.log("You broke my app dummy!");
		}
	};
	return <>{componentSelector()}</>;
}
