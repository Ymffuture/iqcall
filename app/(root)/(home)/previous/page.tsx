'use client';

import CallList from '@/components/CallList';

const PreviousPage = () => {
  return (
    <section className="w-full px-4 py-6 text-white">
      <div className="mx-auto max-w-6xl rounded-xl bg-dark-2 p-6 shadow-md">
        <header className="mb-6 border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            📞 Previous Calls
          </h1>
          <p className="text-sm text-gray-400">List of ended meetings with time, host, and status.</p>
        </header>

        {/* Styled card container */}
        <div className="overflow-hidden rounded-lg border border-gray-700 bg-dark-3 shadow-inner">
          <table className="min-w-full divide-y divide-gray-700 text-sm">
            <thead className="bg-dark-4">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-blue-400 uppercase tracking-wider">
                  Topic
                </th>
                <th className="px-6 py-3 text-left font-semibold text-blue-400 uppercase tracking-wider">
                  Host
                </th>
                <th className="px-6 py-3 text-left font-semibold text-blue-400 uppercase tracking-wider">
                  Ended At
                </th>
                <th className="px-6 py-3 text-left font-semibold text-blue-400 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left font-semibold text-blue-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              <CallList type="ended" />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PreviousPage;

