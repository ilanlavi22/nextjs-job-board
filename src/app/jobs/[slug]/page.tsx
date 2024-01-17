import { Metadata } from "next";
import { getSingleJob } from "./actions";
import JobPage from "@/components/JobPage";
import prisma from "@/lib/prisma";

interface PageProps {
  params: { slug: string };
}

// enable static caching for this page by returning a list of all slugs via generateStaticParams. without this, the page will be generated on every request as dynamic.

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });
  return jobs.map(({ slug }) => slug);
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const singleJob = await getSingleJob(slug);

  return {
    title: singleJob.title,
    description: singleJob.description,
  };
}

export default async function page({ params: { slug } }: PageProps) {
  const singleJob = await getSingleJob(slug);

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={singleJob} />
    </main>
  );
}
