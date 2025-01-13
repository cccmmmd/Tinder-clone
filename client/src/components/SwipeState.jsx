import { useMatchStore } from "../store/matchStore";
import { useTranslation } from "react-i18next";

const SwipeState = () => {
    const {swipeState} = useMatchStore();
    const { t } = useTranslation();

    const getStateText = (s) => {
        if (s === "liked") return t("match.like");
        if (s === "passed") return t("match.pass");
        if (s === "matched") return t("match.matched");
        return "";
    };

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

