const CompanyDescription = ({ description }: { description: string }) => {
  return (
    <section className="mt-4 bg-primaryWhite rounded-lg p-4">
      {description}
    </section>
  );
};

export default CompanyDescription;
