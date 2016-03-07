"use strict";

const Logger = require('../io/logger.js');

var Pages = {
    /**
     * Returns a list of all navigtable pages available in the application.
     */
    getNavPages: function () {
        return [
            {
                id: 'dashboard',
                icon: 'dashboard',
                text: 'Status',
                default: true,
                visible: true
            },
            {
                id: 'sites',
                icon: 'server',
                text: 'Sites',
                visible: true
            },
            {
                id: 'packages',
                icon: 'globe',
                text: 'Environments',
                visible: true
            }
        ];
    },

    /**
     * Initializes navigation and paging system.
     */
    init: function () {
        // Init navigation pane, construct links
        let navPages = Pages.getNavPages();
        let $navRoot = $('nav .sections');
        let defaultPage = null;

        for (var i = 0; i < navPages.length; i++) {
            let page = navPages[i];

            if (page.visible) {
                let $link = $('<a />')
                    .attr('href', '#' + page.id)
                    .attr('title', page.text)
                    .data('page', page)
                    .addClass('generated-link')
                    .appendTo($navRoot);

                $('<i />')
                    .addClass('fa fa-' + page.icon)
                    .appendTo($link);

                $('<span />')
                    .addClass('title')
                    .text(page.text)
                    .appendTo($link);

                $link.click(function (e) {
                    e.preventDefault();
                    Pages.navigate(page);
                    return false;
                });
            }

            if (page.default) {
                defaultPage = page;
            }
        }

        // Go to default page
        if (defaultPage != null) {
            Pages.navigate(defaultPage);
        }
    },

    /**
     * Navigates to a page.
     *
     * @param page
     */
    navigate: function (page) {
        var navTarget = `#${page.id}`;

        Logger.info(`(UI) Showing page: ${navTarget}`);

        // Update title
        $('.title h1').text(page.text);

        // Update navigation
        $('nav .sections a').removeClass('active');
        $(`nav .sections a[href='${navTarget}']`).addClass('active');

        // Toggle page visibility
        $('.page').hide();
        $(navTarget).show();
    }
};

module.exports = Pages;