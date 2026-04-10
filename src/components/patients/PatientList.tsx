import { useState } from "react";
import type { Patient, PatientFormData } from "@/types/patient";
import { usePatients } from "@/hooks/usePatients";
import { useNotify } from "@/hooks/useNotify";
import SearchBar from "@/components/ui/SearchBar";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Button from "@/components/ui/Button";
import PatientCard from "./PatientCard";
import PatientForm from "./PatientForm";

export default function PatientList() {
  const { patients, loading, error, addPatient, updatePatient, deletePatient } =
    usePatients();
  const notify = useNotify();

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = patients.filter((p) => {
    const query = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query) ||
      p.id?.toString().includes(query)
    );
  });

  const openCreate = () => {
    setEditingPatient(null);
    setModalOpen(true);
  };

  const openEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingPatient(null);
  };

  const handleSave = (data: PatientFormData) => {
    setSaving(true);
    try {
      if (editingPatient) {
        updatePatient(editingPatient.id, data);
        notify("Patient updated successfully");
      } else {
        addPatient(data);
        notify("Patient added successfully");
      }
      closeModal();
    } catch {
      notify("Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    deletePatient(deleteId);
    notify("Patient removed");
    setDeleteId(null);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-12 w-12 rounded-full bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/5 rounded bg-slate-100" />
                  <div className="h-3 w-2/5 rounded bg-slate-100" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-4/5 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-6 pt-20 text-center">
        <p className="mb-4 text-sm text-red-600">
          Failed to load patients: {error}
        </p>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.5"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Patient Manager
              </h1>
              <p className="text-xs text-slate-400">
                {patients.length} records
              </p>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-end gap-3 min-w-[280px]">
            <SearchBar value={search} onChange={setSearch} />
            <Button onClick={openCreate}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add patient
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-7">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="mb-4 text-sm text-slate-400">
              {search ? `No results for "${search}"` : "No patients yet"}
            </p>
            {!search && (
              <Button onClick={openCreate}>Add first patient</Button>
            )}
          </div>
        ) : (
          <>
            {search && (
              <p className="mb-4 text-xs text-slate-400">
                {filtered.length} result{filtered.length !== 1 && "s"} for "
                {search}"
              </p>
            )}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-start">
              {filtered.map((patient) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  onEdit={openEdit}
                  onDelete={setDeleteId}
                />
              ))}
            </div>
          </>
        )}
      </main>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        title={editingPatient ? "Edit patient" : "New patient"}
      >
        <PatientForm
          patient={editingPatient}
          onSave={handleSave}
          onCancel={closeModal}
          saving={saving}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        message="Are you sure you want to delete this patient? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}