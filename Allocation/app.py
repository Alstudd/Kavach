import requests
import json
import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from langchain_groq import ChatGroq

# Load environment variables from .env file
load_dotenv()

# Retrieve API keys from environment variables
groq_api_key = os.getenv("GROQ_API_KEY", "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")
youtube_api_key = os.getenv("YOUTUBE_API_KEY", "AIzaSyDoiu41YFBEdgxbENJrlYBecg0KqX3M7iE")
#cahnge

# Initialize the language model
llm = ChatGroq(
    model_name="llama-3.1-70b-versatile",
    temperature=0,
    groq_api_key=groq_api_key
)

# Initialize Flask app
app = Flask(__name__)

# Define route to generate course content based on course_topic
@app.route('/allocate', methods=['POST'])
def generate_course():
    data = request.json
    
    resources= data.get('resources', 'Physics')  # Default to 'Physics' if no topic provided
    disaster_properties= data.get('disaster_properties', 'Physics')  # Default to 'Physics' if no topic provided
    previous_allocations= data.get('previous_allocations', 'Physics')

    # Invoke the LLM to generate course data in JSON format
    response = llm.invoke(
        f'''


You are an AI capable of wisely allocating resources to a given disaster. Use the following criteria to allocate resources effectively:

1. **Resource Type and Disaster Type**: Ensure compatibility between the resource type and the disaster type (e.g., "protective_gear" for a "chemical_leak").
2. **Resource and Disaster Location**: Prefer resources located near the disaster location to reduce deployment time.
3. **Resource Quantity**: Evaluate the required quantity based on disaster needs and allocate available resources accordingly.
4. **Disaster Description Analysis**: Analyze the disaster description to prioritize essential resources.
5. **Previous Resource Allocations**: Review past allocations to avoid redundancy and ensure optimal distribution.

### Data Structures for Reference

**Resources Array** (Available resources ):
```json
[
 {{
    "_id": "Unique identifier for the resource",
    "resourceName": "Name of the resource, e.g., helmet",
    "type": "Type of the resource, e.g., protective_gear",
    "quantity": "Total available quantity of the resource, e.g., 100",
    "location": "Location of the resource, e.g., Mumbai",
    "createdAt": "Timestamp for when the resource data was added",
    "updatedAt": "Timestamp for when the resource data was last updated",
    "__v": "Version indicator, e.g., 0 for a never-updated record"
}}
]
```

**Disaster Document** (Single disaster):
```json
 {{
  "_id": "Unique identifier for the disaster",
  "location": "Location of the disaster, e.g., Kolkata",
  "disasterType": "Type of the disaster, e.g., chemical leak",
  "description": "Description of the disaster, providing additional context",
  "help_id": "Reference to related help document",
  "status": "Current rescue status, e.g., on-going",
  "createdAt": "Timestamp for when the disaster data was added",
  "updatedAt": "Timestamp for when the disaster data was last updated",
  "__v": "Version indicator, e.g., 0 for a never-updated record"
}}
```

**Previous Resource Allocations (It can be empty as well)**:
```json
[
 {{
    "resource_id": "ID of the allocated resource",
    "disaster_id": "ID of the associated disaster",
    "quantity": "Quantity of the allocated resource",
    "createdAt": "Timestamp for when the allocation data was added",
    "updatedAt": "Timestamp for when the allocation data was last updated",
    "__v": "Version indicator, e.g., 0 for a never-updated record"
 }}
]
```

### Task

This is provided Resources Array {resources} and a Disaster Document {disaster_properties}.
This is Previous Resource Allocations {previous_allocations}.
If no resources are allocated, return an empty array.
Allocate resources to the specified disaster after evaluating all criteria. The output should be an array of documents containing resource allocations for the specified disaster ID. Format the response as a **STRICT JSON array with no preamble**.


**Expected Output Structure**:
```json
[
  {{
    "resource_id": "ID of the allocated resource",
    "disaster_id": "Constant disaster ID throughout this result array",
    "quantity": "Allocated quantity of the resource"
  }}
]
```
'''   
)

    # Clean and parse JSON response content
    try:
        cleaned_content = response.content.strip("`").strip()  # Removes backticks and surrounding whitespace
        course_data = json.loads(cleaned_content)  # Attempt to parse JSON data
    except json.JSONDecodeError as e:
        return jsonify({"error": "Error parsing JSON response", "details": str(e)}), 500

    # Add YouTube links to course data
    

    # Return the updated course data with added video links
    return jsonify(course_data)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)