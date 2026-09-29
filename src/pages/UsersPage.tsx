import React, { useState } from 'react';
import { TeamMember } from '../types';
import { storageService } from '../services/storage';
import { UserPlus, Shield, User, Trash2, ArrowUpDown } from 'lucide-react';

interface UsersPageProps {
  showToast: (msg: string) => void;
}

export const UsersPage: React.FC<UsersPageProps> = ({ showToast }) => {
  const [team, setTeam] = useState<TeamMember[]>(() => storageService.getTeam());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const [preferredModel, setPreferredModel] = useState('GPT-4o');

  const adminCount = team.filter((m) => m.role === 'admin').length;
  const activeCount = team.filter((m) => m.status === 'Active').length;
  const totalTokens = team.reduce((acc, m) => acc + m.tokensUsed, 0);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showToast('Please enter both name and email');
      return;
    }

    const created = storageService.addTeamMember({
      name: name.trim(),
      email: email.trim(),
      role,
      status: 'Active',
      preferredModel,
    });

    setTeam(storageService.getTeam());
    setIsModalOpen(false);
    setName('');
    setEmail('');
    showToast(`Added ${created.name} as ${created.role.toUpperCase()}`);
  };

  const handleToggleRole = (member: TeamMember) => {
    const newRole = member.role === 'admin' ? 'user' : 'admin';
    storageService.updateMemberRole(member.id, newRole);
    setTeam(storageService.getTeam());
    showToast(`Updated ${member.name}'s role to ${newRole.toUpperCase()}`);
  };

  const handleDeleteMember = (id: string, memberName: string) => {
    if (team.length <= 1) {
      showToast('Cannot delete the only team member');
      return;
    }
    storageService.deleteTeamMember(id);
    setTeam(storageService.getTeam());
    showToast(`Removed ${memberName}`);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8">
      {/* Title & Subtitle + Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-950 dark:text-white">
              User & Team Management
            </h1>
            <span className="text-[11px] font-semibold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded">
              ADMIN ONLY
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Control workspace member permissions, roles, and model access policies.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors shadow-2xs self-start sm:self-auto"
        >
          <UserPlus size={14} /> Invite Member
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-blue-600 rounded-xl p-5 shadow-2xs">
          <div className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            {team.length}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Total Team Members
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-purple-600 rounded-xl p-5 shadow-2xs">
          <div className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            {adminCount}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Workspace Admins
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-emerald-500 rounded-xl p-5 shadow-2xs">
          <div className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            {activeCount}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Active Accounts
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 border-l-4 border-l-amber-500 rounded-xl p-5 shadow-2xs">
          <div className="text-2xl font-bold text-gray-950 dark:text-white mb-1">
            {totalTokens.toLocaleString()}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Total Tokens Consumed
          </p>
        </div>
      </div>

      {/* Team Table */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200/90 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-slate-800 text-xs font-semibold text-gray-400 dark:text-gray-500">
                <th className="py-4 px-6 font-semibold">User</th>
                <th className="py-4 px-6 font-semibold">Role</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold">Tokens Used</th>
                <th className="py-4 px-6 font-semibold">Default Model</th>
                <th className="py-4 px-6 font-semibold">Joined Date</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {team.map((member) => {
                const initials = member.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2);

                return (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50/60 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
                          {initials}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">
                            {member.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          member.role === 'admin'
                            ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                            : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700'
                        }`}
                      >
                        {member.role === 'admin' ? (
                          <Shield size={11} className="text-purple-600 dark:text-purple-400" />
                        ) : (
                          <User size={11} className="text-gray-500" />
                        )}
                        {member.role.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            member.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'
                          }`}
                        />
                        <span>{member.status}</span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs font-mono text-gray-600 dark:text-gray-300">
                      {member.tokensUsed.toLocaleString()}
                    </td>

                    <td className="py-4 px-6 text-xs text-gray-600 dark:text-gray-300 font-medium">
                      {member.preferredModel}
                    </td>

                    <td className="py-4 px-6 text-xs text-gray-400 whitespace-nowrap">
                      {member.joinedDate}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleRole(member)}
                          className="text-xs text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                          title="Toggle role"
                        >
                          <ArrowUpDown size={12} />
                          <span>{member.role === 'admin' ? 'Set as User' : 'Make Admin'}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteMember(member.id, member.name)}
                          className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                          title="Remove member"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 z-50 flex items-center justify-center p-4 backdrop-blur-2xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-gray-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Invite Team Member
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Add a team member to access shared multi-model context.
            </p>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Blake"
                  required
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@company.com"
                  required
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'admin' | 'user')}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white"
                  >
                    <option value="user">User (Member)</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Model
                  </label>
                  <select
                    value={preferredModel}
                    onChange={(e) => setPreferredModel(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white"
                  >
                    <option value="GPT-4o">GPT-4o</option>
                    <option value="Claude 3.5">Claude 3.5</option>
                    <option value="Gemini 1.5">Gemini 1.5</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-sm px-5 py-2 rounded-lg"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
