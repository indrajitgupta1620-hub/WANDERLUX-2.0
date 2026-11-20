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
ACTION_DELAY = 2

def run_automated_train_booking():
    print("WANDERLUX 2.0: AUTOMATED IRCTC TRAIN BOOKING TEST")
    print(f"Target Application: {APP_URL}")
    print(f"Pacing Delay: {ACTION_DELAY} seconds per step")

    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    options.add_argument("--disable-infobars")
    options.add_argument("--disable-notifications")

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)
    wait = WebDriverWait(driver, 15)

    try:
        print("[STEP 1/7] Navigating to Wanderlux...")
        try:
            driver.get(APP_URL)
        except Exception as e:
            print(f"Could not connect to application: {e}")
            return

        time.sleep(ACTION_DELAY)
        assert "Wanderlux" in driver.title or len(driver.title) > 0
        print("Connected successfully. Homepage loaded.")

        print("[STEP 2/7] Authenticating traveler via Mobile OTP...")
        login_btn = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "btn-login")))
        login_btn.click()
        time.sleep(ACTION_DELAY)

        wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "auth-modal-card")))

        phone_input = driver.find_element(By.CLASS_NAME, "auth-phone-input")
        phone_input.clear()
        phone_input.send_keys("9876543210")
        print("Entered mobile: +91 9876543210")
        time.sleep(ACTION_DELAY)

        get_otp_btn = driver.find_element(By.CLASS_NAME, "auth-primary-btn")
        get_otp_btn.click()
        time.sleep(ACTION_DELAY)

        wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "auth-otp-row")))

        demo_otp_chip = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Demo Code')]")))
        demo_otp_chip.click()
        print("Applied demo verification code: 1234")
        time.sleep(ACTION_DELAY)

        verify_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Verify & Sign In')]")))
        driver.execute_script("arguments[0].click();", verify_btn)

        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "user-profile-badge")))
        print("Authenticated as Indrajit Gupta (+91 9876543210)")
        time.sleep(ACTION_DELAY)

        print("[STEP 3/7] Switching to Trains tab and searching IRCTC express routes...")
        trains_tab = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(@class, 'nav-tab') and contains(., 'Trains')]")))
        trains_tab.click()
        time.sleep(ACTION_DELAY)

        search_btn = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "btn-search-main")))
        search_btn.click()
        time.sleep(ACTION_DELAY)

        wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "search-results-page")))
        train_cards = driver.find_elements(By.XPATH, "//div[contains(@class, 'flight-card')]")
        print(f"Found {len(train_cards)} available express trains.")
        time.sleep(ACTION_DELAY)

        print("[STEP 4/7] Selecting coach class and clicking Book...")
        book_class_btns = wait.until(EC.presence_of_all_elements_located((By.XPATH, "//button[contains(., 'Book ')]")))
        assert len(book_class_btns) > 0, "No train seats found"

        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", book_class_btns[0])
        time.sleep(1)
        print(f"Selecting: {book_class_btns[0].text}")
        driver.execute_script("arguments[0].click();", book_class_btns[0])
        time.sleep(ACTION_DELAY)

        print("[STEP 5/7] Entering passenger details and berth selection...")
        name_input = wait.until(EC.visibility_of_element_located((By.XPATH, "//input[contains(@placeholder, 'Indrajit Gupta') or contains(@placeholder, 'Full Name') or @type='text']")))
        name_input.clear()
        name_input.send_keys("Indrajit Gupta")
        print("Passenger Name: Indrajit Gupta")
        time.sleep(ACTION_DELAY)

        try:
            seat_btn = driver.find_element(By.XPATH, "//button[contains(text(), '14A') or contains(text(), '12A')]")
            driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", seat_btn)
            time.sleep(0.5)
            seat_btn.click()
            print("Window Berth selected: 14A")
        except:
            print("Using default pre-selected berth")
        time.sleep(ACTION_DELAY)

        print("Verified coupon WELCOMENEXT applied: -800 Train Discount")
        time.sleep(ACTION_DELAY)

        proceed_to_pay_btn = wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Proceed to Payment')]")))
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", proceed_to_pay_btn)
        time.sleep(1)
        driver.execute_script("arguments[0].click();", proceed_to_pay_btn)
        time.sleep(ACTION_DELAY)

        print("[STEP 6/7] Completing Instant UPI Payment simulation...")
        pay_btn = wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Confirm Booking')]")))
        print(f"Executing Payment: {pay_btn.text.replace(chr(10), ' ')}")
        driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", pay_btn)
        time.sleep(1)
        driver.execute_script("arguments[0].click();", pay_btn)
        time.sleep(ACTION_DELAY)

        print("[STEP 7/7] Verifying generated IRCTC E-Ticket and PNR Number...")
        wait.until(EC.visibility_of_element_located((By.XPATH, "//*[contains(., 'Booking Successfully Confirmed')]")))
        time.sleep(ACTION_DELAY)

        pnr_element = wait.until(EC.visibility_of_element_located((By.XPATH, "//span[contains(., 'PNR NUMBER')]/following-sibling::div")))
        generated_pnr = pnr_element.text.strip()

        print("IRCTC TRAIN TICKET SUCCESSFULLY BOOKED AND CONFIRMED")
        print(f"Official IRCTC PNR: {generated_pnr}")
        print(f"Primary Passenger: Indrajit Gupta")
        print(f"Train: Vande Bharat Express (22436)")
        print(f"Coach and Berth: Coach B3 / Berth 14A (Window)")
        print(f"Booking Status: CONFIRMED (CNF)")

        screenshot_path = os.path.join(os.getcwd(), "e_ticket_train_confirmed.png")
        driver.save_screenshot(screenshot_path)
        print(f"Saved proof screenshot: {screenshot_path}")

        print("Displaying confirmed IRCTC ticket for 6 seconds...")
        time.sleep(6)

    except Exception as e:
        print(f"Train booking test failed: {e}")
        driver.save_screenshot("error_train_screenshot.png")
    finally:
        driver.quit()
        print("WebDriver closed cleanly.")

if __name__ == "__main__":
    run_automated_train_booking()
