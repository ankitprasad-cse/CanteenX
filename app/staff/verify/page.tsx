import StudentOrderVerifyClient from "./StaffVerifyClient";

interface StaffVerifyPageProps {
  searchParams:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | { [key: string]: string | string[] | undefined };
}

export default async function StaffVerifyPage({
  searchParams,
}: StaffVerifyPageProps) {
  const resolvedParams = await searchParams;

  const demo =
    typeof resolvedParams?.demo === "string"
      ? resolvedParams.demo
      : undefined;

  const data =
    typeof resolvedParams?.data === "string"
      ? resolvedParams.data
      : undefined;

 return <StudentOrderVerifyClient demo={demo} data={data} />;
}