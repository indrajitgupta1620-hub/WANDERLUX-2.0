from selenium.webdriver.common.by import By
from .base_page import BasePage

class HomePage(BasePage):
    """
    Page Object for the Wanderlux Home Screen and Hero Search Widget.
    """
    BRAND_LOGO = (By.CLASS_NAME, "brand-logo")
    LOGIN_BTN = (By.CLASS_NAME, "btn-login")
    USER_BADGE = (By.CLASS_NAME, "user-profile-badge")
    SEARCH_BTN = (By.CLASS_NAME, "btn-search-main")
    
    # Navigation Tabs
    TAB_FLIGHTS = (By.XPATH, "//button[contains(@class, 'nav-tab') and contains(., 'Flights')]")
    TAB_HOTELS = (By.XPATH, "//button[contains(@class, 'nav-tab') and contains(., 'Hotels')]")
    TAB_TRAINS = (By.XPATH, "//button[contains(@class, 'nav-tab') and contains(., 'Trains')]")
    
    # Search Boxes
    FROM_BOX = (By.XPATH, "//div[contains(@class, 'search-field-label') and contains(., 'FROM')]/..")
    TO_BOX = (By.XPATH, "//div[contains(@class, 'search-field-label') and contains(., 'TO')]/..")
    SWAP_BTN = (By.CLASS_NAME, "btn-swap")

    def click_login(self):
        self.click(self.LOGIN_BTN)

    def click_search(self):
        self.click(self.SEARCH_BTN)

    def switch_to_tab(self, tab_name):
        if tab_name.lower() == 'hotels':
            self.click(self.TAB_HOTELS)
        elif tab_name.lower() == 'trains':
            self.click(self.TAB_TRAINS)
        else:
            self.click(self.TAB_FLIGHTS)

    def is_user_logged_in(self):
        return self.is_visible(self.USER_BADGE)
