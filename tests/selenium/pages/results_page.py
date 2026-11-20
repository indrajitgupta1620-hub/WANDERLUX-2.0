from selenium.webdriver.common.by import By
from .base_page import BasePage

class SearchResultsPage(BasePage):
    RESULTS_CONTAINER = (By.CLASS_NAME, "search-results-page")
    PAGE_TITLE = (By.CLASS_NAME, "results-title")
    FLIGHT_CARDS = (By.CLASS_NAME, "flight-card-main")
    BOOK_BUTTONS = (By.CLASS_NAME, "btn-book-flight")
    FILTER_PRICE_SLIDER = (By.XPATH, "//input[@type='range']")
    BACK_BUTTON = (By.CLASS_NAME, "btn-back-nav")

    def get_results_count(self):
        cards = self.find_all(self.FLIGHT_CARDS)
        return len(cards)

    def book_first_flight(self):
        buttons = self.find_all(self.BOOK_BUTTONS)
        if buttons:
            buttons[0].click()

    def go_back(self):
        self.click(self.BACK_BUTTON)
