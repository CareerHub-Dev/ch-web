import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useSections({
  url,
  defaultSection,
}: {
  url: string;
  defaultSection: string;
}) {
  const router = useRouter();
  const section = router.query.section as string;
  useEffect(() => {
    console.log('useEffect 1');
    if (!section || section.length === 0) {
      router.replace(`${url}/?section=${defaultSection}`, undefined, {
        shallow: true,
      });
    }
  }, [router, section, defaultSection, url]);

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
