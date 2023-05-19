import { StudentProfileModal } from "../store/student-profile-store";
import StudentStatSearchBox from "./StudentStatSearchBox";
import { useDebounce } from "usehooks-ts";
import {
    getStudentCompanySubscriptions,
    getStudentJobOfferSubscriptions,
    getStudentStudentSubscribers,
    getStudentStudentSubscriptions,
} from "@/lib/api/student";
import ModalList from "./modal-list/ModalList";
import FollowerStudentWithAction from "./modal-list/FollowerStudentWithAction";
import FollowedCompanyWithAction from "./modal-list/FollowedCompanyWithAction";
import TrackedJobOfferWithAction from "./modal-list/TrackedJobOfferWithAction";
import { useState } from "react";
import FollowedStudentWithAction from "./modal-list/FollowedStudentWithAction";

const inferredProps = {
    followedStudents: {
        getItems: getStudentStudentSubscriptions,
        Item: FollowedStudentWithAction,
        queryKeyPrefix: "followed-students",
    },
    studentFollowers: {
        getItems: getStudentStudentSubscribers,
        Item: FollowerStudentWithAction,
        queryKeyPrefix: "student-followers",
    },
    followedCompanies: {
        getItems: getStudentCompanySubscriptions,
        Item: FollowedCompanyWithAction,
        queryKeyPrefix: "followed-companies",
    },
    trackedJobOffers: {
        getItems: getStudentJobOfferSubscriptions,
        Item: TrackedJobOfferWithAction,
        queryKeyPrefix: "tracked-job-offers",
    },
};

export default function StudentStatsPaginatedList({
    currentModal,
    accountId,
    isSelf,
}: {
    currentModal: StudentProfileModal;
    accountId: string;
    isSelf: boolean;
}) {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);
    return (
        <>
            <StudentStatSearchBox value={search} onChange={setSearch} />
            {currentModal === "followedStudents" ? (
                <ModalList
                    {...inferredProps.followedStudents}
                    accountId={accountId}
                    isSelf={isSelf}
                    search={debouncedSearch}
                />
            ) : currentModal === "studentFollowers" ? (
                <ModalList
                    {...inferredProps.studentFollowers}
                    accountId={accountId}
                    isSelf={isSelf}
                    search={debouncedSearch}
                />
            ) : currentModal === "followedCompanies" ? (
                <ModalList
                    {...inferredProps.followedCompanies}
                    accountId={accountId}
                    isSelf={isSelf}
                    search={debouncedSearch}
                />
            ) : currentModal === "trackedJobOffers" ? (
                <ModalList
                    {...inferredProps.trackedJobOffers}
                    accountId={accountId}
                    isSelf={isSelf}
                    search={debouncedSearch}
                />
            ) : null}
        </>
    );
}
