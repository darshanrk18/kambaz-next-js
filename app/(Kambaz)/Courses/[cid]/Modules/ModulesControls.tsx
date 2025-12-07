import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { MdDoNotDisturbAlt } from "react-icons/md";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
  collapseAll,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
  collapseAll: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex justify-content-end mb-3 gap-2">
      <Button variant="secondary" onClick={collapseAll}>
        Collapse All
      </Button>
      <Button variant="secondary">View Progress</Button>
      <Dropdown>
        <DropdownToggle variant="secondary">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem>
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem>
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem>
            <MdDoNotDisturbAlt /> Unpublish all modules and items
          </DropdownItem>
          <DropdownItem>
            <MdDoNotDisturbAlt /> Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button variant="danger" onClick={handleShow}>
        <FaPlus className="me-2" style={{ position: "relative", bottom: "1px" }} />
        Module
      </Button>
      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}