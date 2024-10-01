import csv
import gdown
import json
import os
import re
from collections import defaultdict
from datetime import datetime
import requests

# File paths
csv_file_path = 'data/FormResponses30-Sep-24.csv'
download_directory = 'images/membersTest/'

# Ensure the download directory exists
os.makedirs(download_directory, exist_ok=True)

# Read CSV and store the most recent entry for each person
entries = defaultdict(lambda: {"timestamp": "01/01/1900 00:00:00"})

with open(csv_file_path, mode='r') as csv_file:
    reader = csv.DictReader(csv_file)
    
    for row in reader:
        email = row['Email Address']
        current_timestamp = datetime.strptime(row['Timestamp'], '%m/%d/%Y %H:%M:%S')
        stored_timestamp = datetime.strptime(entries[email]['timestamp'], '%m/%d/%Y %H:%M:%S')
        
        # Update entry if the current one is more recent
        if current_timestamp > stored_timestamp:
            entries[email] = row
            entries[email]['timestamp'] = row['Timestamp']

# Download images and prepare team members data
team_members = {"executives": [], "consultants": []}

for email, member in entries.items():
    # Extract file ID from the Google Drive link
    headshot_url = member['Please attach a professional headshot.']
    file_id = None
    if "id=" in headshot_url:
        file_id = headshot_url.split("id=")[-1]
    elif "/d/" in headshot_url:
        file_id = headshot_url.split("/d/")[1].split("/")[0]

    if file_id:
        download_url = f"https://drive.google.com/uc?id={file_id}&export=download"

        # Get the original filename from Google Drive metadata
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
        }
        response = requests.get(download_url, headers=headers, allow_redirects=True)

        if response.status_code == 200:
            # Extract filename from the Content-Disposition header
            content_disposition = response.headers.get("Content-Disposition")
            if content_disposition:
                filename = re.findall("filename=\"(.+?)\"", content_disposition)
                if filename:
                    original_filename = filename[0]
                else:
                    original_filename = f"{file_id}.jpg"  # Fallback if filename isn't found
            else:
                original_filename = f"{file_id}.jpg"  # Fallback if no Content-Disposition

            # Ensure valid filename (remove unwanted characters)
            original_filename = re.sub(r'[^\w\-_\. ]', '_', original_filename)

            # Define output path for the original download
            original_output_path = os.path.join(download_directory, original_filename)
            
            # Download the file
            try:
                if not os.path.exists(original_output_path):
                    gdown.download(download_url, original_output_path, quiet=False, fuzzy=True)
                else:
                    print(f"Image for {member['Full Name']} already downloaded as {original_filename}.")
            except Exception as e:
                print(f"Failed to download image for {member['Full Name']}: {e}")
                original_filename = 'default.jpg'
        else:
            print(f"Failed to fetch metadata for {member['Full Name']}: {response.status_code}")
            original_filename = 'default.jpg'
    else:
        original_filename = 'default.jpg'

    # Rename file to First_Last.filetype
    if original_filename != 'default.jpg':
        # Extract file extension
        _, file_extension = os.path.splitext(original_filename)
        # Construct the new filename in the format First_Last.filetype
        new_filename = f"{member['Full Name'].replace(' ', '_')}{file_extension}"
        new_output_path = os.path.join(download_directory, new_filename)

        # Rename the file
        try:
            os.rename(original_output_path, new_output_path)
            print(f"Renamed '{original_filename}' to '{new_filename}'.")
        except Exception as e:
            print(f"Failed to rename '{original_filename}' to '{new_filename}': {e}")
            new_filename = original_filename
    else:
        new_filename = 'default.jpg'

    # Prepare team member dictionary
    team_member = {
        "name": member['Full Name'],
        "role": member['Role in Lumnus'],
        "linkedin": member['What is your LinkedIn URL'],
        "joined": member['When did you join Lumnus?'],
        "image": new_filename  # Use the renamed image filename
    }
    
    # Add optional fields if they exist and are not 'N/A'
    if member['Major']:
        team_member['major'] = member['Major']
    if member['Minor (if none, enter N/A)'] and member['Minor (if none, enter N/A)'].upper() != 'N/A':
        team_member['minor'] = member['Minor (if none, enter N/A)']
    if member['Career Interest']:
        team_member['career_interest'] = member['Career Interest']
    if member['Favorite Activities/Hobbies']:
        team_member['hobbies'] = member['Favorite Activities/Hobbies']
    
    # Append to either executives or consultants list
    if "VP" in member['Role in Lumnus'] or "President" in member['Role in Lumnus'] or "Director" in member['Role in Lumnus']:
        team_members["executives"].append(team_member)
    else:
        team_members["consultants"].append(team_member)

# Write JSON to file
json_file_path = 'membersTest.json'
with open(json_file_path, mode='w') as json_file:
    json.dump(team_members, json_file, indent=4)

print(f"JSON file has been created: '{json_file_path}'")