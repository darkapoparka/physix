import { PublicRoute } from "@/features/physix/public-route";

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ page: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <PublicRoute
      locale="bg"
      params={params}
      searchParams={searchParams}
    />
  );
}
