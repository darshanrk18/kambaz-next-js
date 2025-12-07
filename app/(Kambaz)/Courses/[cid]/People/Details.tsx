import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as client from "../../../Account/client";
import { FaPencil } from "react-icons/fa6";
import { FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [emailEditing, setEmailEditing] = useState(false);
  const [role, setRole] = useState("");
  const [roleEditing, setRoleEditing] = useState(false);

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  const saveEmail = async () => {
    const updatedUser = { ...user, email };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEmailEditing(false);
  };

  const saveRole = async () => {
    const updatedUser = { ...user, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setRoleEditing(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Check if current user can edit/delete (FACULTY or ADMIN only)
  const canEdit = currentUser && (currentUser.role === "FACULTY" || currentUser.role === "ADMIN");

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(`${user.firstName} ${user.lastName}`);
    setEmail(user.email || "");
    setRole(user.role || "");
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />{" "}
      </button>
      <hr />
      {canEdit && (
        <button
          onClick={() => deleteUser(uid)}
          className="btn btn-danger float-end wd-delete"
        >
          {" "}
          Delete{" "}
        </button>
      )}
      <button
        onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel"
      >
        {" "}
        Cancel{" "}
      </button>
      <div className="text-center mt-2">
        {" "}
        <FaUserCircle className="text-secondary me-2 fs-1" />{" "}
      </div>
      <hr />

      {/* Name editing */}
      <div className="text-danger fs-4 wd-name">
        {!editing && canEdit && (
          <FaPencil
            onClick={() => {
              setName(`${user.firstName} ${user.lastName}`);
              setEditing(true);
            }}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && canEdit && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}
        {!editing && (
          <div className="wd-name" onClick={canEdit ? () => {
            setName(`${user.firstName} ${user.lastName}`);
            setEditing(true);
          } : undefined} style={canEdit ? { cursor: 'pointer' } : { cursor: 'default' }}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editing && (
          <FormControl
            className="w-50 wd-edit-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>

      {/* Role editing */}
      <div className="mt-3">
        <b>Roles:</b>{" "}
        {!roleEditing && canEdit && (
          <FaPencil
            onClick={() => {
              setRole(user.role || "");
              setRoleEditing(true);
            }}
            className="float-end fs-6 wd-edit-role"
          />
        )}
        {roleEditing && canEdit && (
          <FaCheck
            onClick={() => saveRole()}
            className="float-end fs-6 wd-save-role"
          />
        )}
        {!roleEditing && (
          <span className="wd-roles" onClick={canEdit ? () => {
            setRole(user.role || "");
            setRoleEditing(true);
          } : undefined} style={canEdit ? { cursor: 'pointer' } : { cursor: 'default' }}>
            {user.role}
          </span>
        )}
        {roleEditing && (
          <select
            className="form-select mt-2 wd-edit-role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Student</option>
            <option value="TA">TA</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Admin</option>
          </select>
        )}
      </div>

      {/* Email editing */}
      <b>Email:</b>{" "}
      {!emailEditing && canEdit && (
        <FaPencil
          onClick={() => {
            setEmail(user.email || "");
            setEmailEditing(true);
          }}
          className="float-end fs-6 wd-edit-email"
        />
      )}
      {emailEditing && canEdit && (
        <FaCheck
          onClick={() => saveEmail()}
          className="float-end fs-6 wd-save-email"
        />
      )}
      <br />
      {!emailEditing && (
        <span className="wd-email" onClick={canEdit ? () => {
          setEmail(user.email || "");
          setEmailEditing(true);
        } : undefined} style={canEdit ? { cursor: 'pointer' } : { cursor: 'default' }}>
          {user.email}
        </span>
      )}
      {emailEditing && (
        <FormControl
          type="email"
          className="mt-1 wd-edit-email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveEmail();
            }
          }}
        />
      )}
      <br />
      
      <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span>{" "}
      <br />
      <b>Section:</b> <span className="wd-section"> {user.section} </span>{" "}
      <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span>{" "}
    </div>
  );
}