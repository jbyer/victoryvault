import React, { useState } from 'react';

const CreateCampaign501c4Form = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [ein, setEin] = useState('');
  const [purpose, setPurpose] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle 501(c)(4) campaign creation logic here
    console.log('501(c)(4) Campaign Submitted', {
      organizationName,
      ein,
      purpose,
      address,
      contactInfo,
    });
    // Reset form or redirect
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">
          Organization Name
        </label>
        <input
          type="text"
          id="organizationName"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="ein" className="block text-sm font-medium text-gray-700">
          EIN (Employer Identification Number)
        </label>
        <input
          type="text"
          id="ein"
          value={ein}
          onChange={(e) => setEin(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
          Purpose/Activities
        </label>
        <textarea
          id="purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        ></textarea>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >Create Campaign</button>

    </form>
  );
};

export default CreateCampaign501c4Form;
'use client';

import { useState } from 'react';
import CreateCampaign501c3Form from '@/components/create-campaign-501c3-form';

export default function CreateCampaignPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [campaignType, setCampaignType] = useState<string | null>(null);
  const [fundingGoal, setFundingGoal] = useState('');
  const [mediaType, setMediaType] = useState<'photo' | 'video'>('photo');
  const [files, setFiles] = useState<FileList | null>(null);
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle campaign creation logic here
    console.log('Campaign Submitted', {
      title,
      description,
      fundingGoal,
      mediaType,
      files,
      videoUrl,
    });
    // Reset form or redirect
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8"> <h1 className="text-2xl font-bold mb-6">Create New Campaign</h1>

      {!campaignType ? (
        <div className="space-y-4">
          <p className="text-lg">Select the type of campaign you want to create:</p>
          <div className="space-y-2">
            <button
              onClick={() => setCampaignType('Candidate')}
              className="block w-full rounded-md border border-gray-300 py-2 px-4 text-center hover:bg-gray-50"
            >
              Candidate
            </button>
            <button
              onClick={() => setCampaignType('Cause')}
              className="block w-full rounded-md border border-gray-300 py-2 px-4 text-center hover:bg-gray-50"
            >
              Cause
            </button>
            <button
              onClick={() => setCampaignType('Political Organization')}
              className="block w-full rounded-md border border-gray-300 py-2 px-4 text-center hover:bg-gray-50"
            >
              Political Organization
            </button>
            <button
              onClick={() => setCampaignType('501(c)(3)')}
              className="block w-full rounded-md border border-gray-300 py-2 px-4 text-center hover:bg-gray-50"
            >
              501(c)(3)
            </button>
            <button
              onClick={() => setCampaignType('501(c)(4)')}
              className="block w-full rounded-md border border-gray-300 py-2 px-4 text-center hover:bg-gray-50"
            >
              501(c)(4)
            </button>
          </div>
        </div>
      ) : (
        campaignType === '501(c)(3)' ? (
          <CreateCampaign501c3Form />
        ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Campaign or Cause Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Campaign or Cause Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="fundingGoal" className="block text-sm font-medium text-gray-700">
              Funding Goal ($)
            </label>
            <input
              type="number"
              id="fundingGoal"
              value={fundingGoal}
              onChange={(e) => setFundingGoal(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="mediaType" className="block text-sm font-medium text-gray-700">
              Media
            </label>
            <select
              id="mediaType"
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as 'photo' | 'video')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="photo">Upload Photos</option>
              <option value="video">Add Video URL</option>
            </select>
          </div>

          {mediaType === 'photo' && (
            <div>
              <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
                Upload Photos
              </label>
              <input
                type="file"
                id="photos"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
          )}

          {mediaType === 'video' && (
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
                Video URL (YouTube or Vimeo)
              </label>
              <input
                type="url"
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          )}

          <button type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >Create Campaign</button>
        </form>
        )
      )}
    </div>
  );
}
