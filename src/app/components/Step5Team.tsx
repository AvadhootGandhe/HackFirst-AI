import { motion, AnimatePresence } from "motion/react";
import { StepLayout } from "./StepLayout";
import { X } from "lucide-react";

const dummyUsers = [
  { id: "1", name: "Alex Johnson", role: "Full Stack Dev", avatar: "#007AFF", online: true },
  { id: "2", name: "Sarah Lee", role: "UI/UX Designer", avatar: "#34C759", online: true },
  { id: "3", name: "Mike Chen", role: "ML Engineer", avatar: "#FF7A00", online: false },
  { id: "4", name: "Emma Davis", role: "Product Manager", avatar: "#AF52DE", online: true },
  { id: "5", name: "David Wilson", role: "Backend Dev", avatar: "#FF453A", online: false },
  { id: "6", name: "Sophia Patel", role: "Data Scientist", avatar: "#5AC8FA", online: true },
];

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
}

interface Props {
  selected: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step5Team({ selected, onChange, onNext, onBack }: Props) {
  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  };

  const selectedUsers = dummyUsers.filter((u) => selected.includes(u.id));

  return (
    <StepLayout
      stepNumber={5}
      totalSteps={6}
      question="Invite Your Team"
      onNext={onNext}
      onBack={onBack}
    >
      {/* Selected members pill strip */}
      <AnimatePresence>
        {selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-5 overflow-hidden"
          >
            <div
              className="p-3 rounded-[16px] flex flex-wrap gap-2"
              style={{ background: "#FAFAFA", border: "1px solid #E5E7EB" }}
            >
              {selectedUsers.map((u) => (
                <motion.div
                  key={u.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                  style={{ background: "#FFFFFF", border: "1px solid #E5E7EB" }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: u.avatar, fontSize: "0.55rem", color: "#fff", fontWeight: 700 }}
                  >
                    {initials(u.name)}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "#111111", fontWeight: 500 }}>{u.name.split(" ")[0]}</span>
                  <button
                    onClick={() => toggle(u.id)}
                    className="cursor-pointer"
                    style={{ color: "#9CA3AF", display: "flex", alignItems: "center" }}
                  >
                    <X size={11} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {dummyUsers.map((user, i) => {
          const isSelected = selected.includes(user.id);
          return (
            <motion.button
              key={user.id}
              onClick={() => toggle(user.id)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 p-4 rounded-[16px] text-left cursor-pointer"
              style={{
                background: isSelected ? "rgba(0,122,255,0.03)" : "#FAFAFA",
                border: isSelected ? "1.5px solid #007AFF" : "1.5px solid #E5E7EB",
                boxShadow: isSelected ? "0 2px 8px rgba(0,122,255,0.06)" : "none",
              }}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-11 h-11 rounded-[14px] flex items-center justify-center"
                  style={{ background: user.avatar, fontSize: "0.8rem", color: "#fff", fontWeight: 700 }}
                >
                  {initials(user.name)}
                </div>
                {/* Online indicator */}
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
                  style={{ background: user.online ? "#34C759" : "#D1D5DB" }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: isSelected ? "#007AFF" : "#111111", letterSpacing: "-0.01em" }}>
                  {user.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>{user.role}</div>
              </div>

              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#007AFF", fontSize: "0.65rem", color: "#fff" }}
                >
                  ✓
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </StepLayout>
  );
}
