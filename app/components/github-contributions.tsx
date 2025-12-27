"use client";

import { useEffect, useState } from "react";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
  type Activity,
} from "./contribution-graph";

export function GitHubContributions({ username }: { username: string }) {
  const [data, setData] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // Using GitHub's contribution calendar API
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        );
        const result = await response.json();

        // Find the max count to normalize levels properly
        const maxCount = Math.max(
          ...result.contributions.map((c: any) => c.count),
          1
        );

        // Transform the data to our format with proper level calculation
        const contributions: Activity[] = result.contributions.map((contribution: any) => {
          const count = contribution.count;
          let level = 0;

          if (count === 0) {
            level = 0;
          } else if (count < maxCount * 0.25) {
            level = 1;
          } else if (count < maxCount * 0.5) {
            level = 2;
          } else if (count < maxCount * 0.75) {
            level = 3;
          } else {
            level = 4;
          }

          return {
            date: contribution.date,
            count: contribution.count,
            level: level,
          };
        });

        setData(contributions);
      } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error);
        // Set empty data on error
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400 text-sm">Loading contributions...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <ContributionGraph data={data} className="mx-auto">
      <ContributionGraphCalendar>
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock
            activity={activity}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
          />
        )}
      </ContributionGraphCalendar>
      <ContributionGraphFooter>
        <ContributionGraphTotalCount />
        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}
