'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useSession } from 'next-auth/react'; // Import useSession to access user session data

// Reusable EditableField Component
const EditableField = ({ label, value, onEdit, isDescription = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(newValue); // Save new value
    }
    setIsEditing(!isEditing); // Toggle editing state
  };

  return (
    <div className={`pl-4 py-2 flex gap-4 items-center ${isDescription ? 'flex-col' : 'flex-row'}`}>
      <h3 className="w-56">{label}</h3>
      {isEditing ? (
        <input
          type="text"
          className="border border-green-800 rounded-md px-2 py-1 w-full text-sm"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
      ) : (
        <div className="border border-green-800 rounded-md px-2 py-1 w-full text-sm">{value}</div> // Smaller text
      )}
      <Image 
        src="/images/icon/edit.png"
        alt="Edit Icon"
        width={400}
        height={400}
        className="h-8 w-8 rounded-lg p-1"
        style={{ background: 'var(--synbio-green)' }}
        onClick={handleEdit}
      />
    </div>
  );
};

export default function MentorProfile() {
  const { data: session, status } = useSession(); // Get session data
  const [mentorData, setMentorData] = useState(null); // To store mentor data
  const [loading, setLoading] = useState(true);

  // Manage the editing state for "Self Description"
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState('');

  useEffect(() => {
    if (!session) return; // If no session, don't fetch data
    const fetchMentorData = async () => {
      try {
        // Use the email from the session to fetch mentor data
        const response = await fetch(`/api/userMentor?email=${session.user.email}`);
        const data = await response.json();

        if (response.ok) {
          setMentorData(data);
          setDescriptionValue(data.description); // Initialize the description value
        } else {
          console.error('Failed to fetch mentor data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching mentor data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorData();
  }, [session]); // Re-run the effect if session changes

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    // If no session, redirect to login page
    return <p>Please log in to view your profile.</p>;
  }

  if (loading) {
    return <p>Loading mentor data...</p>;
  }

  if (!mentorData) {
    return <p>Error loading mentor data. Please try again.</p>;
  }

  const { fullName, gender, wa_number, role, affiliation, almamater, category, field_of_interest, linkedin_url, profile_picture } = mentorData;

  const handleFieldUpdate = async (field, newValue) => {
    try {
      // Update the Google Sheet here
      const response = await fetch(`/api/updateMentorField`, {
        method: 'POST',
        body: JSON.stringify({ email: session.user.email, field, value: newValue }),
      });
      if (response.ok) {
        setMentorData((prevData) => ({ ...prevData, [field]: newValue }));
      } else {
        console.error('Failed to update mentor data');
      }
    } catch (error) {
      console.error('Error updating mentor data:', error);
    }
  };

  const handleDescriptionEdit = () => {
    if (isDescriptionEditing) {
      // Save the new value for description
      handleFieldUpdate('description', descriptionValue);
    }
    setIsDescriptionEditing(!isDescriptionEditing);
  };

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
          <Link href="/mentoring/dashboard/mentor/schedule">
            <div className="side-menu-item">
              <Image 
                src="/images/icon/calendar-green.png"
                alt="Profile Icon"
                width={400}
                height={400}
                className="h-full w-auto"
              />
              <p>Scheduled Sessions</p>
            </div>
          </Link>

          <Link href="/mentoring/dashboard/mentor/setting">
            <div className="side-menu-item">
              <Image 
                src="/images/icon/setting-green.png"
                alt="Profile Icon"
                width={400}
                height={400}
                className="h-full w-auto"
              />
              <p>Manage Account</p>
            </div>
          </Link>
        </div>

        <div className="flex-1 min-w-96">
          <h2>Profile</h2>

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
            <Image 
              src="/images/icon/edit.png"
              alt="Edit Icon"
              width={400}
              height={400}
              className="h-8 w-8 rounded-lg p-1"
              style={{ background: 'var(--synbio-green)' }}
              onClick={() => console.log('Edit profile picture functionality')}
            />
          </div>

          {/* Editable fields */}
          <EditableField label="Full Name" value={fullName} onEdit={(newValue) => handleFieldUpdate('fullName', newValue)} />
          <EditableField label="Gender" value={gender} onEdit={(newValue) => handleFieldUpdate('gender', newValue)} />
          <EditableField label="Active WA Number" value={wa_number} onEdit={(newValue) => handleFieldUpdate('wa_number', newValue)} />
          <EditableField label="Role" value={role} onEdit={(newValue) => handleFieldUpdate('role', newValue)} />
          <EditableField label="Affiliation" value={affiliation} onEdit={(newValue) => handleFieldUpdate('affiliation', newValue)} />
          <EditableField label="Alma mater" value={almamater} onEdit={(newValue) => handleFieldUpdate('almamater', newValue)} />
          <EditableField label="Category" value={category} onEdit={(newValue) => handleFieldUpdate('category', newValue)} />
          <EditableField label="Field of Interest" value={field_of_interest} onEdit={(newValue) => handleFieldUpdate('field_of_interest', newValue)} />
          <EditableField label="Linkedin URL" value={linkedin_url} onEdit={(newValue) => handleFieldUpdate('linkedin_url', newValue)} />

          {/* Self Description Section */}
          <div className="pl-4 py-2 flex gap-2 items-left flex-col">
            <h3 className="w-56">Self Description</h3>

            <div className="flex gap-2">
              {isDescriptionEditing ? (
                <textarea
                  className="border border-green-800 rounded-md px-2 py-1 w-full h-32 resize-none text-sm"
                  value={descriptionValue}
                  onChange={(e) => setDescriptionValue(e.target.value)}
                />
              ) : (
                <div className="border border-green-800 rounded-md px-2 py-1 w-full text-justify text-sm">{descriptionValue}</div>
              )}
              <Image 
                src="/images/icon/edit.png"
                alt="Edit Icon"
                width={400}
                height={400}
                className="h-8 w-8 rounded-lg p-1"
                style={{ background: 'var(--synbio-green)' }}
                onClick={handleDescriptionEdit}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-20"></div>
    </div>
  );
}
