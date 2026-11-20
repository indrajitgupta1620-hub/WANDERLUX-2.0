from selenium.webdriver.common.by import By
from .base_page import BasePage

class LoginModalPage(BasePage):
    """
    Page Object for the Login and Sign Up Modal.
    """
    MODAL_CARD = (By.CLASS_NAME, "auth-modal-card")
    CLOSE_BTN = (By.CLASS_NAME, "auth-close-btn")
    
    # Mode Tabs
    SIGN_IN_TAB = (By.XPATH, "//button[contains(@class, 'auth-tab-item') and contains(., 'Sign In')]")
    CREATE_ACCOUNT_TAB = (By.XPATH, "//button[contains(@class, 'auth-tab-item') and contains(., 'Create Account')]")
    
    # Phone OTP Flow
    PHONE_INPUT = (By.CLASS_NAME, "auth-phone-input")
    SUBMIT_BTN = (By.CLASS_NAME, "auth-primary-btn")
    DEMO_OTP_CHIP = (By.XPATH, "//button[contains(text(), 'Demo Code')]")
    OTP_ROW = (By.CLASS_NAME, "auth-otp-row")
    SUCCESS_SCREEN = (By.CLASS_NAME, "auth-success-screen")

    # Email Flow
    EMAIL_TOGGLE_BTN = (By.XPATH, "//button[contains(text(), 'Email & Password')]")
    EMAIL_INPUT = (By.XPATH, "//input[@type='email']")
    PASSWORD_INPUT = (By.XPATH, "//input[@placeholder='Enter your password']")
    DEMO_ACCOUNT_CHIP = (By.XPATH, "//button[contains(text(), 'Use Demo Account')]")

    # Sign Up Flow
    SIGNUP_NAME_INPUT = (By.XPATH, "//input[@placeholder='e.g. Indrajit Gupta']")
    SIGNUP_EMAIL_INPUT = (By.XPATH, "//input[@type='email']")
    SIGNUP_PASSWORD_INPUT = (By.XPATH, "//input[@placeholder='Minimum 6 characters']")

    def enter_mobile_and_get_otp(self, mobile_number):
        self.type(self.PHONE_INPUT, mobile_number)
        self.click(self.SUBMIT_BTN)

    def enter_demo_otp_and_verify(self):
        self.click(self.DEMO_OTP_CHIP)
        self.click(self.SUBMIT_BTN)

    def perform_full_otp_login(self, phone="9876543210"):
        self.enter_mobile_and_get_otp(phone)
        self.enter_demo_otp_and_verify()

    def is_success_displayed(self):
        return self.is_visible(self.SUCCESS_SCREEN)
