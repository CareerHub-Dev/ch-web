import SoftButton from "./SoftButton";

export default function LoadMore({ onClick }: { onClick: AnyFn }) {
  return (
    <section className="text-center mt-4">
      <SoftButton onClick={onClick}>{"Більше"}</SoftButton>
    </section>
  );
}
