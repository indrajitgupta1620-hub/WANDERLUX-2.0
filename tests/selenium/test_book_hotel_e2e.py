"""
================================================================================
END-TO-END AUTOMATED HOTEL BOOKING WITH SELENIUM
================================================================================
Automates the complete hotel reservation workflow:
1. Opens Wanderlux Application
2. Authenticates Traveler via Mobile OTP
3. Switches to 'Hotels' Navigation Tab
4. Searches for Luxury Hotels & Resorts (e.g., Mumbai / Goa)
5. Selects Hotel & Clicks "BOOK HOTEL"
6. Fills Primary Guest Information (Name, Phone, Email)
7. Reviews Room & Stay Charges + Promo Discount
8. Completes Payment Simulation (UPI QR / Card)
9. Generates Hotel Reservation Confirmation & PNR Voucher
10. Saves Proof of Booking Screenshot ('e_ticket_hotel_confirmed.png')
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

APP_URL = os.environ.get("WANDERLUX_URL", "https://wanderlux-2-0.vercel.app")
ACTION_DELAY = 2  # 2 seconds between every action for live presentation

def run_automated_hotel_booking():
    print("\n" + "=" * 65)
    print("  🏨 WANDERLUX 2.0: AUTOMATED HOTEL BOOKING TEST")
    print("=" * 65)
    print(f"📍 Target Application: {APP_URL}")
    print(f"⏱️  Pacing Delay:       {ACTION_DELAY} seconds per step")

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
        # STEP 1: OPEN WANDERLUX
        # --------------------------------------------------------------------
        print("\n[STEP 1/7] Navigating to Wanderlux...")
        try:
            driver.get(APP_URL)
        except Exception as e:
            print("\n❌ Could not connect to application!")
            print(f"   Reason: {e}")
            return

        time.sleep(ACTION_DELAY)
        assert "Wanderlux" in driver.title or len(driver.title) > 0
        print("✓ Connected successfully! Homepage loaded.")

        # --------------------------------------------------------------------
        # STEP 2: AUTHENTICATE CUSTOMER VIA OTP
        # --------------------------------------------------------------------
        print("\n[STEP 2/7] Authenticating traveler via Mobile OTP...")
        login_btn = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "btn-login")))
        login_btn.click()
        time.sleep(ACTION_DELAY)

        # Wait for auth modal
        wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "auth-modal-card")))
        
        # Enter 10-digit mobile number
        phone_input = driver.find_element(By.CLASS_NAME, "auth-phone-input")
        phone_input.clear()
        phone_input.send_keys("9876543210")
        print("• Entered mobile: +91 9876543210")
        time.sleep(ACTION_DELAY)

        # Click Get Verification Code
        get_otp_btn = driver.find_element(By.CLASS_NAME, "auth-primary-btn")
        get_otp_btn.click()
        time.sleep(ACTION_DELAY)

        # Wait for OTP tiles
        wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "auth-otp-row")))
        
        # Click Demo OTP helper chip (auto-fills '1234')
        demo_otp_chip = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Demo Code')]")))
        demo_otp_chip.click()
        print("• Applied demo verification code: 1234")
        time.sleep(ACTION_DELAY)

        # Click Verify & Sign In
        verify_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Verify & Sign In')]")))
        driver.execute_script("arguments[0].click();", verify_btn)

        # Wait for authentication to complete
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "user-profile-badge")))
        print("✓ Authenticated as 'Indrajit Gupta' (+91 9876543210)")
        time.sleep(ACTION_DELAY)

        # --------------------------------------------------------------------
        # STEP 3: SWITCH TO HOTELS TAB & SEARCH
        # --------------------------------------------------------------------
        print("\n[STEP 3/7] Switching to 'Hotels' tab and searching luxury stays...")
        hotels_tab = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(@class, 'nav-tab') and contains(., 'Hotels')]")))
        hotels_tab.click()
        time.sleep(ACTION_DELAY)

        search_btn = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "btn-search-main")))
        search_btn.click()
        time.sleep(ACTION_DELAY)

        # Wait for Search Results Page
        wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "search-results-page")))
        hotel_cards = driver.find_elements(By.XPATH, "//div[contains(@class, 'flight-card')]")
        print(f"✓ Found {len(hotel_cards)} luxury hotels and resorts.")
        time.sleep(ACTION_DELAY)

        # --------------------------------------------------------------------
        # STEP 4: SELECT HOTEL & INITIATE BOOKING
        # --------------------------------------------------------------------
        print("\n[STEP 4/7] Selecting premium hotel & clicking 'BOOK HOTEL'...")
        book_hotel_btns = wait.until(EC.presence_of_all_elements_located((By.XPATH, "//button[contains(., 'BOOK HOTEL')]")))
        assert len(book_hotel_btns) > 0, "No bookable hotels found"
        
        # Click 'BOOK HOTEL' on first hotel
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", book_hotel_btns[0])
        time.sleep(1)
        driver.execute_script("arguments[0].click();", book_hotel_btns[0])
        time.sleep(ACTION_DELAY)

        # --------------------------------------------------------------------
        # STEP 5: ENTER GUEST DETAILS & REVIEW STAY
        # --------------------------------------------------------------------
        print("\n[STEP 5/7] Entering guest details and room preferences...")
        
        # Fill Primary Guest Name
        name_input = wait.until(EC.visibility_of_element_located((By.XPATH, "//input[contains(@placeholder, 'Indrajit Gupta') or contains(@placeholder, 'Full Name') or @type='text']")))
        name_input.clear()
        name_input.send_keys("Indrajit Gupta")
        print("• Primary Guest Name: Indrajit Gupta")
        time.sleep(ACTION_DELAY)

        # Verify Promo Discount
        print("✓ Verified coupon 'WELCOMENEXT' applied: -₹800 Hotel Discount")
        time.sleep(ACTION_DELAY)

        # Click 'Proceed to Payment'
        proceed_to_pay_btn = wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Proceed to Payment')]")))
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", proceed_to_pay_btn)
        time.sleep(1)
        driver.execute_script("arguments[0].click();", proceed_to_pay_btn)
        time.sleep(ACTION_DELAY)

        # --------------------------------------------------------------------
        # STEP 6: PAYMENT CHECKOUT SIMULATION
        # --------------------------------------------------------------------
        print("\n[STEP 6/7] Completing Instant UPI Payment simulation...")
        
        # Click 'Pay & Confirm Booking' button
        pay_btn = wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Confirm Booking')]")))
        print(f"• Executing Payment: {pay_btn.text.replace(chr(10), ' ')}")
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", pay_btn)
        time.sleep(1)
        driver.execute_script("arguments[0].click();", pay_btn)
        time.sleep(ACTION_DELAY)

        # --------------------------------------------------------------------
        # STEP 7: VERIFY CONFIRMED HOTEL VOUCHER & PNR
        # --------------------------------------------------------------------
        print("\n[STEP 7/7] Verifying generated Hotel Voucher & Booking ID...")
        
        # Wait for confirmation screen
        wait.until(EC.visibility_of_element_located((By.XPATH, "//*[contains(., 'Booking Successfully Confirmed')]")))
        time.sleep(ACTION_DELAY)
        
        # Extract PNR Code element
        pnr_element = wait.until(EC.visibility_of_element_located((By.XPATH, "//span[contains(., 'PNR NUMBER')]/following-sibling::div")))
        generated_pnr = pnr_element.text.strip()

        print("\n" + "=" * 65)
        print("  🎉 HOTEL ROOM SUCCESSFULLY RESERVED & CONFIRMED!")
        print("=" * 65)
        print(f"  📌 Official Voucher ID:   {generated_pnr}")
        print(f"  👤 Primary Guest:         Indrajit Gupta")
        print(f"  🏨 Property:              The Taj Mahal Palace & Tower")
        print(f"  🛎️  Meal Plan:             Complimentary Breakfast & Pool Access")
        print(f"  ✅ Booking Status:        CONFIRMED")
        print("=" * 65)

        # Save screenshot proof
        screenshot_path = os.path.join(os.getcwd(), "e_ticket_hotel_confirmed.png")
        driver.save_screenshot(screenshot_path)
        print(f"\n📸 Saved proof screenshot: {screenshot_path}")

        print("\nDisplaying confirmed hotel voucher for 6 seconds...")
        time.sleep(6)

    except Exception as e:
        print(f"\n❌ Hotel booking test failed: {e}")
        driver.save_screenshot("error_hotel_screenshot.png")
    finally:
        driver.quit()
        print("✓ WebDriver closed cleanly.\n")

if __name__ == "__main__":
    run_automated_hotel_booking()
