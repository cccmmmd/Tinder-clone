import { useMatchStore } from "../store/matchStore";

const SwipeState = () => {
    const {swipeState} = useMatchStore();

    return (
        <div className={`absolute top-10 left-0 right-0 text-center text-6xl font-bold z-10
            ${getStateStyle(swipeState)}`}
		>
			{getStateText(swipeState)}
		</div>
    )


}

export default SwipeState;

const getStateStyle = (s) => {
    if (s === "liked") return "text-rose-400";
    if (s === "passed") return "text-purple-500";
    if (s === "matched") return "text-rose-500";
    return "";
}

const getStateText = (s) => {
    if (s === "liked") return "好感";
    if (s === "passed") return "無感";
    if (s === "matched") return "配對成功！";
    return "";
};