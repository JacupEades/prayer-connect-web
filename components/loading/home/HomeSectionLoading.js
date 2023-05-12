import skeleton from "@/styles/Skeletons.module.css";

export default function HomeSectionLoading() {
	return (
		<>
			<div className={skeleton.homeContainer}>
				<div className={skeleton.homeTop} />
				<div className={skeleton.card} />
				<div className={skeleton.card} />
				<div className={skeleton.card} />
				<div className={skeleton.card} />
				<div className={skeleton.card} />
			</div>
		</>
	);
}
