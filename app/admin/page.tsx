import Link from 'next/link';

interface Campaign {
  id: number;
  name: string;
  status: 'Active' | 'Closed';
  fundingGoal: number;
  fundingRaised: number;
}

const placeholderCampaigns: Campaign[] = [
  { id: 1, name: 'Campaign Alpha', status: 'Active', fundingGoal: 10000, fundingRaised: 7500 },
  { id: 2, name: 'Campaign Beta', status: 'Closed', fundingGoal: 5000, fundingRaised: 5000 },
  { id: 3, name: 'Campaign Gamma', status: 'Active', fundingGoal: 20000, fundingRaised: 12000 },
];

export default function AdminPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Navigation Menu */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Menu</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link href="/admin/edit-profile" className="hover:underline">
                Edit Profile
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/create-campaign" className="hover:underline">
                Create Campaign
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/analytics" className="hover:underline">
                Analytics
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8">Your Campaigns</h1>

        {placeholderCampaigns.length === 0 ? (
          <p>You have no campaigns yet. Create one to get started!</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {placeholderCampaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{campaign.name}</h3>
                <p className={`mb-2 ${campaign.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                  Status: {campaign.status}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(campaign.fundingRaised / campaign.fundingGoal) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  ${campaign.fundingRaised} raised of ${campaign.fundingGoal}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}