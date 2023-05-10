import { Button } from "@mui/material";
import styles from "@/styles/Settings.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SettingsHeaders from "@/components/overlays/SettingsHeaders";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteConfirm from "@/components/overlays/DeleteConfirm";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { deleteUserInDB, getUsers } from "@/lib/userHelper";
import { toast } from "react-toastify";
import { deleteUser } from "firebase/auth";
import { auth } from "@/firebase/firebaseApp";
import { userLoggedOut } from "@/redux/slices/userSlice";

type Props = {};

export default function Account({}: Props) {
	const [deletePopup, setDeletePopup] = useState(false);
	const [dbUid, setDBuid] = useState("");
	const [db_id, setDb_id] = useState("");
	const router = useRouter();
	const dispatch = useDispatch();
	const { user } = useSelector((state: any) => ({
		...state,
	}));
	const {
		error,
		data: userData,
		isLoading: userLoading,
		isError: userIsError,
	} = useQuery("users", getUsers);

	if (userLoading)
		return <div className={styles.loadingOrError}>Prayers are Loading...</div>;
	if (userIsError)
		return <div className={styles.loadingOrError}>User loading error</div>;
	if (user.uid === "")
		return (
			<div className={styles.loadingOrError}>Please log in again. {error}</div>
		);

	const currentUserId = user.uid;
	const firebaseUser = auth.currentUser;

	// Delete Account
	const handleDelete = () => {
		setDBuid(userData[0].uid);
		setDb_id(userData[0]._id);
		setDeletePopup(true);
	};

	const deleteConfirmed = async () => {
		try {
			if (dbUid === currentUserId && firebaseUser && db_id) {
				await deleteUserInDB(db_id);
				dispatch(userLoggedOut());
				deleteUser(firebaseUser)
					.then(() => {
						toast.success("User was deleted");
						router.push("/login/signup");
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				toast.error("One or more conditions not met to delete account.");
			}
		} catch {
			toast.error("Error, User was not deleted.");
		}
	};

	return (
		<main className={styles.accountMain}>
			{deletePopup ? (
				<DeleteConfirm
					deletePopup={deletePopup}
					deleteConfirmed={deleteConfirmed}
					setDeletePopup={setDeletePopup}
					deleteWhat="Account"
				/>
			) : (
				""
			)}
			<SettingsHeaders title="Account" />
			<div className={styles.accountCardMain}>
				{/* Name */}
				<Button
					onClick={() => router.push("/home/settings/account/change-name")}
					className={styles.accountCardTop}>
					<p className={styles.accountCardP}>Name</p>
					<div className={styles.accountCardRight}>
						<p className={styles.accountCardP}>{user.name}</p>
						<ArrowForwardIosIcon className={styles.accountCardIcon} />
					</div>
				</Button>
				{/* Email */}
				<Button className={styles.accountCardMid}>
					<p className={styles.accountCardP}>Email</p>
					<div className={styles.accountCardRight}>
						<p className={styles.accountCardP}>{user.email}</p>
					</div>
				</Button>
				{/* Password */}
				<Button
					onClick={() => router.push("/login/forgot-password")}
					className={styles.accountCardBot}>
					<p className={styles.accountCardP}>Password</p>
					<div className={styles.accountCardRight}>
						<p className={styles.accountCardP}>Reset</p>
						<ArrowForwardIosIcon className={styles.accountCardIcon} />
					</div>
				</Button>
			</div>
			<Button onClick={handleDelete} className={styles.deleteBtn}>
				Delete Account
			</Button>
		</main>
	);
}
