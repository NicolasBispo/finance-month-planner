"use client";

import {
  PageContainer,
  PageContent,
  PageHeader,
} from "@/components/ui/page-container";
import PlanningRequests from "@/requests/planning.requests";
import Planning from "@/types/entities/planning.entity";
import { getMonthName } from "@/utils/date";
import { useQuery } from "@tanstack/react-query";
import { capitalize, uniq } from "lodash";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PlanningsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["plannings"],
    queryFn: async () => await PlanningRequests.list(),
  });
  const years = (results: Planning[]) => {
    return uniq(results.map((planning) => planning.year));
  };

  const planningsOnYear = (year: number, plannings: Planning[]) => {
    return plannings.filter((planning) => planning.year === year);
  };
  return (
    <PageContainer
      data={data}
      isLoading={isLoading}
      blockingConditions={data?.results.length === 0 || (!data && !isLoading)}
    >
      <PageHeader>Planejamentos existentes</PageHeader>
      <PageContent>
        <div className="flex flex-wrap gap-2">
          {data &&
            years(data.results).map((year) => (
              <Accordion
                className="w-full"
                type="single"
                collapsible
                key={year}
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl font-semibold ps-5">
                    {year}
                  </AccordionTrigger>
                  <AccordionContent className="pb-0 p-3 mb-4">
                    <div className="flex flex-wrap gap-2">
                      {planningsOnYear(year, data.results).map((planning) => (
                        <Link
                          key={planning.id}
                          className="bg-background rounded-lg p-3 hover:bg-primary/15"
                          href={`/app/plannings/${planning.month}/${planning.year}/${planning.id}`}
                        >
                          {capitalize(getMonthName(planning.month))}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
        </div>
      </PageContent>
    </PageContainer>
  );
}
