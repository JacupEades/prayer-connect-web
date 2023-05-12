import skeleton from "@/styles/Skeletons.module.css";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function HomeSectionError() {
	const router = useRouter();
	return (
		<div className={skeleton.homeError}>
			<p className={skeleton.loginP}>
				Sorry, there was an error when loading the prayers. Please come back
				later.
			</p>
			<Button
				onClick={() => {
					router.push("/login/existing-user");
				}}
				className={skeleton.loginBtn}>
				Refresh
			</Button>
		</div>
	);
}
