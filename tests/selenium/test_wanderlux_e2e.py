"""
================================================================================
END-TO-END AUTOMATION SUITE: WANDERLUX 2.0
Implements Page Object Model (POM) with Pytest Fixtures
================================================================================
"""

import time
import pytest
from pages.home_page import HomePage
from pages.login_modal_page import LoginModalPage
from pages.results_page import SearchResultsPage

import os
BASE_URL = os.environ.get("WANDERLUX_URL", "https://wanderlux-2-0.vercel.app")

class TestWanderluxAutomation:

    def test_tc01_homepage_title_and_branding(self, driver):
        """TC01: Verify home page loads and branding logo is present"""
        home = HomePage(driver)
        home.open(BASE_URL)

        assert "Wanderlux" in driver.title, f"Expected 'Wanderlux' in title, got: {driver.title}"
        assert home.is_visible(HomePage.BRAND_LOGO), "Brand logo is not visible on page"

    def test_tc02_navigation_tabs_switching(self, driver):
        """TC02: Verify switching between Flights, Hotels, and Trains tabs"""
        home = HomePage(driver)
        home.open(BASE_URL)

        home.switch_to_tab("hotels")
        time.sleep(0.5)
        assert home.is_visible(HomePage.TAB_HOTELS)

        home.switch_to_tab("trains")
        time.sleep(0.5)
        assert home.is_visible(HomePage.TAB_TRAINS)

    def test_tc03_login_modal_otp_flow(self, driver):
        """TC03: Verify customer can open login modal and authenticate via OTP"""
        home = HomePage(driver)
        login_modal = LoginModalPage(driver)

        home.open(BASE_URL)
        home.click_login()

        assert login_modal.is_visible(LoginModalPage.MODAL_CARD), "Login modal failed to appear"

        # Complete OTP Login
        login_modal.perform_full_otp_login(phone="9876543210")
        assert login_modal.is_success_displayed(), "Login success celebration was not displayed"

    def test_tc04_flight_search_results(self, driver):
        """TC04: Verify flight search executes and displays flight cards"""
        home = HomePage(driver)
        results = SearchResultsPage(driver)

        home.open(BASE_URL)
        home.switch_to_tab("flights")
        home.click_search()

        assert results.is_visible(SearchResultsPage.RESULTS_CONTAINER), "Search results container did not load"
        count = results.get_results_count()
        assert count > 0, f"Expected flights to be found, got {count}"
