import Link from "next/link";
import { Card } from "@/components/ui";
import { StatCardProps } from "@/types";
import { COLORS } from "@/constants";
import { cn } from "@/lib/utils";

export default function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  iconColor = COLORS.ICON.PRIMARY,
  description,
  href,
  onClick
}: StatCardProps) {
  const cardContent = (
    <Card
      className={cn(
        "p-6 transition-all duration-300",
        (href || onClick) && "hover:shadow-xl hover:scale-105 cursor-pointer"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2 korean-text font-medium">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent korean-heading">
            {value}
          </p>
          {description && (
            <p className="text-xs text-gray-500 mt-2 korean-text">{description}</p>
          )}
          {change !== undefined && (
            <div className="flex items-center gap-2 mt-3">
              <span className={cn(
                "text-sm font-semibold korean-text",
                change >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {change >= 0 ? "+" : ""}{change}%
              </span>
              <span className="text-xs text-gray-500 korean-text">전월 대비</span>
            </div>
          )}
        </div>
        <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-4 rounded-2xl shadow-inner">
          <Icon className={cn("h-8 w-8", iconColor)} />
        </div>
      </div>
    </Card>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  if (onClick) {
    return <div onClick={onClick}>{cardContent}</div>;
  }

  return cardContent;
} 