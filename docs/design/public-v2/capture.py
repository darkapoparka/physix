"""Render and smoke-test this standalone public UI. No production systems are called.
Usage: python capture.py [--quick] [--browser /path/to/chromium]
Requires playwright==1.57.0 and Pillow. CI installs bundled Chromium.
"""
from __future__ import annotations
import argparse, base64, json, os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--quick', action='store_true')
    parser.add_argument('--browser', default=os.environ.get('PHYSIX_BROWSER', ''))
    args = parser.parse_args()
    out = ROOT / 'screens'; out.mkdir(exist_ok=True)
    inline_assets = {p.stem: 'data:image/webp;base64,' + base64.b64encode(p.read_bytes()).decode() for p in (ROOT/'assets').glob('*.webp')}
    errors: list[str] = []; cases: list[dict] = []; smoke: list[str] = []
    with sync_playwright() as p:
        launch = dict(headless=True, args=['--no-sandbox'])
        if args.browser: launch['executable_path'] = args.browser
        browser = p.chromium.launch(**launch)
        page = browser.new_page(viewport={'width':390,'height':844}, device_scale_factor=1)
        page.on('pageerror', lambda err: errors.append(str(err)))
        page.set_content('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body><a class="skip" href="#main">Skip to content</a><div id="app"></div><div id="announcement" class="sr-only" role="status" aria-live="polite"></div></body></html>')
        page.add_style_tag(content=(ROOT/'prototype.css').read_text())
        page.evaluate('(assets) => window.PHYSIX_INLINE_ASSETS = assets', inline_assets)
        page.add_script_tag(content=(ROOT/'prototype.js').read_text())
        def open_screen(route):
            page.evaluate('(route) => {activeFilter="All"; serviceQuery=""; location.hash = "/" + route; render();}', route)
            page.wait_for_timeout(30)
        open_screen('screens')
        page.wait_for_function('window.PHYSIX_SCREENS')
        screens = page.evaluate('window.PHYSIX_SCREENS')
        if args.quick: screens = [s for s in screens if s[0] in ['home','services','book','charlie','programme','book-review']]
        for route,title,_ in screens:
            for label,width,height in [('mobile',390,844),('desktop',1440,1000)]:
                page.set_viewport_size({'width':width,'height':height})
                open_screen(route)
                page.wait_for_function('Array.from(document.images).every(i=>i.complete)')
                page.evaluate('document.activeElement?.blur()'); page.wait_for_timeout(50)
                overflow = page.evaluate('document.documentElement.scrollWidth > window.innerWidth')
                broken = page.evaluate('Array.from(document.images).filter(i=>!i.naturalWidth).map(i=>i.src)')
                cases.append({'route':route,'viewport':label,'width':width,'horizontalOverflow':overflow,'brokenImages':broken})
                if overflow: errors.append(f'{route} {label}: horizontal overflow')
                if broken: errors.append(f'{route} {label}: broken image')
                export_style = page.add_style_tag(content='.dock,.flow-action{visibility:hidden!important}')
                page.screenshot(path=str(out/f'{route}-{label}.png'),full_page=True)
                export_style.evaluate('(el)=>el.remove()')
                if label=='mobile': page.screenshot(path=str(out/f'{route}-mobile-viewport.png'))
            page.set_viewport_size({'width':320,'height':740})
            open_screen(route)
            if page.evaluate('document.documentElement.scrollWidth > window.innerWidth'):
                errors.append(f'{route} 320px: horizontal overflow')
            cases.append({'route':route,'viewport':'reflow','width':320,'horizontalOverflow':page.evaluate('document.documentElement.scrollWidth > window.innerWidth')})
        if not args.quick:
            page.set_viewport_size({'width':390,'height':844})
            open_screen('home'); page.locator('.charlie-section').scroll_into_view_if_needed()
            page.evaluate('window.scrollTo(0, document.querySelector(".charlie-section").offsetTop-20)')
            page.screenshot(path=str(out/'home-mobile-story.png'))
            open_screen('home')
            page.locator('.hero .button').first.click()
            expect(page.locator('body')).to_have_attribute('data-route', 'book')
            page.locator('[data-action="book-details"]').click()
            page.locator('[name=name]').fill('Design Example')
            page.locator('[name=email]').fill('preview@example.com')
            page.locator('[name=terms]').check()
            page.locator('[data-action="submit-details"]').click()
            expect(page.locator('body')).to_have_attribute('data-route', 'book-verify')
            page.locator('[name=code]').fill('123456')
            page.locator('[data-action="submit-code"]').click()
            expect(page.locator('body')).to_have_attribute('data-route', 'book-review')
            page.locator('[data-action="book-success"]').click()
            expect(page.locator('.notice')).to_contain_text('No appointment has been created')
            smoke.append('Public booking click-through: type/time → details → code → review → explicit sample confirmation')
            open_screen('services')
            page.locator('#finder-input').fill('knee')
            page.locator('.finder button').click()
            expect(page.locator('.service-row')).to_have_count(2)
            smoke.append('Service search returns expected matches')
            open_screen('services'); page.locator('[data-filter="Rehabilitation"]').click()
            expect(page.locator('.service-row')).to_have_count(1)
            smoke.append('Service category filter works')
            open_screen('book-details'); page.locator('[data-action="submit-details"]').click()
            assert page.locator('#form-error').is_visible()
            smoke.append('Empty required details show validation; no false success')
            open_screen('home'); page.locator('.menu-button').click(); page.keyboard.press('Escape')
            expect(page.locator('body')).to_have_attribute('data-route', 'home')
            smoke.append('Menu open and Escape return to the originating page')
            open_screen('faq'); details=page.locator('details').nth(1); details.locator('summary').click()
            assert details.get_attribute('open') is not None
            smoke.append('FAQ disclosure expands')
            open_screen('cookies'); page.locator('[name=analytics]').check();page.locator('[data-action="reject-cookies"]').click()
            assert not page.locator('[name=analytics]').is_checked()
            smoke.append('Reject optional resets cookie controls; no trackers exist')
            # Enlarged text reflow: visual stress test, not a full zoom/a11y audit.
            for route in ['home','services','book','book-details','charlie']:
                open_screen(route)
                page.add_style_tag(content='body{font-size:200%}h1{font-size:3rem}p{font-size:1.5rem}')
                if page.evaluate('document.documentElement.scrollWidth > innerWidth'): errors.append(f'{route}: enlarged text overflow')
            smoke.append('Selected enlarged-text layouts checked for document overflow')
        browser.close()
    if not args.quick:
        # A legible overview; the individual files retain the complete resolution.
        tile_w, tile_h, gap, cols = 234, 552, 22, 4
        rows = (len(screens)+cols-1)//cols
        board = Image.new('RGB',(cols*(tile_w+gap)+gap, rows*(tile_h+gap)+120),'#edf3f0')
        draw=ImageDraw.Draw(board)
        try:
            title_font=ImageFont.truetype('DejaVuSans.ttf',30)
            font=ImageFont.truetype('DejaVuSans.ttf',14)
        except OSError: title_font=font=ImageFont.load_default()
        draw.text((gap,22),'PhysiX / public website / screen index',font=title_font,fill='#123f37')
        draw.text((gap,65),'Design reference · 390px viewports · private app excluded',font=font,fill='#52676b')
        for i,(r,t,_) in enumerate(screens):
            x=gap+(i%cols)*(tile_w+gap);y=110+(i//cols)*(tile_h+gap)
            draw.text((x,y),f'{i+1:02d}  {t[:27]}',font=font,fill='#123f37')
            im=Image.open(out/f'{r}-mobile-viewport.png').convert('RGB')
            im=ImageOps.contain(im,(tile_w,510),Image.Resampling.LANCZOS)
            board.paste(im,(x,y+28))
        board.save(out/'public-screen-index.png',optimize=True)
        text='# Public screen gallery\n\nGenerated from the committed HTML/CSS/JS design reference, not from the production application. Full-page compositions hide fixed docks/action bars to avoid drawing them across the middle of a long page; viewport images show their actual placement.\n\n![All mobile viewports](public-screen-index.png)\n\n| Screen | Full mobile page | Desktop | Mobile viewport |\n|---|---|---|---|\n'
        for r,t,_ in screens: text+=f'| {t} | [Mobile]({r}-mobile.png) | [Desktop]({r}-desktop.png) | [Viewport]({r}-mobile-viewport.png) |\n'
        text+='\n## Home: corrected practitioner-to-review transition\n\n![Home scrolled](home-mobile-story.png)\n'
        (out/'README.md').write_text(text)
    report={'prototypeOnly':True,'screens':len(screens),'cases':cases,'smokeChecks':smoke,'errors':errors,'limitations':['Not the Next.js implementation','No provider integrations','No real device or assistive technology audit','Bulgarian translation and real business/clinical content pending','No clinical or payment correctness claims']}
    (ROOT/'review-report.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps({'screens':len(screens),'layoutCases':len(cases),'smokeChecks':len(smoke),'errors':errors}))
    if errors: raise SystemExit(1)

if __name__=='__main__': main()
