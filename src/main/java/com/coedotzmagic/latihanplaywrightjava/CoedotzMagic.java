package com.coedotzmagic.latihanplaywrightjava;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

public class CoedotzMagic {
    public static void main(String[] args) {
        try (Playwright playwright = Playwright.create()) {
            //Browser browser = playwright.chromium().launch(); // Headless
            Browser browser = playwright.chromium().launch(
                    new BrowserType.LaunchOptions().setHeadless(false)
            );
            Page page = browser.newPage();
            page.navigate("https://coedotzmagic.com");
            System.out.println(page.title());
        }
    }
}
