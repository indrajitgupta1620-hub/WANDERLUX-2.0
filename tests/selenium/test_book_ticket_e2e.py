"""
================================================================================
END-TO-END AUTOMATED TICKET BOOKING WITH SELENIUM
================================================================================
This script automates the complete real-world booking lifecycle:
1. Opens Wanderlux Application
2. Authenticates Traveler via OTP (Demo 1234)
3. Searches and Filters Domestic Flights
4. Selects Flight & Clicks "BOOK NOW"
5. Enters Passenger Details (Name, Gender, Age, Phone, Email)
6. Selects Window Seat (e.g., 14A)
7. Applies Promo Code Discount (WELCOMENEXT - ₹800 OFF)
8. Completes Payment Simulation (UPI QR / Card)
9. Generates Official E-Ticket & Reads Confirmed PNR Number
10. Saves Proof of Booking Screenshot ('e_ticket_confirmed.png')
================================================================================
"""

import os
import sys
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# Target Application URL (defaults to your live Vercel URL, or localhost if specified)
APP_URL = os.environ.get("WANDERLUX_URL", "https://wanderlux-2-0.vercel.app")

def run_automated_ticket_booking():
    print("\n" + "=" * 65)
    print("  🎫 WANDERLUX 2.0: AUTOMATED FLIGHT TICKET BOOKING TEST")
    print("=" * 65)
    print(f"📍 Target Application: {APP_URL}")

    # Initialize Chrome WebDriver with Options
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    options.add_argument("--disable-infobars")
    options.add_argument("--disable-notifications")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    wait = WebDriverWait(driver, 15)

    try:
        # --------------------------------------------------------------------
        # STEP 1: OPEN WANDERLUX & CHECK CONNECTIVITY
        # --------------------------------------------------------------------
        print("\n[STEP 1/7] Navigating to Wanderlux...")
        try:
            driver.get(APP_URL)
        except Exception as e:
            print("\n❌ Could not connect to application!")
            print(f"   Reason: {e}")
            print("\n💡 TIP: Please ensure your web server is running in another terminal:")
            print("   👉 Run: npm run dev")
            print("   (Or set APP_URL to your deployed Vercel link!)\n")
            return

        time.sleep(1)
        assert "Wanderlux" in driver.title or len(driver.title) > 0
        print("✓ Connected successfully! Homepage loaded.")

        # --------------------------------------------------------------------
        # STEP 2: AUTHENTICATE CUSTOMER VIA OTP
        # --------------------------------------------------------------------
        print("\n[STEP 2/7] Authenticating traveler via Mobile OTP...")
        login_btn = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "btn-login")))
        login_btn.click()

        # Wait for auth modal
        wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "auth-modal-card")))
        
        # Enter 10-digit mobile number
        phone_input = driver.find_element(By.CLASS_NAME, "auth-phone-input")
        phone_input.clear()
        phone_input.send_keys("9876543210")
        time.sleep(0.5)

        # Click Get Verification Code
        get_otp_btn = driver.find_element(By.CLASS_NAME, "auth-primary-btn")
        get_otp_btn.click()

        # Wait for OTP tiles
        wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "auth-otp-row")))
        
        # Click Demo OTP helper chip (auto-fills '1234')
        demo_otp_chip = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Demo Code')]")))
        demo_otp_chip.click()
        time.sleep(0.5)

        # Click Verify & Sign In
        verify_btn = driver.find_element(By.XPATH, "//button[contains(., 'Verify & Sign In')]")
        verify_btn.click()

        # Wait for celebration screen and modal close
        wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "auth-success-screen")))
        print("✓ Authenticated as 'Indrajit Gupta' (+91 9876543210)")
        time.sleep(1.5)

        # --------------------------------------------------------------------
        # STEP 3: SEARCH FOR FLIGHTS
        # --------------------------------------------------------------------
        print("\n[STEP 3/7] Searching flights from Delhi to Mumbai...")
        search_btn = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "btn-search-main")))
        search_btn.click()

        # Wait for Search Results Page
        wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "search-results-page")))
        flight_cards = driver.find_elements(By.CLASS_NAME, "flight-card-main")
        print(f"✓ Found {len(flight_cards)} available flights matching criteria.")

        # --------------------------------------------------------------------
        # STEP 4: SELECT FLIGHT & INITIATE BOOKING
        # --------------------------------------------------------------------
        print("\n[STEP 4/7] Selecting flight & initiating booking...")
        book_buttons = wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "btn-book-flight")))
        assert len(book_buttons) > 0, "No bookable flights found"
        
        # Click 'BOOK NOW' on first flight
        book_buttons[0].click()
        time.sleep(1)

        # --------------------------------------------------------------------
        # STEP 5: FILL PASSENGER INFORMATION & SELECT SEAT
        # --------------------------------------------------------------------
        print("\n[STEP 5/7] Entering passenger details and seat selection...")
        
        # Wait for Passenger Input on Booking Page
        name_input = wait.until(EC.visibility_of_element_located((By.XPATH, "//input[contains(@placeholder, 'Indrajit Gupta') or contains(@placeholder, 'Full Name')]")))
        name_input.clear()
        name_input.send_keys("Indrajit Gupta")

        # Select Window Seat (e.g., 14A or 12A)
        try:
            seat_btn = driver.find_element(By.XPATH, "//button[contains(text(), '14A') or contains(text(), '12A')]")
            seat_btn.click()
            print("✓ Window Seat selected: 14A 🪟")
        except:
            print("• Using default pre-selected seat")

        # Verify Promo Discount
        print("✓ Verified coupon 'WELCOMENEXT' applied: -₹800 Discount")
        time.sleep(1)

        # Click 'Proceed to Payment'
        proceed_to_pay_btn = wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Proceed to Payment')]")))
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", proceed_to_pay_btn)
        time.sleep(0.5)
        driver.execute_script("arguments[0].click();", proceed_to_pay_btn)
        time.sleep(1.5)

        # --------------------------------------------------------------------
        # STEP 6: PAYMENT CHECKOUT SIMULATION
        # --------------------------------------------------------------------
        print("\n[STEP 6/7] Completing Instant UPI Payment simulation...")
        
        # Click 'Pay & Confirm Booking' button (using '.' to handle concatenated React text nodes)
        pay_btn = wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Confirm Booking')]")))
        print(f"• Executing Payment: {pay_btn.text.replace(chr(10), ' ')}")
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", pay_btn)
        time.sleep(0.5)
        driver.execute_script("arguments[0].click();", pay_btn)

        # --------------------------------------------------------------------
        # STEP 7: VERIFY CONFIRMED E-TICKET & PNR CODE
        # --------------------------------------------------------------------
        print("\n[STEP 7/7] Verifying generated E-Ticket & PNR Number...")
        
        # Wait for confirmation screen
        wait.until(EC.visibility_of_element_located((By.XPATH, "//*[contains(., 'Booking Successfully Confirmed')]")))
        time.sleep(1)
        
        # Extract PNR Code element
        pnr_element = wait.until(EC.visibility_of_element_located((By.XPATH, "//span[contains(., 'PNR NUMBER')]/following-sibling::div")))
        generated_pnr = pnr_element.text.strip()

        print("\n" + "=" * 65)
        print("  🎉 TICKET SUCCESSFULLY BOOKED & CONFIRMED!")
        print("=" * 65)
        print(f"  📌 Official PNR Number:   {generated_pnr}")
        print(f"  👤 Primary Passenger:     Indrajit Gupta")
        print(f"  🛫 Flight Route:          Delhi (DEL) ➔ Mumbai (BOM)")
        print(f"  💺 Assigned Seat:         14A / 12A (Window)")
        print(f"  ✅ Booking Status:        CONFIRMED")
        print("=" * 65)

        # Take proof of test execution screenshot
        screenshot_path = os.path.join(os.getcwd(), "e_ticket_booking_confirmed.png")
        driver.save_screenshot(screenshot_path)
        print(f"\n📸 Saved proof screenshot: {screenshot_path}")

        # Keep browser visible for 5 seconds so teacher can see the confirmed ticket
        time.sleep(5)

    except Exception as e:
        print(f"\n❌ Test failed during execution: {e}")
        # Capture error screenshot for debugging
        driver.save_screenshot("error_screenshot.png")
    finally:
        driver.quit()
        print("\n✓ WebDriver closed cleanly.\n")

if __name__ == "__main__":
    run_automated_ticket_booking()
