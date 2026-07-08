"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function buildMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function MonthGrid({
  year,
  month,
  label,
  selectedStart,
  selectedEnd,
  unavailableDays = [],
}: {
  year: number;
  month: number;
  label: string;
  selectedStart?: number;
  selectedEnd?: number;
  unavailableDays?: number[];
}) {
  const cells = buildMonth(year, month);
  const rows = Math.ceil(cells.length / 7);

  // Column (0-6) for a given day-of-month
  const colOf = (day: number) => cells.indexOf(day) % 7;
  const rowOf = (day: number) => Math.floor(cells.indexOf(day) / 7);

  const hasRange = selectedStart !== undefined && selectedEnd !== undefined;
  const startRow = hasRange ? rowOf(selectedStart!) : -1;
  const endRow = hasRange ? rowOf(selectedEnd!) : -1;
  const sameRow = hasRange && startRow === endRow;

  return (
    <div className="flex-1">
      <p className="text-sm font-semibold text-center mb-4">{label}</p>
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-neutral-500 mb-2">
        {WEEKDAYS.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>

      <div className="relative grid grid-cols-7" style={{ gridTemplateRows: `repeat(${rows}, 36px)` }}>
        {/* Continuous highlight strip behind the selected range, spanning column-center to column-center */}
        {sameRow && (
          <div
            className="absolute bg-neutral-100 pointer-events-none"
            style={{
              top: `${startRow * 36}px`,
              left: `calc(${(colOf(selectedStart!) + 0.5) * (100 / 7)}%)`,
              width: `calc(${(colOf(selectedEnd!) - colOf(selectedStart!)) * (100 / 7)}%)`,
              height: "36px",
            }}
          />
        )}

        {cells.map((day, i) => {
          const isEndpoint = day === selectedStart || day === selectedEnd;
          const isUnavailable = day !== null && unavailableDays.includes(day);
          return (
            <div key={i} className="relative flex items-center justify-center h-9">
              {day && (
                <button
                  disabled={isUnavailable}
                  className={`a11y-focus relative z-10 w-9 h-9 rounded-full text-sm transition-colors ${
                    isEndpoint
                      ? "bg-neutral-900 text-white font-medium"
                      : isUnavailable
                      ? "text-neutral-300 line-through cursor-not-allowed"
                      : "hover:bg-neutral-100"
                  }`}
                >
                  {day}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Calendar({
  checkInDay,
  checkOutDay,
  nights,
  monthLabel1,
  monthLabel2,
  year,
  month,
}: {
  checkInDay: number;
  checkOutDay: number;
  nights: number;
  monthLabel1: string;
  monthLabel2: string;
  year: number;
  month: number;
}) {
  const [cleared, setCleared] = useState(false);

  const secondMonthUnavailable = [18, 19, 20, 21, 22, 23, 29, 30];

  return (
    <div className="py-6 border-b border-neutral-200 w-[90%] mt-4">
      <h2 className="text-xl font-semibold text-neutral-900">
        {nights} nights in Candolim
      </h2>
      <p className="text-sm text-neutral-500 mt-1 mb-6">
        {cleared ? "Add your travel dates for exact pricing" : `18 Oct ${year} - 23 Oct ${year}`}
      </p>

      <div className="flex items-center justify-between mb-2">
        <button aria-label="Previous month" className="a11y-focus flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral-100 transition-colors">
          <ChevronLeft size={16} />
        </button>
        <button aria-label="Next month" className="a11y-focus flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral-100 transition-colors ml-auto">
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <MonthGrid
          year={year}
          month={month}
          label={monthLabel1}
          selectedStart={cleared ? undefined : checkInDay}
          selectedEnd={cleared ? undefined : checkOutDay}
        />
        <MonthGrid
          year={year}
          month={month + 1}
          label={monthLabel2}
          unavailableDays={secondMonthUnavailable}
        />
      </div>

      <div className="flex items-center justify-between mt-6">
        {/* <button
          aria-label="Toggle flexible date view"
          className="a11y-focus flex items-center justify-center w-9 h-9 border border-neutral-400 rounded-md hover:bg-neutral-100 transition-colors"
        >
          <LayoutGrid size={16} />
        </button> */}
        <img src="./images/cal.png" alt="calendar" className="h-8" />
        <button
          onClick={() => setCleared((c) => !c)}
          className="a11y-focus text-sm font-medium underline"
        >
          {cleared ? "Reset dates" : "Clear dates"}
        </button>
      </div>
    </div>
  );
}

