import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useSections({
  url,
  defaultSection,
  sections,
}: {
  url: string;
  defaultSection: string;
  sections?: string[];
}) {
  const router = useRouter();
  const section = router.query.section as string;
  useEffect(() => {
    console.log('useSections');
    const sectionAllowed = sections?.includes(section) || !sections;
    if (!section || section.length === 0 || !sectionAllowed) {
      router.replace(`${url}/?section=${defaultSection}`, undefined, {
        shallow: true,
      });
    }
  }, [router, section, defaultSection, url, sections]);

  const displayedSectionChangeHandler = (newSection: string) => {
    router.push(`${url}/?section=${newSection}`, undefined, {
      shallow: true,
    });
  };

  return {
    currentSection: section,
    changeSection: displayedSectionChangeHandler,
  };
}
