import skeleton from "@/styles/Skeletons.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function HomeSectionUidError() {
	const router = useRouter();
	return (
		<div className={skeleton.homeError}>
			<p className={skeleton.loginP}>
				Oops! The connection is lost. Please login to continue your prayer
				session.
			</p>
			<Button
				onClick={() => {
					router.push("/login/existing-user");
				}}
				className={skeleton.loginBtn}>
				Login
			</Button>
		</div>
	);
}
