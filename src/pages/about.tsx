import { NextPageWithLayout } from './_app';

const AboutPage: NextPageWithLayout = () => {
  return (
    <>
      <h1>About</h1>
      <p>This is the about page</p>
    </>
  );
};

AboutPage.getLayout = (page) => {
  return <div className="container my-4 mx-auto">{page}</div>;
};

export default AboutPage;
