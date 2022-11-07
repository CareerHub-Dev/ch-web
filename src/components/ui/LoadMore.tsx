export default function LoadMore({ onClick }: { onClick: AnyFn }) {
  return (
    <section className="text-center mt-4">
      <button
        onClick={onClick}
        className="text-sm bg-transparent rounded-xl border border-solid border-lightBlueAccent text-lightBlueAccent pointer 
        py-2 px-4"
      >
        Більше
      </button>
    </section>
  );
}
