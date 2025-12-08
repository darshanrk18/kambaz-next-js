"use client";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import * as client from "../../client";
import PeopleTable from "./Table";

export default function People() {
  const { cid } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const users = await client.findUsersForCourse(cid as string);
      setUsers(users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  }, [cid]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}