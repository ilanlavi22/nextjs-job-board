import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";


// using cache to store the data in memory
//  only fetch is being cached so here we are using cache to store the data in memory
export const getSingleJob = cache(async (slug: string) => {
    const job = await prisma.job.findUnique({
        where: { slug },
    });

    if (!job) notFound();

    return job;
});
