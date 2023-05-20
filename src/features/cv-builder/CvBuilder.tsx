import { useCvDataStore } from "./store/cv-data-store";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import StageView from "./components//layout/StageView";
import StageButonsPanel from "./components//layout/StageButtonsPanel";
import CvBuilderHeading from "./components/layout/CvBuilderHeading";
import { type StudentCvDetails } from "@/lib/api/cvs/schemas";

const ModalView = dynamic(() => import("./components/layout/ModalView"), {
    ssr: false,
});

export default function CvBuilder({
    initialData,
}: {
    initialData?: StudentCvDetails;
}) {
    const cvId = initialData?.id ?? null;
    const storedCvId = useCvDataStore((s) => s.cvId);
    const reInit = useCvDataStore((s) => s.reInit);
    const goToStage = useCvDataStore((s) => s.goToStage);
    const restoreData = initialData ?? null;

    useEffect(() => {
        if (cvId !== storedCvId) {
            reInit(restoreData);
            goToStage(0);
        }
    }, [storedCvId, cvId, reInit, restoreData, goToStage]);

    return (
        <div className="container mx-auto rounded-2xl bg-white p-4 shadow-md">
            <CvBuilderHeading />
            <StageButonsPanel />
            <StageView />
            <ModalView />
        </div>
    );
}
