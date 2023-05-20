import JobOfferCard from "../components/JobOfferCard";

export default function JobOffersFeedMock() {
    return (
        <div className="space-y-6 divide-y">
            {jobOffers.map((jobOffer) => (
                <JobOfferCard key={jobOffer.id} {...jobOffer} />
            ))}
        </div>
    );
}

const jobOffers = [
    {
        id: "1",
        title: "C# Intern Backend Developer",
        image: "/general.jpg",
        startDate: "2023-05-16T13:49:51.796Z",
        endDate: "2023-05-16T13:49:51.796Z",
        jobType: "Full_time",
        workFormat: "Remote",
        experienceLevel: "Intern",
        jobPosition: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "C# Developer",
        },
        company: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "Nix Solutions",
        },
        tags: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                name: "C#",
            },
        ],
        amountSubscribers: 0,
        amountAppliedCVs: 0,
        isFollowed: true,
    },
    {
        id: "2",
        title: "C# Middle Backend Developer",
        image: "/general.jpg",
        startDate: "2023-05-16T13:49:51.796Z",
        endDate: "2023-05-16T13:49:51.796Z",
        jobType: "Full_time",
        workFormat: "Remote",
        experienceLevel: "Middle",
        jobPosition: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "C# Developer",
        },
        company: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "Nix Solutions",
        },
        tags: [
            {
                id: "1",
                name: "C#",
            },

            {
                id: "2",
                name: "Dotnet",
            },
            {
                id: "3",
                name: "Backend",
            },
        ],
        amountSubscribers: 0,
        amountAppliedCVs: 0,
        isFollowed: true,
    },
    {
        id: "3",
        title: "C# Intern Backend Developer",
        image: null,
        startDate: "2023-05-16T13:49:51.796Z",
        endDate: "2023-05-16T13:49:51.796Z",
        jobType: "Full_time",
        workFormat: "Remote",
        experienceLevel: "Intern",
        jobPosition: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "C# Developer",
        },
        company: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "Nix Solutions",
        },
        tags: [],
        amountSubscribers: 0,
        amountAppliedCVs: 0,
        isFollowed: true,
    },

    {
        id: "4",
        title: "C# Intern Backend Developer",
        image: "/general.jpg",
        startDate: "2023-05-16T13:49:51.796Z",
        endDate: "2023-05-16T13:49:51.796Z",
        jobType: "Full_time",
        workFormat: "Remote",
        experienceLevel: "Intern",
        jobPosition: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "C# Developer",
        },
        company: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "Nix Solutions",
        },
        tags: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                name: "C#",
            },
        ],
        amountSubscribers: 0,
        amountAppliedCVs: 0,
        isFollowed: true,
    },
];
