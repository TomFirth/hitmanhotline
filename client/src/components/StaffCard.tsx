import React from 'react';
import { Staff, Seniority } from '../types/game';
import { Shield } from 'lucide-react';
import '../styles/components.css';

interface StaffCardProps {
  staff: Staff;
}

const SeniorityBadge: React.FC<{ seniority: Seniority }> = ({ seniority }) => {
  const colors = {
    [Seniority.JUNIOR]: 'text-gray-400',
    [Seniority.MID]: 'text-blue-400',
    [Seniority.SENIOR]: 'text-hitman-red',
    [Seniority.EXECUTIVE]: 'text-yellow-500',
  };

  return (
    <div className={`flex gap-0.5 ${colors[seniority]}`}>
      <Shield size={10} fill="currentColor" />
      {(seniority === Seniority.MID || seniority === Seniority.SENIOR || seniority === Seniority.EXECUTIVE) && <Shield size={10} fill="currentColor" />}
      {(seniority === Seniority.SENIOR || seniority === Seniority.EXECUTIVE) && <Shield size={10} fill="currentColor" />}
      {seniority === Seniority.EXECUTIVE && <Shield size={10} fill="currentColor" />}
    </div>
  );
};

const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
  const isEmployeeOfMonth = staff.awards?.includes('Employee of the Month');

  return (
    <div className={`staff-card ${
      isEmployeeOfMonth ? 'staff-card-awarded' : 'staff-card-default'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-3">
          <div className="staff-avatar">
            <svg className="w-10 h-10 text-gray-700 mt-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div>
            <h3 className="staff-name-container text-white font-bold text-xl">
              {staff.name}
              {isEmployeeOfMonth && (
                <span title="Employee of the Month" className="award-star"></span>
              )}
            </h3>
            <div className="flex items-center gap-2">
              <span className="staff-type-badge">
                {staff.type}
              </span>
              <SeniorityBadge seniority={staff.seniority} />
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400">Age: {staff.age}</p>
          <p className="staff-salary">${staff.salary}/day</p>
        </div>
      </div>

      {staff.previousJob && (
        <div className="mt-2 text-[10px] text-gray-400 italic">
          Prev: {staff.previousJob}
        </div>
      )}

      {staff.quirk && (
        <div className="mt-1 text-[10px] text-hitman-red font-bold uppercase tracking-tighter">
          QUIRK: {staff.quirk}
        </div>
      )}

      <div className="mt-4">
        <div className="flex justify-between text-[8px] uppercase font-bold text-gray-500 mb-1">
          <span>Exp: {staff.experience}</span>
          <span>Next Tier</span>
        </div>
        <div className="exp-bar-container">
          <div
            className="exp-bar-fill"
            style={{ width: `${Math.min((staff.experience % 1000) / 10, 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {Object.entries(staff.skills).map(([skill, value]) => (
          <div key={skill} className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-500">{skill}</span>
            <div className="skill-bar-container">
              <div
                className="skill-bar-fill"
                style={{ width: `${(value / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className={`status-badge ${
          staff.status === 'IDLE' ? 'bg-green-900 text-green-300' :
          staff.status === 'ON_MISSION' ? 'bg-blue-900 text-blue-300' : 'bg-red-900 text-red-300'
        }`}>
          {staff.status}
        </span>
        <button className="text-xs text-gray-400 hover:text-white underline">
          View Details
        </button>
      </div>
    </div>
  );
};

export default StaffCard;
