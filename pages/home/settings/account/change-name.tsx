import React, { useState, useEffect } from "react";
import styles from "@/styles/PrayerPage.module.css";
import { Button, TextField, styled } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { auth } from "@/firebase/firebaseApp";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/redux/slices/userSlice";
import { getUsers, updateUser } from "@/lib/userHelper";
import { useQuery } from "react-query";
import MyPrayerLoading from "@/components/loading/prayer/MyPrayerLoading";
import HomeSectionError from "@/components/loading/home/HomeSectionError";

type Props = {};

export default function ChangeName({}: Props) {
	const [name, setName] = useState("");
	const [nameLoaded, setNameLoaded] = useState(false);
	const { user } = useSelector((state: any) => ({
		...state,
	}));
	const router = useRouter();
	const dispatch = useDispatch();

	useEffect(() => {
		setNameLoaded(true);
	}, [name, nameLoaded]);

	useEffect(() => {
		setName(user.name);
	}, [user]);

	const MyButton = styled(Button)(({ theme }) => ({
		"&.Mui-disabled": {
			color: "var(--sys-light-on-surface-variant)",
			backgroundColor: "var(--disable-light-primary)",
		},
	}));

	const {
		data: userData,
		isLoading: userLoading,
		isError: userIsError,
	} = useQuery("users", getUsers);

	if (userLoading) return <MyPrayerLoading />;
	if (userIsError) return <HomeSectionError />;

	const currentUserData = userData.filter((obj: { uid: String }) => {
		if (obj.uid === user.uid) {
			console.log("obj.uid === user.uid", obj);
			return obj;
		} else {
			return obj;
		}
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		// Add UserName to firebase displayName
		const currentUser = auth?.currentUser;
		if (currentUser) {
			updateProfile(currentUser, {
				displayName: name,
			})
				.then(() => {
					// update current redux store
					dispatch(
						userLoggedIn({
							name: name,
						})
					);
					// update Database
					const userDBId = `?userId=${currentUserData[0]._id}`;
					const formData = {
						prayerCounts: [{ prayerId: "", count: 0 }],
						addUndo: false,
						updated: "",
						putType: "displayName",
						newCommunity: "",
						newDisplayName: name,
					};

					updateUser(userDBId, formData);
				})
				.then(() => {
					toast.success("Name changed");
					router.push("/login/existing-user");
				})
				.catch((error) => {
					toast.error("Update profile error");
					console.log("update profile error: ", error);
				});
		} else {
			toast.error("User was Null");
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
					<MyButton
						disabled={!name || name === user.name}
						type="submit"
						className={styles.saveBtn}>
						Save
					</MyButton>
				</div>
				{/* makes the textfield load when the name is fetched */}
				{nameLoaded === true ? (
					<TextField
						id="detail"
						label="Name"
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
						onChange={(n) => setName(n.target.value)}
						defaultValue={name}
					/>
				) : (
					<></>
				)}
			</form>
		</main>
	);
}
