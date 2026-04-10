import { useState } from "react";
import type { Patient } from "@/types/patient";
import Avatar from "@/components/ui/Avatar";

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
}

export default function PatientCard({
  patient,
  onEdit,
  onDelete,
}: PatientCardProps) {
  const [expanded, setExpanded] = useState(false);

  const dateStr = new Date(patient.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
<div
  className="
    flex flex-col rounded-xl border border-slate-200 bg-white
    transition-shadow duration-200 hover:shadow-md
  "
>
      {/* Header */}
      <div className="flex-1 p-5">
        <div className="flex items-center gap-3.5">
          <Avatar src={patient.avatar} name={patient.name} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-slate-900">
              {patient.name}
            </p>
            <p className="text-xs text-slate-400 truncate">ID: {patient.id}</p>
          </div>
          <span className="shrink-0 rounded-md bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-800">
            {dateStr}
          </span>
        </div>

        <p
          className={`
            mt-3.5 text-sm leading-relaxed text-slate-600 break-words
            ${expanded ? "" : "line-clamp-2"}
          `}
        >
          {patient.description || "No description provided."}
        </p>

        {expanded && (
          <div className="mt-3.5 space-y-2 border-t border-slate-100 pt-3.5 animate-fade-in">
            {patient.website && (
              <div className="flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
                </svg>
                <a
                  href={patient.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-600 hover:underline break-all"
                >
                  {patient.website}
                </a>
              </div>
            )}
            <div className="flex items-center gap-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span className="text-xs text-slate-500">
                Registered: {new Date(patient.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex border-t border-slate-100">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 py-2.5 text-xs font-medium text-brand-600 hover:bg-brand-50 transition-colors cursor-pointer"
        >
          {expanded ? "Show less" : "View details"}
        </button>

        <div className="w-px bg-slate-100" />

        <button
          onClick={() => onEdit(patient)}
          className="flex-1 py-2.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
        >
          Edit
        </button>

        <div className="w-px bg-slate-100" />

        <button
          onClick={() => onDelete(patient.id)}
          className="flex-1 py-2.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}