"use client"
import CounterRedux from "./CounterRedux/page";

export const dynamic = "force-dynamic";

export default function ReduxExamples() {
  return(
    <div>
      <h2>Redux Examples</h2>
      <CounterRedux />
    </div>
  );
};
