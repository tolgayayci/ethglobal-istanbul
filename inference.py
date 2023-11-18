import os
import json

input_dir = '/input'
output_dir = '/output'
output_file = 'output-file.json'

# List to hold file information
files_info = []

# Iterate over files in the input directory
for filename in os.listdir(input_dir):
    file_path = os.path.join(input_dir, filename)
    if os.path.isfile(file_path):
        # Get file information
        file_info = {
            'name': filename,
            'size': os.path.getsize(file_path),
            'path': file_path
        }
        files_info.append(file_info)

# Ensure the output directory exists
os.makedirs(output_dir, exist_ok=True)

# Write file information to the output JSON file
with open(os.path.join(output_dir, output_file), 'w') as f:
    json.dump(files_info, f, indent=4)

print(f'File information written to {os.path.join(output_dir, output_file)}')
