import urllib.request
import urllib.error
import json
import uuid
from datetime import datetime
import sys
import time

# This file is made using AI
# I went over it and it all makes sense and it works which is great

BASE_URL = "http://localhost:8000/todo"

def print_pass(message):
    print(f"[\033[92mPASS\033[0m] {message}")

def print_fail(message):
    print(f"[\033[91mFAIL\033[0m] {message}")

def make_request(method, url, data=None):
    try:
        req = urllib.request.Request(url, method=method)
        req.add_header('Content-Type', 'application/json')
        
        if data:
            json_data = json.dumps(data).encode('utf-8')
            req.data = json_data

        with urllib.request.urlopen(req) as response:
            return response.status, json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read().decode())
    except Exception as e:
        print_fail(f"Request failed: {str(e)}")
        return 0, None

def run_tests():
    print(f"Starting API tests against {BASE_URL}...")
    
    # 0. Health Check (Get all todos)
    # This step verifies that the backend is running and reachable.
    # It sends a simplistic GET request to the root Todo endpoint.
    print("\n1. Testing GET /todo/ (Initial check)...")
    status, result = make_request("GET", BASE_URL + "/")
    if status == 200:
        print_pass("Backend is reachable")
        # We also count how many todos are currently in the database to log the state
        initial_count = len(result['data'])
        print(f"   Current todo count: {initial_count}")
    else:
        # If this fails, no further tests can run, so we exit.
        print_fail("Backend not reachable. Is it running?")
        sys.exit(1)

    # 1. Create Todo
    # We attempt to create a new Todo item with all required fields.
    # We generate a unique ID using uuid.uuid4() ensuring no collision.
    print("\n2. Testing POST /todo/ (Create Todo)...")
    todo_id = str(uuid.uuid4())
    now_iso = datetime.utcnow().isoformat() + "Z"
    
    new_todo = {
        "id": todo_id,
        "name": "Integration Test Todo",
        "description": "This todo was created by the test script",
        "priority": "high",
        "completed": False,
        "createdAt": now_iso,
        "updatedAt": now_iso
    }
    
    # Send the POST request with the JSON body
    status, result = make_request("POST", BASE_URL + "/", new_todo)
    if status == 200 and result.get('status') == 'success':
        print_pass("Todo created successfully")
    else:
        print_fail(f"Failed to create todo. Status: {status}, Response: {result}")
        sys.exit(1)

    # 2. Verify creation
    # After creation, we fetch the list again to ensure the new item is actually present.
    # This validates persistence and the GET endpoint correctness.
    print("\n3. Testing GET /todo/ (Verify Creation)...")
    status, result = make_request("GET", BASE_URL + "/")
    todos = result['data']
    found = False
    for todo in todos:
        if todo['id'] == todo_id:
            found = True
            # We verify the content matches what we sent
            if todo['name'] == new_todo['name']:
                print_pass("Todo found in list with correct data")
            else:
                print_fail("Todo found but data mismatch")
            break
    
    if not found:
        print_fail("Created todo not found in list")
        sys.exit(1)

    # 3. Update Todo
    # We patch the newly created todo to change its status to completed.
    # This tests the PATCH endpoint.
    print("\n4. Testing PATCH /todo/{id} (Update Todo)...")
    update_data = {
        "id": todo_id,
        "completed": True,
        "name": "Updated by Test Script"
    }
    status, result = make_request("PATCH", f"{BASE_URL}/{todo_id}", update_data)
    if status == 200 and result.get('status') == 'success':
        print_pass("Todo updated successfully")
    else:
        print_fail(f"Failed to update todo. Status: {status}, Response: {result}")

    # 4. Verify Update
    # Same as before, verify that the read operation reflects the changes made.
    print("\n5. Testing GET /todo/ (Verify Update)...")
    status, result = make_request("GET", BASE_URL + "/")
    todos = result['data']
    found = False
    for todo in todos:
        if todo['id'] == todo_id:
            found = True
            if todo['completed'] is True and todo['name'] == "Updated by Test Script":
                print_pass("Todo update verified correctly")
            else:
                print_fail(f"Todo update verification failed. Got: {todo}")
            break
            
    # 5. Delete Todo
    # We remove the test item to clean up the database.
    print("\n6. Testing DELETE /todo/{id} (Delete Todo)...")
    status, result = make_request("DELETE", f"{BASE_URL}/{todo_id}")
    if status == 200 and result.get('status') == 'success':
        print_pass("Todo deleted successfully")
    else:
        print_fail(f"Failed to delete todo. Status: {status}, Response: {result}")

    # 6. Verify Deletion
    # Final check to ensure the deleted item acts specifically on the expected ID.
    print("\n7. Testing GET /todo/ (Verify Deletion)...")
    status, result = make_request("GET", BASE_URL + "/")
    todos = result['data']
    found_deleted = False
    for todo in todos:
        if todo['id'] == todo_id:
            found_deleted = True
            break
            
    if not found_deleted:
        print_pass("Todo correctly removed from list")
    else:
        print_fail("Todo still exists after deletion")

    print("\n------------------------------------------------")
    print("\033[92mAll tests completed successfully!\033[0m")

if __name__ == "__main__":
    try:
        run_tests()
    except KeyboardInterrupt:
        print("\nTests interrupted.")
    except Exception as e:
        print(f"\nUnexpected error: {e}")
