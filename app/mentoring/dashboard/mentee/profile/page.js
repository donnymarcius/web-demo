'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useSession } from 'next-auth/react';

// Reusable EditableField Component
const EditableField = ({ label, value, onChange, isDropdown = false, options = [], disabled, isTextArea = false, customTextColor = '' }) => {
  const handleInputChange = (e) => {
    e.target.style.height = 'auto'; // Reset height to auto
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to the scrollHeight to expand automatically
    onChange(e.target.value); // Call the onChange handler passed as prop
  };

  return (
    <div className="pl-4 py-2 flex gap-4 items-center">
      <h3 className="w-56">{label}</h3>
      {isDropdown ? (
        <select
          className={`border border-green-800 rounded-md px-2 py-1 w-full text-sm ${disabled ? 'bg-gray-200' : 'text-black'} peer`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          {options.map((option) => (
            <option key={option} value={option} className='text-black'>
              {option}
            </option>
          ))}
        </select>
      ) : isTextArea ? (
        <textarea
          className={`border border-green-800 rounded-md px-2 py-1 w-full text-sm resize-none ${disabled ? 'bg-gray-200' : ''}`}
          value={value}
          onChange={handleInputChange}
          onInput={handleInputChange} // Dynamically adjust the height on input
          disabled={disabled}
          style={{ height: 'auto', minHeight: '3rem' }} // Ensure a minimum height of 3rem but expand as needed
        />
      ) : (
        <input
          type="text"
          className={`border border-green-800 rounded-md px-2 py-1 w-full text-sm ${disabled ? 'bg-gray-200' : ''} ${customTextColor}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default function MenteeProfile() {
  const { data: session, status } = useSession();
  const [menteeData, setMenteeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!session) return;
    const fetchMenteeData = async () => {
      try {
        const response = await fetch(`/api/userMentee?email=${session.user.email}`);
        const data = await response.json();

        if (response.ok) {
          setMenteeData(data);
        } else {
          console.error('Failed to fetch mentee data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching mentee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenteeData();
  }, [session]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Please log in to view your profile.</p>;
  }

  if (loading) {
    return <p>Loading mentee data...</p>;
  }

  if (!menteeData) {
    return <p>Error loading mentee data. Please try again.</p>;
  }

  const handleFieldChange = (field, value) => {
    setMenteeData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const updates = Object.entries(menteeData);
      for (const [field, value] of updates) {
        const response = await fetch(`/api/updateMenteeField`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: session.user.email,
            field,
            value,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Failed to update ${field}:`, errorData.message);
          alert(`Error updating ${field}: ${errorData.message}`);
          return;
        }
      }

      console.log('All fields updated successfully.');
      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error.message);
      alert('An unexpected error occurred. Please try again.');
    }

    setIsEditing(false);
  };

  const toggleEditing = () => {
    if (isEditing) {
      handleSave();
    }
    setIsEditing(!isEditing);
  };

  const { fullName, gender, wa_number, role, affiliation, almamater, category, field_of_interest, description, linkedin_username, profile_picture } =
    menteeData;

  return (
    <div className="overflow-x-hidden">
      <div className="relative h-[30vh]">
        <Image
          src="/images/mentoring/bg.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="absolute inset-0 px-10 flex justify-between items-end pb-4">
          <div className="flex gap-2 text-white">
            <Link href="/mentoring">
              <p>Mentoring Home</p>
            </Link>
            <p>&gt;</p>
            <p>Dashboard</p>
          </div>
          <div className="flex justify-end items-center gap-4">
            <p className="text-white font-bold">Hi, {fullName}!</p>
          </div>
        </div>
      </div>

      <div className="px-10 flex flex-wrap gap-8 mt-6">
        <div className="side-menu">
          <div className="side-menu-item">
            <Image
              src="/images/icon/person-green.png"
              alt="Profile Icon"
              width={400}
              height={400}
              className="h-full w-auto"
            />
            <p>Profile</p>
          </div>
          <Link href="/mentoring/dashboard/mentee/schedule">
            <div className="side-menu-item">
              <Image
                src="/images/icon/calendar-green.png"
                alt="Schedule Icon"
                width={400}
                height={400}
                className="h-full w-auto"
              />
              <p>Scheduled Sessions</p>
            </div>
          </Link>

          <Link href="/mentoring/dashboard/mentee/setting">
            <div className="side-menu-item">
              <Image
                src="/images/icon/setting-green.png"
                alt="Setting Icon"
                width={400}
                height={400}
                className="h-full w-auto"
              />
              <p>Manage Account</p>
            </div>
          </Link>
        </div>

        <div className="flex-1 min-w-96">
          <div className="flex justify-between items-center mb-4">
            <h2>Profile</h2>
            <button
              onClick={toggleEditing}
              className="bg-green-800 text-white px-4 py-2 rounded-md"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>

          <div className="pl-4 py-2 flex gap-2 items-center">
            <h3 className="w-56">Profile Picture</h3>
            <Image
              src={profile_picture || "/images/placeholder_person.png"}
              alt="Profile Picture"
              width={400}
              height={400}
              className="h-24 w-24 rounded-full"
              style={{ border: '2px solid var(--synbio-green)' }}
            />
          </div>

          <EditableField
            label="Full Name"
            value={fullName}
            onChange={(value) => handleFieldChange('fullName', value)}
            disabled={!isEditing}
          />
          <EditableField
            label="Gender"
            value={gender}
            onChange={(value) => handleFieldChange('gender', value)}
            isDropdown={true}
            options={['Male', 'Female']}
            disabled={!isEditing}
          />
          <EditableField
            label="Active WA Number"
            value={wa_number}
            onChange={(value) => handleFieldChange('wa_number', value)}
            disabled={!isEditing}
          />
          <EditableField
            label="Role"
            value={role}
            onChange={(value) => handleFieldChange('role', value)}
            disabled={!isEditing}
          />
          <EditableField
            label="Affiliation"
            value={affiliation}
            onChange={(value) => handleFieldChange('affiliation', value)}
            disabled={!isEditing}
          />
          <EditableField
            label="Alma mater"
            value={almamater}
            onChange={(value) => handleFieldChange('almamater', value)}
            disabled={!isEditing}
            isTextArea={true} // Allow multi-line input
          />
          <EditableField
            label="Category"
            value={category}
            onChange={(value) => handleFieldChange('category', value)}
            disabled={!isEditing}
          />
          <EditableField
            label="Field of Interest"
            value={field_of_interest}
            onChange={(value) => handleFieldChange('field_of_interest', value)}
            disabled={!isEditing}
          />
          <EditableField
            label="Linkedin Username"
            value={linkedin_username}
            onChange={(value) => handleFieldChange('linkedin_username', value)}
            disabled={!isEditing}
          />
          <EditableField
            label="Self Description"
            value={description}
            onChange={(value) => handleFieldChange('description', value)}
            disabled={!isEditing}
            isTextArea={true} // Allow multi-line input
          />
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}