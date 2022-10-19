import { useRouter } from 'next/router';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

export default function useShallowRoutes({
  defaultSection,
  sections,
}: {
  sections?: string[];
  defaultSection: string;
}) {
  const router = useRouter();
  const section = router.query.section as string;
  const currentPath = router.asPath;

  useIsomorphicLayoutEffect(() => {
    const sectionAllowed = sections?.includes(section) || !sections;
    if (!section || !sectionAllowed) {
      const newRoute = section
        ? currentPath.replace(section, defaultSection)
        : `${currentPath}?section=${defaultSection}`;
      router.replace(newRoute, undefined, {
        shallow: true,
      });
    }
  }, [router, section, defaultSection, sections, currentPath]);

  const displayedSectionChangeHandler = (newSection: string) => {
    const newRoute = currentPath.replace(section, newSection);
    router.push(newRoute, undefined, {
      shallow: true,
    });
  };

  return {
    currentSection: section,
    changeSection: displayedSectionChangeHandler,
  };
}
