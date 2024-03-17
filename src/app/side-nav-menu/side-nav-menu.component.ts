import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.css']
})
export class SideNavMenuComponent implements OnInit {
  options = { autoHide: false };

  ngOnInit(): void {
      this.initSidenav();
  }
  
  initSidenav() {
    var self = this;
    var pageUrl = window.location.href.split(/[?#]/)[0];
    document.querySelectorAll('ul.menu a.menu-link').forEach((element : any) => {
        if (element.href === pageUrl) {
            element.classList.add('active');
            let parentMenu = element.parentElement.parentElement.parentElement;
            if (parentMenu && parentMenu.classList.contains('menu-item')) {
                const collapseElement = parentMenu.querySelector('[data-fc-type="collapse"]');
                // if (collapseElement && frost != null) {
                //     const collapse = frost.Collapse.getInstanceOrCreate(collapseElement);
                //     collapse.show();
                // }
            }
        }
    })

    setTimeout(function () {
        var activatedItem :HTMLElement | null = document.querySelector('ul.menu .active');
        if (activatedItem != null) {
            var simplebarContent :HTMLElement | null = document.querySelector('.app-menu .simplebar-content-wrapper');
            var offset = activatedItem.offsetTop - 300;
            if (simplebarContent && offset > 100) {
                scrollTo(simplebarContent, offset, 600);
            }
        }
    }, 200);

    // scrollTo (Sidenav Active Menu)
    function easeInOutQuad(t:any , b:any, c:any, d:any) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    function scrollTo(element:HTMLElement, to : number, duration : number) {
        var start = element.scrollTop, change = to - start, currentTime = 0, increment = 20;
        var animateScroll = function () {
            currentTime += increment;
            var val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }
}
}
