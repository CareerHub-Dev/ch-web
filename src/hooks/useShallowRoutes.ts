import { useRouter } from 'next/router';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

export default function useShallowRoutes({
  defaultSection,
  sections,
}: {
  sections: string[];
  defaultSection: string;
}) {
  const router = useRouter();
  const currentSection = router.query.section;
  const currentPath = router.asPath;

  useIsomorphicLayoutEffect(() => {
    const sectionAllowed = sections.some((item) => item === currentSection);
    if (!sectionAllowed) {
      let newPath = currentPath;
      if (typeof currentSection === 'string') {
        const encodedCurrentSection = encodeURIComponent(currentSection);
        newPath = currentPath.replace(encodedCurrentSection, defaultSection);
      } else {
        newPath = `${currentPath}?section=${defaultSection}`;
      }
      router.replace(newPath, undefined, {
        shallow: true,
      });
    }
  }, [router, currentSection, defaultSection, sections, currentPath]);

  const changeSection = (newSection: string) => {
    const newPath = currentPath.replace(currentSection as string, newSection);
    router.push(newPath, undefined, {
      shallow: true,
    });
  };

  return {
    currentSection,
    changeSection,
  };
}
