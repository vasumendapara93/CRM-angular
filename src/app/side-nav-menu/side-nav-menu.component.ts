import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IUser from '../model/User.model';
import { UserRole } from 'src/assets/static/UserRole';

@Component({
    selector: 'app-side-nav-menu',
    templateUrl: './side-nav-menu.component.html',
    styleUrls: ['./side-nav-menu.component.css']
})
export class SideNavMenuComponent implements OnInit {
    options = { autoHide: false };
    user : IUser
    UserRoles = UserRole
  
    constructor(
      private route: ActivatedRoute
    ){
      this.user = this.route.snapshot.data['user'];
    }

    ngOnInit(): void {
        this.initSidenav();
    }

    initSidenav() {
        var self = this;
        var pageUrl = window.location.href.split(/[?#]/)[0];
        document.querySelectorAll('ul.menu a.menu-link').forEach((element: any) => {
            if (element.href === pageUrl) {
                element.classList.add('active');
                let parentMenu = element.parentElement.parentElement.parentElement;
                if (parentMenu && parentMenu.classList.contains('menu-item')) {
                    const collapseElement = parentMenu.querySelector('[data-fc-type="collapse"]');
                }
            }
        })

        setTimeout(function () {
            var activatedItem: HTMLElement | null = document.querySelector('ul.menu .active');
            if (activatedItem != null) {
                var simplebarContent: HTMLElement | null = document.querySelector('.app-menu .simplebar-content-wrapper');
                var offset = activatedItem.offsetTop - 300;
                if (simplebarContent && offset > 100) {
                    scrollTo(simplebarContent, offset, 600);
                }
            }
        }, 200);

        // scrollTo (Sidenav Active Menu)
        function easeInOutQuad(t: any, b: any, c: any, d: any) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        function scrollTo(element: HTMLElement, to: number, duration: number) {
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

    isActive: boolean = false

    inActiveCollapseMenu() {
        let collapseMenus = Array.from(document.getElementsByClassName('active') as HTMLCollectionOf<HTMLElement>);
        if (collapseMenus != null) {
            collapseMenus.forEach((collapseMenu) => {
                collapseMenu.classList.remove('active')
            })
        }
    }

    closeCollapseMenu() {
        let collapsedLinks = Array.from(document.getElementsByClassName('collaped-link') as HTMLCollectionOf<HTMLElement>);

        collapsedLinks.forEach((collapsedLink) => {
            collapsedLink!.style.maxHeight = "0"
        })
    }

    openCollapseMenu($event: Event) {
        let collapseMenu: HTMLElement | null | undefined = null
        let answere: HTMLElement | null | undefined = null
        if ($event.target instanceof HTMLParagraphElement) {
            collapseMenu = $event.target.parentElement
            answere = $event.target.parentElement?.nextElementSibling as HTMLElement;
        }
        else {
            collapseMenu = $event.target as HTMLElement
            answere = ($event.target as HTMLElement).nextElementSibling as HTMLElement
        }

        if (!collapseMenu?.classList.contains('active')) {
            this.inActiveCollapseMenu()
        }
        this.closeCollapseMenu()
        collapseMenu?.classList.toggle('active')
        this.closeCollapseMenu()
        if (collapseMenu?.classList.contains('active')) {
            answere!.style.maxHeight = answere!.scrollHeight + "px";
        } else {
            answere!.style.maxHeight = "0"
        }
    }
}
