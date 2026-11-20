import os
import sys
import json
import urllib.request
import urllib.parse
import urllib.error

DEFAULT_URLS = [
    os.environ.get("WANDERLUX_API_URL", "https://wanderlux-2-0.vercel.app"),
    "http://localhost:5000"
]

def check_connectivity(url):
    try:
        req = urllib.request.Request(f"{url}/api/health", method="GET")
        with urllib.request.urlopen(req, timeout=4) as response:
            return response.status == 200
    except Exception:
        return False

def resolve_base_url():
    for url in DEFAULT_URLS:
        if check_connectivity(url):
            return url
    return None

BASE_URL = resolve_base_url()

def send_request(endpoint, method="GET", body=None, headers=None):
    url = f"{BASE_URL}{endpoint}"
    req_headers = {"Content-Type": "application/json"}
    if headers:
        req_headers.update(headers)

    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")

    req = urllib.request.Request(url, data=data, headers=req_headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=6) as response:
            status = response.status
            raw_body = response.read().decode("utf-8")
            try:
                parsed_json = json.loads(raw_body)
            except Exception:
                parsed_json = {}
            return status, parsed_json
    except urllib.error.HTTPError as e:
        try:
            raw_body = e.read().decode("utf-8")
            parsed_json = json.loads(raw_body)
        except Exception:
            parsed_json = {}
        return e.code, parsed_json
    except Exception as e:
        return 0, {"error": str(e)}

def run_all_api_tests():
    if not BASE_URL:
        print("ERROR: Could not connect to Wanderlux API at any target URL.")
        print("1. If running locally, please start the server: npm run server")
        print("2. If testing live deployment, check internet connection: https://wanderlux-2-0.vercel.app")
        sys.exit(1)

    print(f"RUNNING WANDERLUX REST API TEST SUITE")
    print(f"Target Base URL: {BASE_URL}")

    passed = 0
    total = 0

    total += 1
    status, data = send_request("/api/health")
    if status == 200 and isinstance(data, dict) and data.get("status") == "OPERATIONAL":
        print("[PASS] GET /api/health -> Status: 200 OK (Service is OPERATIONAL)")
        passed += 1
    else:
        err = data.get("error", data) if isinstance(data, dict) else data
        print(f"[FAIL] GET /api/health -> Status: {status}, Error: {err}")

    total += 1
    status, data = send_request("/api/flights?from=Delhi&to=Mumbai&maxPrice=6000")
    if status == 200 and isinstance(data, dict) and data.get("success") is True:
        count = data.get("count", 0)
        print(f"[PASS] GET /api/flights (Query Filter) -> Status: 200 OK (Returned {count} flights)")
        passed += 1
    else:
        err = data.get("error", data) if isinstance(data, dict) else data
        print(f"[FAIL] GET /api/flights -> Status: {status}, Error: {err}")

    total += 1
    status, data = send_request("/api/flights/fl-101")
    if status == 200 and isinstance(data, dict) and data.get("data", {}).get("id") == "fl-101":
        airline = data.get("data", {}).get("airline")
        print(f"[PASS] GET /api/flights/fl-101 (Path Param) -> Status: 200 OK (Flight: {airline})")
        passed += 1
    else:
        err = data.get("error", data) if isinstance(data, dict) else data
        print(f"[FAIL] GET /api/flights/fl-101 -> Status: {status}, Error: {err}")

    total += 1
    status, data = send_request("/api/hotels?city=Mumbai")
    if status == 200 and isinstance(data, dict) and data.get("count", 0) > 0:
        print(f"[PASS] GET /api/hotels?city=Mumbai -> Status: 200 OK (Found {data.get('count')} luxury hotels)")
        passed += 1
    else:
        err = data.get("error", data) if isinstance(data, dict) else data
        print(f"[FAIL] GET /api/hotels -> Status: {status}, Error: {err}")

    total += 1
    status, data = send_request("/api/trains")
    if status == 200 and isinstance(data, dict) and len(data.get("data", [])) > 0:
        print(f"[PASS] GET /api/trains -> Status: 200 OK (Found {len(data.get('data'))} IRCTC trains)")
        passed += 1
    else:
        err = data.get("error", data) if isinstance(data, dict) else data
        print(f"[FAIL] GET /api/trains -> Status: {status}, Error: {err}")

    total += 1
    status, data = send_request("/api/auth/send-otp", method="POST", body={"phone": "9876543210"})
    if status == 200 and isinstance(data, dict) and data.get("demoOtp") == "1234":
        print("[PASS] POST /api/auth/send-otp -> Status: 200 OK (Demo OTP: 1234)")
        passed += 1
    else:
        err = data.get("error", data) if isinstance(data, dict) else data
        print(f"[FAIL] POST /api/auth/send-otp -> Status: {status}, Error: {err}")

    total += 1
    status, data = send_request("/api/auth/verify-otp", method="POST", body={"phone": "9876543210", "otp": "1234"})
    auth_token = data.get("authToken", "") if isinstance(data, dict) else ""
    if status == 200 and auth_token:
        print(f"[PASS] POST /api/auth/verify-otp -> Status: 200 OK (Token: {auth_token[:20]}...)")
        passed += 1
    else:
        err = data.get("error", data) if isinstance(data, dict) else data
        print(f"[FAIL] POST /api/auth/verify-otp -> Status: {status}, Error: {err}")

    total += 1
    booking_payload = {
        "passengerName": "Indrajit Gupta",
        "passengerPhone": "9876543210",
        "passengerEmail": "indrajit@wanderlux.com",
        "type": "flight",
        "itemId": "fl-101",
        "seat": "14A",
        "totalPrice": 4850
    }
    status, data = send_request("/api/bookings", method="POST", body=booking_payload, headers={"Authorization": f"Bearer {auth_token}"})
    created_pnr = data.get("booking", {}).get("pnr", "") if isinstance(data, dict) else ""
    if status == 201 and created_pnr:
        print(f"[PASS] POST /api/bookings (Create) -> Status: 201 Created (Generated PNR: {created_pnr})")
        passed += 1
    else:
        err = data.get("error", data) if isinstance(data, dict) else data
        print(f"[FAIL] POST /api/bookings -> Status: {status}, Error: {err}")

    if created_pnr:
        total += 1
        status, data = send_request(f"/api/bookings/{created_pnr}")
        if status == 200 and isinstance(data, dict) and data.get("data", {}).get("pnr") == created_pnr:
            print(f"[PASS] GET /api/bookings/{created_pnr} (Chained Read) -> Status: 200 OK (Verified PNR matches)")
            passed += 1
        else:
            err = data.get("error", data) if isinstance(data, dict) else data
            print(f"[FAIL] GET /api/bookings/{created_pnr} -> Status: {status}, Error: {err}")

        total += 1
        status, data = send_request(f"/api/bookings/{created_pnr}", method="DELETE")
        if status == 200 and isinstance(data, dict) and data.get("refund", {}).get("status") == "INITIATED":
            print(f"[PASS] DELETE /api/bookings/{created_pnr} (Cancel) -> Status: 200 OK (Refund Initiated)")
            passed += 1
        else:
            err = data.get("error", data) if isinstance(data, dict) else data
            print(f"[FAIL] DELETE /api/bookings/{created_pnr} -> Status: {status}, Error: {err}")

    total += 1
    status, data = send_request("/api/coupons/validate", method="POST", body={"code": "WELCOMENEXT", "amount": 4850})
    if status == 200 and isinstance(data, dict) and data.get("discount") == 800:
        print("[PASS] POST /api/coupons/validate (Valid) -> Status: 200 OK (Discount: 800 applied)")
        passed += 1
    else:
        err = data.get("error", data) if isinstance(data, dict) else data
        print(f"[FAIL] POST /api/coupons/validate -> Status: {status}, Error: {err}")

    total += 1
    status, data = send_request("/api/coupons/validate", method="POST", body={"code": "INVALID99"})
    if status == 400 and isinstance(data, dict) and data.get("success") is False:
        print("[PASS] POST /api/coupons/validate (Negative Test) -> Status: 400 Bad Request (Properly rejected)")
        passed += 1
    else:
        err = data.get("error", data) if isinstance(data, dict) else data
        print(f"[FAIL] POST /api/coupons/validate (Negative Test) -> Status: {status}, Error: {err}")

    print(f"API TEST EXECUTION SUMMARY: {passed}/{total} TESTS PASSED")

if __name__ == "__main__":
    run_all_api_tests()
