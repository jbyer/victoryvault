// 'use client';

// import { useState } from 'react';

// export default function CreateCampaignPage() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [fundingGoal, setFundingGoal] = useState('');
//   const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
//   const [files, setFiles] = useState<FileList | null>(null);
//   const [videoUrl, setVideoUrl] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle campaign creation logic here
//     console.log('Campaign Submitted', {
//       title,
//       description,
//       fundingGoal,
//       mediaType,
//       files,
//       videoUrl,
//     });
//     // Reset form or redirect
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(e.target.files);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//             Campaign Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//             Campaign Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             rows={4}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             required
//           ></textarea>
//         </div>

//         <div>
//           <label htmlFor="fundingGoal" className="block text-sm font-medium text-gray-700">
//             Funding Goal ($)
//           </label>
//           <input
//             type="number"
//             id="fundingGoal"
//             value={fundingGoal}
//             onChange={(e) => setFundingGoal(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="mediaType" className="block text-sm font-medium text-gray-700">
//             Campaign Media
//           </label>
//           <select
//             id="mediaType"
//             value={mediaType}
//             onChange={(e) => setMediaType(e.target.value as 'photo' | 'video')}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           >
//             <option value="photo">Upload Photos</option>
//             <option value="video">Add Video URL</option>
//           </select>
//         </div>

//         {mediaType === 'photo' && (
//           <div>
//             <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
//               Upload Photos
//             </label>
//             <input
//               type="file"
//               id="photos"
//               accept="image/*"
//               multiple
//               onChange={handleFileChange}
//               className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//             />
//           </div>
//         )}

//         {mediaType === 'video' && (
//           <div>
//             <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
//               Video URL (YouTube or Vimeo)
//             </label>
//             <input
//               type="url"
//               id="videoUrl"
//               value={videoUrl}
//               onChange={(e) => setVideoUrl(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             />
//           </div>
//         )}

//         <button
//           type="submit"
//           className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Create Campaign
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCampaignPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fundingGoal, setFundingGoal] = useState("");
  const [mediaType, setMediaType] = useState<"photo" | "video">("photo");
  const [files, setFiles] = useState<FileList | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API_BASE_URL;
  const KEY = process.env.NEXT_PUBLIC_API_KEY;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // build the body per docs:
      const payload: any = {
        title,
        description,
        goal: Number(fundingGoal),
        end_date: new Date().getFullYear(),     // no end_date field in form, so default to current year
        photo:
          mediaType === "photo" && files && files[0]
            ? files[0].name
            : mediaType === "video"
            ? videoUrl
            : "",
        email: "olamide@gmail.com",              // adjust as needed, e.g. from user session
      };

      const res = await fetch(`${API}/api/v1/create_campaign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // try to pull the error message from the JSON response
        let msg = "Failed to create campaign";
        try {
          const err = await res.json();
          msg = err.message || msg;
        } catch {}
        throw new Error(msg);
      }

      const data = await res.json();
      // docs say response has campaign.id
      router.push(`/campaigns/${data.campaign.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Campaign Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Campaign Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Goal */}
        <div>
          <label htmlFor="fundingGoal" className="block text-sm font-medium text-gray-700">
            Funding Goal ($)
          </label>
          <input
            id="fundingGoal"
            type="number"
            value={fundingGoal}
            onChange={(e) => setFundingGoal(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Media Type */}
        <div>
          <label htmlFor="mediaType" className="block text-sm font-medium text-gray-700">
            Campaign Media
          </label>
          <select
            id="mediaType"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value as "photo" | "video")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="photo">Upload Photo</option>
            <option value="video">Video URL</option>
          </select>
        </div>

        {/* Photo upload */}
        {mediaType === "photo" && (
          <div>
            <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
              Upload Photo
            </label>
            <input
              id="photos"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500"
            />
          </div>
        )}

        {/* Video URL */}
        {mediaType === "video" && (
          <div>
            <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
              Video URL
            </label>
            <input
              id="videoUrl"
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
        >
          {isLoading ? "Creating..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
}
