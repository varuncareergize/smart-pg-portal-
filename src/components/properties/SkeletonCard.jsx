import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm animate-pulse">
      <div className="h-52 bg-slate-200 m-3 rounded-2xl" />
      <div className="px-5 pb-5 space-y-3">
        <div className="h-5 bg-slate-200 rounded-lg w-3/4" />
        <div className="h-4 bg-slate-100 rounded-lg w-1/2" />
        <div className="flex gap-2">
          <div className="h-6 bg-slate-100 rounded-lg w-14" />
          <div className="h-6 bg-slate-100 rounded-lg w-14" />
          <div className="h-6 bg-slate-100 rounded-lg w-14" />
        </div>
        <div className="h-10 bg-slate-100 rounded-xl w-full mt-4" />
        <div className="flex gap-2 pt-2">
          <div className="h-10 bg-slate-200 rounded-xl flex-1" />
          <div className="h-10 bg-slate-100 rounded-xl flex-1" />
        </div>
      </div>
    </div>
  );
}
