import RecentPosts from "./RecentPosts";

export default function RecentPostsSection({
  isSelf,
}: {
  isSelf: boolean;
  accountId: string;
}) {
  return isSelf ? (
    <section aria-labelledby="recent-posts">
      <div className="rounded-lg bg-white shadow">
        <div className="p-6">
          <h2
            id="recent-posts-heading"
            className="text-base font-medium text-gray-900"
          >
            {"Останні публікації"}
          </h2>
          <RecentPosts />
        </div>
      </div>
    </section>
  ) : null;
}
