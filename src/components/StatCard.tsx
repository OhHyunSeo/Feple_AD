import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
  description?: string;
  href?: string;
  onClick?: () => void;
}

export default function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  iconColor = "text-blue-600",
  description,
  href,
  onClick
}: StatCardProps) {
  const cardContent = (
    <div className={cn(
      "bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all",
      (href || onClick) && "hover:shadow-md hover:border-gray-300 cursor-pointer"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span className={cn(
                "text-sm font-medium",
                change >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {change >= 0 ? "+" : ""}{change}%
              </span>
              <span className="text-xs text-gray-500">전월 대비</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  if (onClick) {
    return <div onClick={onClick}>{cardContent}</div>;
  }

  return cardContent;
} 