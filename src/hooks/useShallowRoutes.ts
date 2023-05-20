import { useRouter } from "next/router";

export default function useShallowRoutes({
    defaultSection,
}: {
    defaultSection: string;
}) {
    const router = useRouter();

    const changeSection = (newSection: string) => {
        let newPath = router.asPath;
        if (router.query.section === undefined) {
            newPath = `${router.asPath}?section=${newSection}`;
        } else {
            newPath = router.asPath.replace(
                router.query.section as string,
                newSection
            );
        }
        router.push(newPath, undefined, {
            shallow: true,
        });
    };

    return {
        currentSection: router.query.section || defaultSection,
        changeSection,
    };
}
