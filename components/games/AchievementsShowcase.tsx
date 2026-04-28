"use client";

import { Trophy } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import LazyImage from "../utils/LazyImage";

export const AchievementsShowcase = ({
  achievements,
}: {
  achievements: any;
}) => {
  return (
    <Card className="bg-card border-border/50 shadow-sm flex flex-col max-h-[600px]">
      <CardHeader className="pb-3 border-b border-border/10 shrink-0">
        <CardTitle className="text-lg flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Achievements
          <Badge variant="outline" className="ml-auto bg-background">
            {achievements.count || achievements.results.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <CardContent className="flex flex-col gap-4 pt-4">
          {achievements.results.map((achievement: any) => (
            <div key={achievement.id} className="flex gap-3 items-center group">
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-border/50 bg-muted flex items-center justify-center p-1">
                {achievement.image ? (
                  <LazyImage
                    src={achievement.image}
                    alt={achievement.name}
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <Trophy className="w-6 h-6 text-muted-foreground/30" />
                )}
              </div>
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                  {achievement.name}
                </span>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {achievement.description}
                </span>
              </div>
              {achievement.percent && (
                <div className="shrink-0 text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  {achievement.percent}%
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </div>
    </Card>
  );
};
