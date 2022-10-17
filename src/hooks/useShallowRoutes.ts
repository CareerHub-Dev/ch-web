import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';

export default function useShallowRoutes({
  defaultSection,
  sections,
}: {
  defaultSection: string;
  sections?: string[];
}) {
  const router = useRouter();
  const section = router.query.section as string;
  const currentPath = router.asPath;

  useLayoutEffect(() => {
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
