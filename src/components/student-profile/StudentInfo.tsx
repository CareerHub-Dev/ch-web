const StudentInfo = ({
  fullName,
  email,
  group,
  phone,
}: {
  fullName: string;
  email: string;
  group: string;
  phone?: string;
}) => {
  return (
    <>
      <h1 className="text-xl mb-4 text-darkerBlue">{fullName}</h1>
      <p className="text-md text-darkerGrey">{email}</p>
      <p className="text-md text-darkerGrey">{group}</p>
      {phone && <p className="text-md text-darkerGrey">{phone}</p>}
    </>
  );
};
export default StudentInfo;
