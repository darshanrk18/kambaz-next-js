"use client";
import { ReactNode } from "react";
import TOC from "./TOC";
import LabsProviders from "./Providers";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <LabsProviders>
      <table>
        <tbody>
          <tr>
            <td valign="top" width="100px">
              <TOC />
            </td>
            <td valign="top">{children}</td>
          </tr>
        </tbody>
      </table>
    </LabsProviders>
  );
}