import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { getActiveJobsLocations, getJobsTypes } from "@/lib/actions";
import { jobsFilterSchema } from "@/lib/zodSchema";
import { redirect } from "next/navigation";
import { JobFilterValues } from "@/lib/zodSchema";
import FormSubmitButton from "./FormSubmitButton";

export const filterJobs = async (formData: FormData) => {
  "use server";

  const values = Object.fromEntries(formData.entries());
  const { query, type, location, remote } = jobsFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(query && { query: query.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${searchParams.toString()}`);
};

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
}

export default async function JobFilterSidebar({
  defaultValues,
}: JobFilterSidebarProps) {
  const distinctLocations = await getActiveJobsLocations();
  const distinctTypes = await getJobsTypes();

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="query">Search</Label>
            <Input
              type="text"
              id="query"
              name="query"
              defaultValue={defaultValues.query}
              placeholder="Title, company, etc."
            ></Input>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All types</option>
              {distinctTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All Locations</option>
              {distinctLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              defaultChecked={defaultValues.remote}
              className="scale-125 accent-black"
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>

          <FormSubmitButton className="w-full">Filter jobs</FormSubmitButton>
        </div>
      </form>
    </aside>
  );
}
