import { observable, runInAction } from "mobx";
import Config from "./Config";

const RABookmarkList = observable({
    allBookMarks: [],
    isLoading: false,
    requestData() {

        if (!Config.use_rest) {

            const url = Config.ajaxUrl;
            this.isLoading = true;

            fetch(url).then((res) => {
                res.json().then(jsonObj => {
                    runInAction(
                        () => {
                            let objectA = [];
                            let categories = jsonObj.categories;
                            let bookmarks = jsonObj.bookmarks;

                            categories.forEach(element => {
                                let theChildrens = bookmarks.filter((item) => item.categories.includes(element.id));

                                let theChildrensParse = [];
                                theChildrens.forEach(theChild => {

                                    let nowChild = {
                                        "id": theChild.id,
                                        "type": "link",
                                        "title": theChild.name,
                                        "url": theChild.link,
                                        "logo": theChild.icon != null && theChild.icon.length > 0 ? theChild.icon : theChild.icon_third,
                                        "bgColor": "rgba(241, 243, 244, 1)",
                                        "iframe": theChild.iframe && theChild.iframe.length > 0,
                                        "bookmarks": []
                                    };
                                    theChildrensParse.push(nowChild);
                                });

                                let theDir = {
                                    "id": element.id,
                                    "type": "folder",
                                    "title": element.name,
                                    "url": element.link,
                                    "logo": "",
                                    "bgColor": "rgba(241, 243, 244, 1)",
                                    "iframe": false,
                                    "bookmarks": theChildrensParse
                                };

                                objectA.push(theDir);
                            });

                            let topSites = bookmarks.filter((item) => item.categories.length <= 0);
                            topSites.forEach(element => {
                                let topSite = {
                                    "id": element.id,
                                    "type": "link",
                                    "title": element.name,
                                    "url": element.link,
                                    "logo": element.icon != null && element.icon.length > 0 ? element.icon : element.icon_third,
                                    "bgColor": "rgba(241, 243, 244, 1)",
                                    "iframe": element.iframe && element.iframe.length > 0,
                                    "bookmarks": []
                                };
                                objectA.push(topSite);
                            });
                            this.isLoading = false;
                            this.allBookMarks = objectA;
                        });
                })
            }).catch(e => {
                console.log(e);
                runInAction(() => {
                    this.isLoading = false;
                });
            });
        } else {
            this.isLoading = true;

            fetch(Config.taxonomy_rest).then(res => {
                res.json().then(full_categories => {
                    fetch(Config.bookmarks_rest).then(res => {
                        res.json().then(bookmarks => {
                            runInAction(() => {
                                let objectA = [];
                                let categories = full_categories.filter((item) => item.count > 0); // get all categories
                                categories.forEach(element => {
                                    let theChildrens = bookmarks.filter((item) => item.raw.categories.includes(element.id));
                                    let theChildrensParse = [];
                                    theChildrens.forEach(childItem => {
                                        const theChild = childItem.raw;
                                        let nowChild = {
                                            "id": theChild.id,
                                            "type": "link",
                                            "title": theChild.name,
                                            "url": theChild.link,
                                            "logo": theChild.icon != null && theChild.icon.length > 0 ? theChild.icon : theChild.icon_third,
                                            "bgColor": "rgba(241, 243, 244, 1)",
                                            "iframe": theChild.iframe && theChild.iframe.length > 0,
                                            "bookmarks": []
                                        };
                                        theChildrensParse.push(nowChild);
                                    });
                                    let theDir = {
                                        "id": element.id,
                                        "type": "folder",
                                        "title": element.name,
                                        "url": element.link,
                                        "logo": "",
                                        "bgColor": "rgba(241, 243, 244, 1)",
                                        "iframe":false,
                                        "bookmarks": theChildrensParse
                                    };
                                    objectA.push(theDir);
                                });
                                let topSites = bookmarks.filter((item) => item.raw.categories.length <= 0);
                                topSites.forEach(item => {
                                    let element = item.raw;
                                    let topSite = {
                                        "id": element.id,
                                        "type": "link",
                                        "title": element.name,
                                        "url": element.link,
                                        "logo": element.icon != null && element.icon.length > 0 ? element.icon : element.icon_third,
                                        "bgColor": "rgba(241, 243, 244, 1)",
                                        "iframe": element.iframe && element.iframe.length > 0,
                                        "bookmarks": []
                                    };
                                    objectA.push(topSite);
                                });

                                this.isLoading = false;
                                this.allBookMarks = objectA;
                            });
                        });
                    });
                });
            }).catch(e => {
                console.log(e);
                runInAction(() => {
                    this.isLoading = false;
                });
            })
        }
    },
});


export default RABookmarkList;