"use client";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import Image from "next/image";
import { MessageSquare } from "lucide-react";

export const RedditShowcase = ({ reddit }: { reddit: any }) => {
  return (
    <Card className="bg-card border-border/50 shadow-sm flex flex-col max-h-[600px]">
      <CardHeader className="pb-3 border-b border-border/10 shrink-0">
        <CardTitle className="text-lg flex items-center gap-2">
          <Image src="/reddit.png" alt="reddit" width={24} height={24} />
          Reddit Community
        </CardTitle>
      </CardHeader>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <CardContent className="flex flex-col gap-3 pt-4">
          {reddit.results.map((post: any) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="flex flex-col gap-2 p-3 rounded-xl bg-muted/30 hover:bg-muted/80 border border-transparent hover:border-border transition-all">
                <span className="font-medium text-sm group-hover:text-primary line-clamp-2 leading-snug">
                  {post.name}
                </span>
                {post.text && (
                  <span className="text-xs text-muted-foreground line-clamp-2">
                    {post.text}
                  </span>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <MessageSquare className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {post.username || "Reddit User"}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </CardContent>
      </div>
    </Card>
  );
};
