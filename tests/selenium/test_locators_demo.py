

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, ElementNotInteractableException
from webdriver_manager.chrome import ChromeDriverManager

def run_locators_and_methods_demo():
    print("STARTING SELENIUM LOCATORS & WEB ELEMENTS DEMO")


    # Setup Chrome Options
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")
    # Uncomment the next line if running on a server without GUI:
    # options.add_argument("--headless=new")

    # Initialize WebDriver
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    try:
        # ====================================================================
        # WAIT TYPE 1: IMPLICIT WAIT
        # Polling the DOM for up to 10 seconds for any element before throwing exception
        # ====================================================================
        driver.implicitly_wait(10)
        print("✓ Implicit Wait configured: 10 seconds")

        # Open Wanderlux Application (Local or Production URL)
        APP_URL = "https://wanderlux-2-0.vercel.app"
        print(f"✓ Navigating to application: {APP_URL}")
        try:
            driver.get(APP_URL)
        except Exception as conn_err:
            print("\n❌ Could not connect to application!")
            print(f"   Reason: {conn_err}")
            print("\n💡 TIP: If running locally, start your dev server with: npm run dev")
            return

        # ====================================================================
        # 1. FINDING ELEMENTS BY 'By' CLASS
        # ====================================================================
        print("\n--- [DEMO 1: LOCATING ELEMENTS USING 'By' CLASS] ---")

        # A. By.ID
        root_element = driver.find_element(By.ID, "root")
        print(f"1. By.ID -> Found '#root' (Tag: <{root_element.tag_name}>)")

        # B. By.CLASS_NAME
        brand_logo = driver.find_element(By.CLASS_NAME, "brand-logo")
        print(f"2. By.CLASS_NAME -> Found '.brand-logo' (Text: '{brand_logo.text}')")

        # C. By.CSS_SELECTOR
        search_btn = driver.find_element(By.CSS_SELECTOR, "button.btn-search-main")
        print(f"3. By.CSS_SELECTOR -> Found 'button.btn-search-main' (Text: '{search_btn.text}')")

        # D. By.XPATH
        # Relative XPath using attribute and text
        login_btn = driver.find_element(By.XPATH, "//button[contains(@class, 'btn-login')]")
        print(f"4. By.XPATH -> Found '//button[contains(@class, \"btn-login\")]'")

        # ====================================================================
        # 2. USEFUL WEB ELEMENT METHODS & PROPERTIES
        # ====================================================================
        print("\n--- [DEMO 2: WEB ELEMENT METHODS & PROPERTIES] ---")

        # Inspect Properties
        print(f"• Element Tag Name:    {login_btn.tag_name}")
        print(f"• Element Visible:     {login_btn.is_displayed()}")
        print(f"• Element Enabled:     {login_btn.is_enabled()}")
        print(f"• Element Size:        {login_btn.size}")
        print(f"• Element Location:    {login_btn.location}")
        print(f"• HTML Attribute:      class='{login_btn.get_attribute('class')}'")

        # Method: click() to open Login Modal
        print("\n• Action: Clicking Login Button (.click())...")
        login_btn.click()

        # ====================================================================
        # WAIT TYPE 2: EXPLICIT WAIT
        # Waiting specifically for the Auth Modal to become visible
        # ====================================================================
        print("\n--- [DEMO 3: EXPLICIT WAIT] ---")
        explicit_wait = WebDriverWait(driver, 10)
        modal_card = explicit_wait.until(
            EC.visibility_of_element_located((By.CLASS_NAME, "auth-modal-card"))
        )
        print("✓ Explicit Wait success: Modal became visible within timeout!")

        # Locating input field inside modal using CSS Selector
        phone_input = driver.find_element(By.CSS_SELECTOR, "input.auth-phone-input")

        # Method: send_keys()
        print("• Action: Typing 10-digit mobile number (.send_keys())...")
        phone_input.send_keys("9876543210")
        print(f"• Current Input Value: '{phone_input.get_attribute('value')}'")

        # Method: clear()
        time.sleep(1)
        print("• Action: Clearing input (.clear())...")
        phone_input.clear()

        # Re-type valid mobile
        phone_input.send_keys("9876543210")

        # ====================================================================
        # WAIT TYPE 3: FLUENT WAIT
        # Custom polling frequency and ignored exceptions
        # ====================================================================
        print("\n--- [DEMO 4: FLUENT WAIT] ---")
        fluent_wait = WebDriverWait(
            driver, 
            timeout=10, 
            poll_frequency=0.5, 
            ignored_exceptions=[NoSuchElementException, ElementNotInteractableException]
        )
        submit_otp_btn = fluent_wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button.auth-primary-btn"))
        )
        print("✓ Fluent Wait success: Submit button is clickable!")
        submit_otp_btn.click()

        # Wait for 4-digit OTP tiles to appear
        explicit_wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "auth-otp-row")))
        print("✓ Transitioned to OTP verification step successfully!")

        # Click Demo OTP helper chip (XPATH by text)
        demo_otp_chip = driver.find_element(By.XPATH, "//button[contains(text(), 'Demo Code')]")
        demo_otp_chip.click()
        print("• Action: Clicked '✨ Demo Code: 1234' chip")

        # Verify button submit
        verify_btn = driver.find_element(By.XPATH, "//button[contains(., 'Verify & Sign In')]")
        verify_btn.click()

        # Wait for celebration screen
        explicit_wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "auth-success-screen")))
        print("✓ Login Success Screen displayed! Traveler profile authenticated.")

        # E. By.LINK_TEXT and By.PARTIAL_LINK_TEXT (Demonstration)
        print("\n--- [DEMO 5: LINK TEXT & PARTIAL LINK TEXT] ---")
        time.sleep(1.5)  # Wait for modal auto-close
        
        # Locating footer links
        privacy_link = driver.find_element(By.PARTIAL_LINK_TEXT, "Privacy")
        print(f"5. By.PARTIAL_LINK_TEXT -> Found link '{privacy_link.text}' (href='{privacy_link.get_attribute('href')}')")

        print("\n========================================================")
        print("  🎉 ALL LOCATORS, METHODS & WAITS DEMONSTRATED SUCCESSFULLY!")
        print("========================================================")

    except Exception as e:
        print(f"❌ Error encountered during test execution: {e}")
    finally:
        time.sleep(2)
        driver.quit()
        print("✓ Browser closed cleanly.")

if __name__ == "__main__":
    run_locators_and_methods_demo()
