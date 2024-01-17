'use server';
import prisma from "@/lib/prisma";

// export const getAllJobs = async () => {
//   const jobs = await prisma.job.findMany({
//     where: {
//       approved: true,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   return jobs;
// };



export const getActiveJobsLocations = async () => {
  // the prentices warping the await is needed to cast the result to string[]   
  const distinctLocations = (await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: { // select only the location field not the whole job object
      location: true,
    },
    distinct: ["location"], // get only distinct locations
  })
  .then((locations) =>
    locations.map(({location}) => location).filter(Boolean), // filter out null values
  )) as string[];

  return distinctLocations;
};

export const getJobsTypes = async () => {
  const distinctTypes = (await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      type: true,
    },
    distinct: ["type"],
  })
  .then((types) =>
    types.map(({type}) => type).filter(Boolean),
  )) as string[];
  
  return distinctTypes;
}


  

