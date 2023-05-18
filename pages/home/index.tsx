import React, { useEffect, useState } from "react";
import Navigation from "@/components/overlays/Navigation";
import Header from "@/components/overlays/Header";
import FilterDrawer from "@/components/forms/FilterDrawer";
import HomeContent from "@/components/sections/HomeContent";
import { useDispatch, useSelector } from "react-redux";
import { tabSelect } from "@/redux/slices/tabSlice";

type Props = {};

export default function HomePage({}: Props) {
	// Navigation tab selection
	const [selection, setSelection] = useState("Community");
	// Drawer open
	const [fMenuOpen, setFMenuOpen] = useState(false);
	// Sort right now can only take one value
	const [sortValue, setSortValue] = useState("newest");
	const [sortApplied, setSortApplied] = useState(false);
	// Filter Values
	const [whoValue, setWhoValue] = useState("all");
	const [namedValue, setNamedValue] = useState("both");
	const [answeredValue, setAnsweredValue] = useState("no filter");
	const dispatch = useDispatch();

	const { tab } = useSelector((state: any) => ({
		...state,
	}));

	useEffect(() => {
		setSelection(tab.tab);
	}, [tab]);

	useEffect(() => {
		setSortValue("newest");
		setSortApplied(false);
		setWhoValue("all");
		setNamedValue("both");
		setAnsweredValue("no filter");
	}, [selection]);

	// Usefull for checking the filter states
	// useEffect(() => {
	// 	console.log(
	// 		"sortApplied:",
	// 		sortApplied,
	// 		"sortValue:",
	// 		sortValue,
	// 		"whoValue:",
	// 		whoValue,
	// 		"namedValue:",
	// 		namedValue,
	// 		"answeredValue:",
	// 		answeredValue
	// 	);
	// }, [namedValue, sortApplied, sortValue, whoValue, answeredValue]);

	// functions for the Header
	const filterMenu = () => {
		setFMenuOpen(!fMenuOpen);
	};
	// defaults sort shorthands
	const sortBase = sortValue === "newest";
	const sortNotBase = sortValue !== "newest";
	const oldestSeleted = sortValue === "oldest";
	const mostSeleted = sortValue === "mostPrayers";
	const leastSeleted = sortValue === "leastPrayers";
	// defaults filter shorthands
	const baseWhoValue = whoValue === "all";
	const notBaseWhoValue = whoValue !== "all";
	const baseNamedValue = namedValue === "both";
	const notBaseNamedValue = namedValue !== "both";
	// Sorts
	const oldFirst = () => {
		if (oldestSeleted && baseWhoValue && baseNamedValue) {
			setSortValue("newest");
			setSortApplied(false);
		} else if (
			(oldestSeleted && notBaseWhoValue && notBaseNamedValue) ||
			(oldestSeleted && notBaseWhoValue && baseNamedValue) ||
			(oldestSeleted && baseWhoValue && notBaseNamedValue)
		) {
			setSortValue("newest");
		} else {
			setSortValue("oldest");
			setSortApplied(true);
		}
	};
	const mostPrayed = () => {
		if (mostSeleted && baseWhoValue && baseNamedValue) {
			setSortValue("newest");
			setSortApplied(false);
		} else if (
			(mostSeleted && notBaseWhoValue) ||
			(mostSeleted && notBaseNamedValue)
		) {
			setSortValue("newest");
		} else {
			setSortValue("mostPrayers");
			setSortApplied(true);
		}
	};
	const leastPrayed = () => {
		if (leastSeleted && baseWhoValue && baseNamedValue) {
			setSortValue("newest");
			setSortApplied(false);
		} else if (
			(leastSeleted && notBaseWhoValue) ||
			(leastSeleted && notBaseNamedValue)
		) {
			setSortValue("newest");
		} else {
			setSortValue("leastPrayers");
			setSortApplied(true);
		}
	};
	// Filters
	const otherChip = () => {
		if (sortBase && notBaseWhoValue && baseNamedValue) {
			setWhoValue("all");
			setSortApplied(false);
		} else if (
			(sortBase && notBaseWhoValue && notBaseNamedValue) ||
			(sortNotBase && notBaseWhoValue && baseNamedValue) ||
			(sortNotBase && notBaseWhoValue && notBaseNamedValue)
		) {
			setWhoValue("all");
		} else {
			setWhoValue("other");
			setSortApplied(true);
		}
	};
	const mineChip = () => {
		if (sortBase && notBaseWhoValue && baseNamedValue) {
			setWhoValue("all");
			setSortApplied(false);
		} else if (
			(sortBase && notBaseWhoValue && notBaseNamedValue) ||
			(sortNotBase && notBaseWhoValue && baseNamedValue) ||
			(sortNotBase && notBaseWhoValue && notBaseNamedValue)
		) {
			setWhoValue("all");
		} else {
			setWhoValue("mine");
			setSortApplied(true);
		}
	};
	const anonChip = () => {
		if (sortBase && baseWhoValue && notBaseNamedValue) {
			setNamedValue("both");
			setSortApplied(false);
		} else if (
			(sortBase && notBaseWhoValue && notBaseNamedValue) ||
			(sortNotBase && notBaseWhoValue && notBaseNamedValue) ||
			(sortNotBase && baseWhoValue && notBaseNamedValue)
		) {
			setNamedValue("both");
		} else {
			setNamedValue("anon");
			setSortApplied(true);
		}
	};
	const publicChip = () => {
		if (sortBase && baseWhoValue && notBaseNamedValue) {
			setNamedValue("both");
			setSortApplied(false);
		} else if (
			(sortBase && notBaseWhoValue && notBaseNamedValue) ||
			(sortNotBase && notBaseWhoValue && notBaseNamedValue) ||
			(sortNotBase && baseWhoValue && notBaseNamedValue)
		) {
			setNamedValue("both");
		} else {
			setNamedValue("public");
			setSortApplied(true);
		}
	};
	const unansweredChip = () => {
		if (answeredValue === "unanswered") {
			setAnsweredValue("no filter");
			setSortApplied(false);
		} else if (answeredValue === "unanswered") {
			setAnsweredValue("unanswered");
		} else {
			setAnsweredValue("unanswered");
			setSortApplied(true);
		}
	};
	const answeredChip = () => {
		if (answeredValue === "answered") {
			setAnsweredValue("no filter");
			setSortApplied(false);
		} else if (answeredValue === "answered") {
			setAnsweredValue("answered");
		} else {
			setAnsweredValue("answered");
			setSortApplied(true);
		}
	};

	// functions for the navigation
	const selectCall = (data: string) => {
		dispatch(
			tabSelect({
				tab: data,
			})
		);
	};

	return (
		<>
			<Header
				filterMenu={filterMenu}
				// sort funcs
				oldFirst={oldFirst}
				mostPrayed={mostPrayed}
				leastPrayed={leastPrayed}
				// filter funcs
				otherChip={otherChip}
				mineChip={mineChip}
				anonChip={anonChip}
				publicChip={publicChip}
				answeredChip={answeredChip}
				unansweredChip={unansweredChip}
				// other
				selection={selection}
				sortValue={sortValue}
				whoValue={whoValue}
				namedValue={namedValue}
				answeredValue={answeredValue}
				sortApplied={sortApplied}
			/>
			<HomeContent
				selection={selection}
				setSelection={setSelection}
				sortValue={sortValue}
				whoValue={whoValue}
				namedValue={namedValue}
				answeredValue={answeredValue}
			/>
			<Navigation selectString={selectCall} selection={selection} />
			{/* Sort/Filter Drawer */}
			<FilterDrawer
				selection={selection}
				fMenuOpen={fMenuOpen}
				filterMenu={filterMenu}
				setSortValue={setSortValue}
				setWhoValue={setWhoValue}
				setNamedValue={setNamedValue}
				setAnsweredValue={setAnsweredValue}
				setSortApplied={setSortApplied}
				sortApplied={sortApplied}
			/>
		</>
	);
}
