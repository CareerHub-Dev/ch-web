const LoadMoreButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <section className="text-center mt-4">
      <button
        onClick={onClick}
        className="text-sm bg-transparent rounded-xl border border-solid border-primaryBlue text-primaryBlue pointer py-1 px-8"
      >
        Більше
      </button>
    </section>
  );
};
export default LoadMoreButton;
