import EmptyState from "@/components/ui/EmptyState";
import { CvItem } from "./CvItem";

export function CvItemsGrid({
    items,
}: {
    items: {
        id: string;
        title: string;
        created: string;
        modified: string | null;
    }[];
}) {
    return (
        <div className="mt-3 mb-5">
            {items.length > 0 ? (
                <ul
                    role="list"
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
                >
                    {items.map((item, itemIndex) => (
                        <CvItem key={itemIndex} {...item} />
                    ))}
                </ul>
            ) : (
                <EmptyState noItemsText="Ви поки що не створили жодного резюме" />
            )}
        </div>
    );
}
