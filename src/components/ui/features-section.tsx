import { cn } from "@/lib/utils";
import {
  FolderIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  CloudIcon,
  LockClosedIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Color-coded Folders",
    description: "Organize your notes with intuitive color-coding and folder structure",
    icon: <FolderIcon className="w-6 h-6" />,
  },
  {
    title: "Lightning Fast Search",
    description: "Find any note instantly with our powerful search functionality",
    icon: <MagnifyingGlassIcon className="w-6 h-6" />,
  },
  {
    title: "Smart Organization",
    description: "Let AI help you organize and categorize your notes automatically",
    icon: <SparklesIcon className="w-6 h-6" />,
  },
  {
    title: "Cloud Sync",
    description: "Access your notes from anywhere with automatic cloud synchronization",
    icon: <CloudIcon className="w-6 h-6" />,
  },
  {
    title: "End-to-End Encryption",
    description: "Your notes are encrypted and secure with enterprise-grade security",
    icon: <LockClosedIcon className="w-6 h-6" />,
  },
  {
    title: "Easy Sharing",
    description: "Share notes and collaborate with your team effortlessly",
    icon: <ShareIcon className="w-6 h-6" />,
  },
];

export function FeaturesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 3) && "lg:border-l dark:border-neutral-800",
        index < 3 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
}; 