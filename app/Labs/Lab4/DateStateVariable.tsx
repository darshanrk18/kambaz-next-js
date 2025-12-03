"use client";
import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
export default function DateStateVariable() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    setStartDate(new Date());
  }, []);
  
  const dateObjectToHtmlDateString = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };
  
  if (!mounted || !startDate) {
    return (
      <div id="wd-date-state-variables">
        <h2>Date State Variables</h2>
        <h3>Loading...</h3>
        <FormControl type="date" disabled />
        <hr />
      </div>
    );
  }
  
  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>
      <h3>{JSON.stringify(startDate)}</h3>
      <h3>{dateObjectToHtmlDateString(startDate)}</h3>
      <FormControl
        type="date"
        value={dateObjectToHtmlDateString(startDate)}
        onChange={(e) => setStartDate(new Date(e.target.value))}
      />
      <hr />
    </div>
  );
}
