import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function LoginCheck() {
	const { user } = useSelector((state: any) => ({
		...state,
	}));
	const dispatch = useDispatch();
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		console.log("LoginCheck Ran");
		if (
			user.uid === "" &&
			pathname !== "/" &&
			pathname !== "/login/signup" &&
			pathname !== "/login/existing-user" &&
			pathname !== "/login/signup/terms-and-conditions" &&
			pathname !== "/login/forgot-password"
		) {
			router.push("/");
		}
		if (user.uid !== "") {
			if (
				pathname === "/" ||
				pathname === "/login/signup" ||
				pathname === "/login/existing-user" ||
				pathname === "/login/forgot-password"
			) {
				router.push("/home");
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, user.uid]);

	return null;
}
