import skeleton from "@/styles/Skeletons.module.css";

export default function MyPrayerLoading() {
	return (
		<>
			<div className={skeleton.prayerContainer}>
				<div className={skeleton.prayerTopBtns}>
					<div className={skeleton.circleBtn} />
					<div className={skeleton.circleBtn} />
				</div>
				<div className={skeleton.prayerTop}>
					<div className={skeleton.prayerName} />
					<div className={skeleton.prayerTitle1} />
					<div className={skeleton.prayerTitle2} />
				</div>
				<div className={skeleton.prayerMidBtns}>
					<div className={skeleton.btnBlock} />
					<div className={skeleton.btnBlock} />
				</div>
				<div className={skeleton.card} />
			</div>
		</>
	);
}
