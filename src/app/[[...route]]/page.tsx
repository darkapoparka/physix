import { redirect } from "next/navigation";
import AccountPage from "@/features/physix/account-page";

export default async function Page(props: {
  params: Promise<{ route?: string[] }>;
  searchParams: Promise<{
    activity?: string;
    capture?: string;
    relationship?: string;
  }>;
}) {
  const { route } = await props.params;
  const { capture } = await props.searchParams;
  // Preserve explicit development capture links; ordinary visits open the clinic.
  if (
    !route?.length &&
    !(process.env.NODE_ENV === "development" && typeof capture === "string")
  )
    redirect("/bg");
  return <AccountPage {...props} />;
}
