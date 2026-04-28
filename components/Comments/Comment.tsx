"use client";

import { Card, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { MessageSquare, Heart, Send, Trash2 } from "lucide-react";
import { useAddComment } from "@/hooks/comments/useAddComment";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { useGetComments } from "@/hooks/comments/useGetComments";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useLikeComment } from "@/hooks/comments/useLikeComment";
import { useGetCurrentUser } from "@/hooks/user/useCurrentUser";
import { useDeleteComment } from "@/hooks/comments/useDeleteComment";

export const Comment = ({ gameId }: { gameId: string }) => {
  const [comment, setComment] = useState("");
  const { mutate: addComment, isPending } = useAddComment();
  const { data: comments, isLoading } = useGetComments(gameId);
  const { mutate: likeComment } = useLikeComment();
  const { data: user, isLoading: userLoading } = useGetCurrentUser();
  const { mutate: deleteComment } = useDeleteComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addComment({ gameId, content: comment });
    setComment("");
  };

  return (
    <Card className="py-0 pt-5 bg-card border-border/50 shadow-sm flex flex-col h-[600px] overflow-hidden">
      <CardHeader className="border-b border-border/10 shrink-0 pb-4">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <span>Comments</span>
          </div>
          {!isLoading && comments && (
            <span className="text-sm text-muted-foreground font-normal bg-muted px-2.5 py-0.5 rounded-full">
              {comments.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar bg-gradient-to-b from-background to-muted/10">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="w-10 h-10 rounded-full shrink-0" />
              <div className="space-y-2 w-full max-w-[80%]">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-16 w-full rounded-2xl rounded-tl-sm" />
              </div>
            </div>
          ))
        ) : comments?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-70">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <p className="text-base font-medium">No comments yet</p>
            <p className="text-sm text-muted-foreground max-w-[250px]">
              Be the first to share your thoughts about this game!
            </p>
          </div>
        ) : (
          comments?.map((commentItem) => (
            <div
              key={commentItem.id}
              className="flex gap-3 sm:gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              <Avatar className="w-10 h-10 border border-primary/10 shrink-0 mt-1 shadow-sm">
                <AvatarImage src={commentItem.user?.imageUrl!} />
                <AvatarFallback className="bg-primary/5 text-primary">
                  {commentItem.user?.firstName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1.5 w-full">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">
                    {commentItem.user?.firstName} {commentItem.user?.lastName}
                  </h4>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                    {new Date(commentItem.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </span>
                </div>
                <div className="bg-muted/40 text-sm p-3.5 rounded-2xl rounded-tl-sm border border-border/40 text-foreground/90 shadow-sm leading-relaxed">
                  {commentItem.comment}
                </div>
                <div className="flex items-center gap-4 mt-0.5">
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-red-500 transition-colors"
                    onClick={() => likeComment({ commentId: commentItem.id })}
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        commentItem._count?.likes > 0
                          ? "text-red-500 fill-red-500"
                          : ""
                      }`}
                    />
                    {commentItem._count.likes > 0
                      ? commentItem._count.likes
                      : "Like"}
                  </Button>
                  {commentItem.userId === user?.id && (
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-red-500 transition-colors"
                      onClick={() =>
                        deleteComment({ commentId: commentItem.id })
                      }
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t border-border/10 shrink-0 bg-background">
        <form onSubmit={handleSubmit} className="relative">
          <Textarea
            className="w-full pb-12 pt-3 px-4 bg-muted/30 border-border/50 focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:bg-background rounded-xl resize-none placeholder:text-muted-foreground/60 transition-all"
            placeholder="Share your thoughts..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={2}
          />
          <div className="absolute bottom-2 right-2">
            <Button
              type="submit"
              size="sm"
              className="rounded-lg px-4 h-8 font-medium shadow-sm transition-all active:scale-95"
              disabled={isPending || !comment.trim()}
            >
              {isPending ? (
                "Posting..."
              ) : (
                <>
                  Post
                  <Send className="w-3.5 h-3.5 ml-1.5" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};
