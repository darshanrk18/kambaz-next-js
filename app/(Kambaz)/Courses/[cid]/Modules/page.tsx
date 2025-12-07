"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import * as coursesClient from "../../client";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [modules, setModules] = useState<any[]>([]);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [collapsedModules, setCollapsedModules] = useState<Set<string>>(
    new Set()
  );

  const fetchModules = async () => {
    const fetchedModules = await coursesClient.findModulesForCourse(
      cid as string
    );
    setModules(fetchedModules);
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  const createModuleForCourse = async () => {
    if (!moduleName.trim()) return;
    const newModule = { name: moduleName, course: cid, lessons: [] };
    await coursesClient.createModuleForCourse(cid as string, newModule);
    setModuleName("");
    fetchModules();
  };

  const removeModule = async (moduleId: string) => {
    if (window.confirm("Are you sure you want to delete this module?")) {
      await coursesClient.deleteModule(cid as string, moduleId);
      fetchModules();
    }
  };

  const updateModuleName = async (moduleId: string, newName: string) => {
    if (!newName.trim()) return;
    const moduleUpdates = { _id: moduleId, name: newName };
    await coursesClient.updateModule(cid as string, moduleUpdates);
    setEditingModuleId(null);
    fetchModules();
  };

  const toggleModuleCollapse = (moduleId: string) => {
    setCollapsedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const collapseAll = () => {
    setCollapsedModules(new Set(modules.map((m) => m._id)));
  };

  return (
    <div id="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={createModuleForCourse}
        collapseAll={collapseAll}
      />
      <br />
      <ul className="list-group rounded-0">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {modules.map((module: any) => (
          <li key={module._id} className="list-group-item p-0 mb-5 border-gray">
            <div className="p-3 ps-2 bg-secondary">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  {collapsedModules.has(module._id) ? (
                    <FaCaretRight
                      className="me-2"
                      style={{ cursor: "pointer", fontSize: "1.5rem" }}
                      onClick={() => toggleModuleCollapse(module._id)}
                    />
                  ) : (
                    <FaCaretDown
                      className="me-2"
                      style={{ cursor: "pointer", fontSize: "1.5rem" }}
                      onClick={() => toggleModuleCollapse(module._id)}
                    />
                  )}
                  {editingModuleId === module._id ? (
                    <input
                      className="form-control d-inline-block w-auto"
                      defaultValue={module.name}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateModuleName(module._id, e.currentTarget.value);
                        }
                      }}
                      onBlur={(e) => {
                        updateModuleName(module._id, e.currentTarget.value);
                      }}
                      autoFocus
                    />
                  ) : (
                    <strong>{module.name}</strong>
                  )}
                </div>
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={() => removeModule(module._id)}
                  editModule={() => setEditingModuleId(module._id)}
                />
              </div>
            </div>
            {!collapsedModules.has(module._id) &&
              module.lessons &&
              module.lessons.length > 0 && (
                <ul className="list-group rounded-0">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {module.lessons.map((lesson: any) => (
                    <li
                      key={lesson._id}
                      className="list-group-item p-3 ps-1 border-0"
                      style={{
                        borderLeft: "4px solid green",
                        backgroundColor: "white",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <BsGripVertical className="me-3 fs-5" />
                          <span>{lesson.name}</span>
                        </div>
                        <LessonControlButtons />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}