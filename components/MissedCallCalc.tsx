"use client";

import { useState } from "react";

const WEEKS_PER_MONTH = 52 / 12;

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: {
  id: string;
  label: string;
  hint: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[15px] font-semibold">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {prefix && <span className="text-muted">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => {
            const n = parseFloat(e.target.value);
            onChange(Number.isFinite(n) ? Math.min(Math.max(n, min), max) : 0);
          }}
          className="tnum w-full rounded-xl border border-line bg-transparent px-4 py-3 text-[17px] focus:outline-none focus:ring-2 focus:ring-brand"
        />
        {suffix && <span className="text-muted">{suffix}</span>}
      </div>
      <p className="text-[13px] text-muted">{hint}</p>
    </div>
  );
}

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function MissedCallCalc() {
  const [calls, setCalls] = useState(20);
  const [missed, setMissed] = useState(20);
  const [book, setBook] = useState(40);
  const [job, setJob] = useState(450);

  const missedMonth = calls * WEEKS_PER_MONTH * (missed / 100);
  const lostJobs = missedMonth * (book / 100);
  const lostMonth = lostJobs * job;

  return (
    <div className="card grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.1fr_1fr]">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="calls"
          label="Calls a week"
          hint="Roughly how many people call you each week."
          value={calls}
          onChange={setCalls}
          min={0}
          max={2000}
          step={1}
        />
        <Field
          id="missed"
          label="Calls you miss"
          hint="Your honest guess. Check your phone log if you can."
          value={missed}
          onChange={setMissed}
          min={0}
          max={100}
          step={1}
          suffix="%"
        />
        <Field
          id="book"
          label="Answered calls that book"
          hint="Out of the calls you do pick up."
          value={book}
          onChange={setBook}
          min={0}
          max={100}
          step={1}
          suffix="%"
        />
        <Field
          id="job"
          label="Average job"
          hint="What a typical booked job is worth to you."
          value={job}
          onChange={setJob}
          min={0}
          max={1000000}
          step={10}
          prefix="$"
        />
      </div>

      <div className="card-dark flex flex-col justify-center gap-5 p-7" aria-live="polite">
        <div>
          <p className="text-[14px] text-muted">Missed calls a month</p>
          <p className="tnum font-display text-[2rem] font-extrabold leading-tight">
            {Math.round(missedMonth).toLocaleString("en-US")}
          </p>
        </div>
        <div>
          <p className="text-[14px] text-muted">Jobs those calls would likely have booked</p>
          <p className="tnum font-display text-[2rem] font-extrabold leading-tight">
            {lostJobs.toLocaleString("en-US", { maximumFractionDigits: 1 })}
          </p>
        </div>
        <div className="border-t border-white/15 pt-5">
          <p className="text-[14px] text-muted">Work walking to someone else each month</p>
          <p className="tnum font-display text-[2.8rem] font-extrabold leading-none text-mint">
            {usd(lostMonth)}
          </p>
          <p className="mt-2 text-[14px] text-muted">{usd(lostMonth * 12)} a year</p>
        </div>
      </div>
    </div>
  );
}
