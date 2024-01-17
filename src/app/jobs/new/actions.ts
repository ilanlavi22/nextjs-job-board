"use server";

import { nanoid } from "nanoid";
import { toSlug } from "@/lib/utils";
import { put } from "@vercel/blob";
import { createJobSchema } from "@/lib/zodSchema";
import path from "path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createJobPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  //validating the form data
  const {
    title,
    type,
    companyName,
    companyLogo,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = createJobSchema.parse(values);

  //converting values

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined; //undefined is the default value for the logo url if the user doesn't upload a logo

  if (companyLogo) {
    const blob = await put(
      // creates a folder called company_logos and saves the logo with the slug as the name
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );
    companyLogoUrl = blob.url; //the url of the logo for the job posting
  }

  //saving the data to the database
  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
    },
  });
  redirect("/jobs/submitted");
}
