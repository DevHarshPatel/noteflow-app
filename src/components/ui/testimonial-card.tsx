import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "group relative flex w-[350px] flex-col justify-between rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{author.name}</span>
          {href ? (
            <Link
              href={href}
              className="text-xs text-muted-foreground hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {author.handle}
            </Link>
          ) : (
            <span className="text-xs text-muted-foreground">{author.handle}</span>
          )}
        </div>
      </div>
    </div>
  )
} 