import React from 'react';

const AnalyticsPage = () => {
  // Placeholder data for campaigns and analytics
  const campaigns = [
    { id: 1, name: 'Campaign Alpha', status: 'Active', donations: 1500, visitors: 5000 },
    { id: 2, name: 'Campaign Beta', status: 'Completed', donations: 5000, visitors: 10000 },
    { id: 3, name: 'Campaign Gamma', status: 'Paused', donations: 500, visitors: 1000 },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left Navigation (Placeholder - replace with your actual navigation component) */}
      <aside className="w-64 bg-gray-100 p-6">
        <nav>
          <ul>
            <li className="mb-4">
              <a href="/admin/edit-profile" className="text-blue-600 hover:underline">Edit Profile</a>
            </li>
            <li className="mb-4">
              <a href="/admin/create-campaign" className="text-blue-600 hover:underline">Create Campaign</a>
            </li>
            <li className="mb-4">
              <a href="/admin/analytics" className="text-blue-600 hover:underline">Analytics</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Campaign Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map(campaign => (
            <div key={campaign.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{campaign.name}</h2>
              <p className="text-gray-600 mb-4">Status: {campaign.status}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium">Donations</h3>
                  <p className="text-gray-800">${campaign.donations.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Visitors</h3>
                  <p className="text-gray-800">{campaign.visitors.toLocaleString()}</p>
                </div>
              </div>
              {/* Add more specific analytics for each campaign here */}
            </div>
          ))}
        </div>

        {/* Add more detailed analytics sections here if needed */}
      </main>
    </div>
  );
};

export default AnalyticsPage;