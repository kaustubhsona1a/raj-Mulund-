import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { DoctorTask } from '../../types';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Filter,
  X,
} from 'lucide-react';

interface TasksViewProps {
  onSelectPatient: (patientId: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ onSelectPatient }) => {
  const { tasks, toggleTask, addTask, deleteTask, patients } = useClinic();

  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState<DoctorTask['category']>('Review');
  const [taskPatientId, setTaskPatientId] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('2026-10-04');
  const [taskPriority, setTaskPriority] = useState<DoctorTask['priority']>('Normal');

  const filteredTasks = tasks.filter((t) => {
    if (filterPriority === 'All') return true;
    return t.priority === filterPriority;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle) return;

    const p = patients.find((pat) => pat.id === taskPatientId);

    addTask({
      title: taskTitle,
      category: taskCategory,
      patientId: p?.id,
      patientName: p ? `${p.firstName} ${p.lastName}` : undefined,
      dueDate: taskDueDate,
      priority: taskPriority,
    });

    setShowAddModal(false);
    setTaskTitle('');
    setTaskPatientId('');
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D6] pb-5">
        <div>
          <h1 className="text-2xl font-editorial font-semibold text-[#141213]">
            Clinical Tasks & Actions
          </h1>
          <p className="text-xs text-[#5D6761] mt-0.5">
            {pendingCount} open clinical priorities
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Task</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        {(['All', 'Urgent', 'High', 'Normal'] as const).map((pri) => (
          <button
            key={pri}
            onClick={() => setFilterPriority(pri)}
            className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              filterPriority === pri
                ? 'bg-[#7B1E34] text-white border-[#7B1E34] font-medium'
                : 'bg-white border-[#DDD5C7] text-[#555F59] hover:bg-[#F2ECE3]'
            }`}
          >
            {pri} {pri !== 'All' ? 'Priority' : 'Tasks'}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl border border-[#E5DDD1] shadow-2xs overflow-hidden divide-y divide-[#EFEAE1]">
        {filteredTasks.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#7A847E]">
            All priority tasks have been completed.
          </div>
        ) : (
          filteredTasks.map((t) => (
            <div
              key={t.id}
              className={`p-4 transition-colors flex items-center justify-between gap-3 ${
                t.completed ? 'bg-[#FCFBF8] opacity-60' : 'hover:bg-[#FAF9F6]'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3 min-w-0">
                <button
                  onClick={() => toggleTask(t.id)}
                  className="mt-0.5 sm:mt-0 text-[#7B1E34] hover:text-[#141213] cursor-pointer"
                >
                  {t.completed ? (
                    <CheckSquare className="w-4 h-4 text-[#7B1E34]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#8C958E]" />
                  )}
                </button>

                <div className="min-w-0 space-y-0.5">
                  <div
                    className={`text-xs font-semibold ${
                      t.completed ? 'line-through text-[#7B847E]' : 'text-[#1C221F]'
                    }`}
                  >
                    {t.title}
                  </div>
                  <div className="text-[11px] text-[#69726D] flex flex-wrap items-center gap-2">
                    <span className="bg-[#FAF8F5] border border-[#E8E1D5] px-1.5 py-0.2 rounded font-medium">
                      {t.category}
                    </span>
                    <span>Due: {t.dueDate}</span>
                    {t.patientName && (
                      <>
                        <span aria-hidden="true">·</span>
                        <button
                          onClick={() => t.patientId && onSelectPatient(t.patientId)}
                          className="text-[#7B1E34] hover:underline"
                        >
                          {t.patientName}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                    t.priority === 'High' || t.priority === 'Urgent'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
                      : 'bg-[#F2ECE1] text-[#4F5953]'
                  }`}
                >
                  {t.priority}
                </span>

                <button
                  onClick={() => deleteTask(t.id)}
                  className="p-1 text-[#8C958E] hover:text-rose-600 rounded cursor-pointer"
                  title="Delete task"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#141715]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-[#DDD5C7] w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE3D6] pb-3">
              <h3 className="text-base font-editorial font-semibold text-[#141213]">
                Create Clinical Task
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#76807A] hover:text-[#141213]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#3B443F] block mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Call patient to confirm calcium scoring timing"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Category
                  </label>
                  <select
                    value={taskCategory}
                    onChange={(e: any) => setTaskCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                  >
                    <option value="Review">Review</option>
                    <option value="Patient Call">Patient Call</option>
                    <option value="Prescription">Prescription</option>
                    <option value="Procedure">Procedure</option>
                    <option value="Administrative">Administrative</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Priority
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e: any) => setTaskPriority(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Related Patient (Optional)
                  </label>
                  <select
                    value={taskPatientId}
                    onChange={(e) => setTaskPatientId(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                  >
                    <option value="">None / General</option>
                    {patients.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.firstName} {p.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#3B443F] block mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C7] rounded-lg text-[#1C221F] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-[#EAE3D6]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-[#525B56]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-medium text-white bg-[#7B1E34] hover:bg-[#631326] rounded-lg transition-colors"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
