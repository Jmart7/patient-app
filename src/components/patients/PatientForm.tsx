import { useState } from "react";
import type { Patient, PatientFormData } from "@/types/patient";
import { validatePatientForm, hasErrors } from "@/utils/validation";
import type { ValidationErrors } from "@/utils/validation";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";

interface PatientFormProps {
  patient?: Patient | null;
  onSave: (data: PatientFormData) => void;
  onCancel: () => void;
  saving?: boolean;
}

export default function PatientForm({
  patient,
  onSave,
  onCancel,
  saving = false,
}: PatientFormProps) {
  const [form, setForm] = useState<PatientFormData>({
    name: patient?.name ?? "",
    avatar: patient?.avatar ?? "",
    description: patient?.description ?? "",
    website: patient?.website ?? "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const updateField = (field: keyof PatientFormData, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);

    if (touched[field]) {
      const fieldErrors = validatePatientForm(next);
      setErrors((prev) => ({
        ...prev,
        [field]: fieldErrors[field],
      }));
    }
  };

  const handleBlur = (field: keyof PatientFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validatePatientForm(form);
    setErrors((prev) => ({
      ...prev,
      [field]: fieldErrors[field],
    }));
  };

  const handleSubmit = () => {
    setTouched({ name: true, description: true, website: true, avatar: true });
    const allErrors = validatePatientForm(form);
    setErrors(allErrors);

    if (!hasErrors(allErrors)) {
      onSave(form);
    }
  };

  const showAvatarPreview =
    form.avatar &&
    typeof form.avatar === "string" &&
    form.avatar.startsWith("http");

  return (
    <div className="space-y-4">
      <Input
        label="Full name *"
        value={form.name}
        onChange={(e) => updateField("name", e.target.value)}
        onBlur={() => handleBlur("name")}
        placeholder="e.g. Jane Doe"
        error={touched.name ? errors.name : undefined}
      />

      <div>
        <Input
          label="Avatar URL"
          value={form.avatar}
          onChange={(e) => updateField("avatar", e.target.value)}
          placeholder="https://..."
        />
        {showAvatarPreview && (
          <div className="mt-2 flex items-center gap-2.5">
            <Avatar src={form.avatar} name={form.name || "Preview"} size={36} />
            <span className="text-xs text-slate-400">Preview</span>
          </div>
        )}
      </div>

      <TextArea
        label="Description *"
        value={form.description}
        onChange={(e) => updateField("description", e.target.value)}
        onBlur={() => handleBlur("description")}
        placeholder="Patient description..."
        error={touched.description ? errors.description : undefined}
      />

      <Input
        label="Website"
        value={form.website}
        onChange={(e) => updateField("website", e.target.value)}
        onBlur={() => handleBlur("website")}
        placeholder="https://example.com"
        error={touched.website ? errors.website : undefined}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? "Saving..." : patient ? "Update patient" : "Add patient"}
        </Button>
      </div>
    </div>
  );
}