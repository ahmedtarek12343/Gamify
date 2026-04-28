"use client";

import useGetOrders from "@/hooks/order/useGetOrders";
import Image from "next/image";
import {
  Package,
  Calendar,
  Clock,
  CreditCard,
  ShoppingBag,
  Loader2,
} from "lucide-react";

export const OrdersShowcase = () => {
  const { data, isLoading } = useGetOrders();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border rounded-2xl bg-card/50 border-dashed h-screen">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-medium animate-pulse">
          Loading your orders...
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center border rounded-2xl bg-card/50 border-dashed">
        <div className="bg-primary/10 p-4 rounded-full mb-6">
          <ShoppingBag className="h-12 w-12 text-primary/70" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight mb-3">
          No orders yet
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          You haven't made any purchases yet. When you buy games, they will
          appear here along with your order details.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto p-6">
      {data?.map((order) => (
        <div
          key={order.id}
          className="group flex flex-col overflow-hidden rounded-2xl border bg-card/40 text-card-foreground shadow-sm transition-all hover:shadow-xl hover:border-primary/40 duration-300"
        >
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b bg-muted/20 p-5 sm:p-7 gap-5 transition-colors group-hover:bg-muted/40">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-xl tracking-tight">
                  Order #{String(order.id).slice(0, 8).toUpperCase()}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium ml-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30"></div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {new Date(order.createdAt).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5 bg-background/50 sm:bg-transparent p-4 sm:p-0 rounded-xl sm:rounded-none border sm:border-none">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                Total Amount
              </span>
              <div className="flex items-center text-2xl font-black tracking-tight">
                <span className="text-primary mr-1">$</span>
                {Number(order.totalAmount).toFixed(2)}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium mt-1">
                <CreditCard className="h-3 w-3" />
                Paid Successfully
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-5 sm:p-7 bg-background/30 backdrop-blur-sm">
            <div className="text-sm font-bold mb-5 text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              Order Items
              <div className="h-px bg-border flex-1 ml-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {order.orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 items-center rounded-xl border bg-card/60 p-3 sm:p-4 transition-all hover:bg-card hover:scale-[1.02] hover:shadow-md cursor-pointer border-border/50 hover:border-primary/30"
                >
                  <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-lg border bg-muted shadow-sm">
                    {item.gameImage ? (
                      <Image
                        src={item.gameImage}
                        alt={item.gameName}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                        sizes="120px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-secondary/50">
                        <span className="text-muted-foreground text-[10px]">
                          No Image
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 min-w-0 justify-center gap-1.5">
                    <p className="font-bold text-base line-clamp-2 leading-tight transition-colors hover:text-primary">
                      {item.gameName}
                    </p>
                    <div className="flex items-center flex-wrap gap-2 mt-1">
                      <span className="text-sm font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-md border border-primary/20 shadow-sm">
                        ${Number(item.gamePrice).toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground font-semibold bg-muted px-2 py-1 rounded-md">
                        Qty: {item.gameQuantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
