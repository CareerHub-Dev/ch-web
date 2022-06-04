import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAppDispatch from '@/hooks/useAppDispatch';
import { setProfileData } from '@/store/student';
import SidePanel from '@/components/my-profile/SidePanel';
import StudentProfile from '@/components/my-profile/StudentProfile';
import CVBoard from '@/components/my-profile/CVBoard';
import { GetServerSidePropsContext } from 'next';
import UserRole from '@/models/enums/UserRole';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';
import { sendGetStudentRequest } from '@/lib/api/remote/student';
import verifySessionData from '@/lib/api/local/helpers/verify-session-data';
import StudentState from '@/models/Student/StudentState';
import classes from '@/styles/my-dashboard.module.scss';

const MyDashBoardPage = (props: StudentState) => {
  const router = useRouter();
  const section = router.query.section as string;
  useEffect(() => {
    console.log('useEffect 1');
    if (!section || section.length === 0) {
      router.push('/my-profile/?section=overview', undefined, {
        shallow: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log('useEffect 2');
    console.log(props);

    dispatch(setProfileData(props));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayedSectionChangeHandler = (newSection: string) => {
    router.push(`/my-profile/?section=${newSection}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div id="dashBoardGridContainer" className={classes.container}>
      <SidePanel onSectionClick={displayedSectionChangeHandler} />

      <section className={classes.dashboard}>
        {section === 'overview' && <StudentProfile />}
        {section === 'cvs' && <CVBoard />}
      </section>
    </div>
  );
};

export default MyDashBoardPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const sessionData = await verifySessionData(context.req);
  const accessAllowed = verifyAuthority(sessionData, [UserRole.Student]);

  if (!accessAllowed) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  if (!sessionData.entityId) {
    return {
      props: {
        error: 'Помилка консистентності даних користувача',
      },
    };
  }

  try {
    const studentData = await sendGetStudentRequest(
      sessionData.entityId,
      sessionData.accessToken
    );
    return {
      props: {
        firstName: studentData.firstName,
        lastName: studentData.lastName,
        email: studentData.email,
        phone: studentData.phone,
        groupId: studentData.studentGroupId,
        birthDate: studentData.birthDate,
      },
    };
  } catch (error: any) {
    return {
      props: {
        error: error.message,
      },
    };
  }
};
