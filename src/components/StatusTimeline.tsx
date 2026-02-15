import { motion } from "framer-motion";

interface StatusTimelineStep {
  label: string;
  status: "completed" | "current" | "pending";
  date?: string;
}

interface StatusTimelineProps {
  steps: StatusTimelineStep[];
}

export default function StatusTimeline({ steps }: StatusTimelineProps) {
  return (
    <div className="flex items-center gap-1 w-full">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`w-3 h-3 rounded-full border-2 ${
                step.status === "completed"
                  ? "bg-success border-success"
                  : step.status === "current"
                  ? "bg-accent border-accent"
                  : "bg-muted border-border"
              }`}
            />
            <p
              className={`text-[10px] mt-1.5 text-center leading-tight ${
                step.status === "pending"
                  ? "text-muted-foreground/50"
                  : "text-foreground font-medium"
              }`}
            >
              {step.label}
            </p>
            {step.date && (
              <p className="text-[9px] text-muted-foreground">{step.date}</p>
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 flex-1 -mt-4 ${
                step.status === "completed" ? "bg-success" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
